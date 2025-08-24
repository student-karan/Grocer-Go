import { Request, Response, NextFunction } from "express";
import Order from "./../models/ordersModel";
import { get } from "lodash";
import { orderData } from "./../helpers/validation";
import Product from "./../models/productModel";
import ExpressError from "./../ExpressError";
import { Types } from "mongoose";
import Stripe from "stripe";
import User from "./../models/userModel";

// place order COD : /api/order/cod
export const placeOrderCOD = async (req: Request, res: Response, next: NextFunction) => {
    const userId = get(req, "userId");
    const { address, cartItems } = req.body as orderData;

    if (Object.keys(cartItems).length === 0) {
        throw new ExpressError(400, "Data provided is invalid");
    }
    let items = [];
    let totalAmount = 0;
    for (let item in cartItems) {
        const producttofind = await Product.findById(new Types.ObjectId(item));
        const amount = producttofind?.offerPrice as number * cartItems[item];
        totalAmount += amount;
        const itemtoadd = { product: item, quantity: cartItems[item] };
        items.push(itemtoadd);
    }
    totalAmount += Math.floor(totalAmount * 0.02);

    const Neworder = new Order({
        userId,
        items,
        amount: totalAmount,
        address,
        paymentType: "COD",
    })
    if (Neworder) {
        await Neworder.save();
        await User.findByIdAndUpdate(userId, { cartItems: {} });
        res.status(200).send("Order placed successfully");
    } else {
        throw new ExpressError(400, "Invalid order data");
    }
}

export const placeOrderStripe = async (req: Request, res: Response, next: NextFunction) => {
    const userId = get(req, "userId") as unknown as Types.ObjectId;
    const { origin } = req.headers;
    const { address, cartItems } = req.body as orderData;

    if (Object.keys(cartItems).length === 0) {
        throw new ExpressError(400, "Data provided is invalid");
    }

    let items = [];
    let totalAmount = 0;
    let productData = [];

    for (let item in cartItems) {
        const producttofind = await Product.findById(new Types.ObjectId(item));

        if (!producttofind) {
            throw new ExpressError(404, `Product with ID ${item} not found`);
        }

        if (!producttofind.name || producttofind.offerPrice === undefined || producttofind.offerPrice === null) {
            throw new ExpressError(400, `Product ${item} has invalid data`);
        }

        const quantity = Number(cartItems[item]);
        if (isNaN(quantity) || quantity <= 0) {
            throw new ExpressError(400, `Invalid quantity for product ${item}`);
        }

        productData.push({
            name: producttofind.name,
            price: producttofind.offerPrice,
            quantity: quantity
        });

        const amount = producttofind.offerPrice * quantity;
        totalAmount += amount;
        const itemtoadd = { product: item, quantity: quantity };
        items.push(itemtoadd);
    }

    totalAmount += Math.floor(totalAmount * 0.02);

    // Create order immediately but mark as pending
    const Neworder = new Order({
        userId,
        items,
        amount: totalAmount,
        address,
        status: "pending",
        paymentType: "online",
        isPaid: false
    });

    const secret_key = process.env.STRIPE_SECRET_KEY as string;
    const stripeInstance = new Stripe(secret_key, { apiVersion: "2025-07-30.basil" });

    const line_items = productData.map((item) => ({
        price_data: {
            currency: "inr",
            product_data: {
                name: item.name
            },
            unit_amount: Math.round(item.price + item.price * 0.02) * 100
        },
        quantity: item.quantity
    }));

    try {
        // Save order first to get the ID
        await Neworder.save();

        // Create session with order ID in metadata
        const session = await stripeInstance.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${origin}/loader?next=my-orders`,
            cancel_url: `${origin}/cart`,
            metadata: {
                orderId: Neworder._id.toString(),
                userId: userId.toString()
            }
        });

        console.log("Created session with order ID:", Neworder._id.toString());
        res.status(200).send({ url: session.url });

    } catch (err) {
        // If session creation fails, delete the order
        await Order.findByIdAndDelete(Neworder._id);
        throw new ExpressError(500, "Payment session creation failed");
    }
};

// stripe webhook for payment verification : /stripe
export const stripeWebhooks = async (req: Request, res: Response) => {
    const secret_key = process.env.STRIPE_SECRET_KEY as string;
    const stripeInstance = new Stripe(secret_key, { apiVersion: "2025-07-30.basil" });

    const sig = req.headers["stripe-signature"] as string | string[];
    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET as string
        )
    } catch (error) {
        throw new ExpressError(400, `Webhook error: ${error}`);
    }

    switch (event.type) {
        case "payment_intent.succeeded": {
            const payment_intent = event.data.object as Stripe.PaymentIntent;
            const payment_intentId = payment_intent.id;

            //getting session metadata
            const session = await stripeInstance.checkout.sessions.list({
                payment_intent: payment_intentId
            })
            const { orderId, userId } = session.data[0].metadata as { orderId: string, userId: string };

            if (!orderId || !userId) {
                throw new ExpressError(400, "Missing metadata in checkout session");
            }

            // mark payment as paid
            const updatedOrder = await Order.findByIdAndUpdate(
                orderId,
                {
                    isPaid: true,
                    status: "Order Placed",
                },
                { new: true, runValidators: true }
            );

            if (!updatedOrder) {
                throw new ExpressError(404, "Order not found");
            }

            // Clear user's cart
            await User.findByIdAndUpdate(userId, { cartItems: {} });
            res.status(200).send("Payment processed successfully");
            break;
        }

        case "payment_intent.payment_failed": {
            const payment_intent = event.data.object as Stripe.PaymentIntent;
            const payment_intentId = payment_intent.id;

            //getting session metadata
            const session = await stripeInstance.checkout.sessions.list({
                payment_intent: payment_intentId
            })
            const { orderId } = session.data[0].metadata as { orderId: string };

            if (orderId) {
                    await Order.findByIdAndDelete(orderId);
                    console.log(`Deleted expired order: ${orderId}`);
                } else {
                    throw new ExpressError(400,"Error deleting expired order");
                }

            res.status(200).send("Expired session handled");
            break;
        }
        default:{
            console.error(`Unhandled event type : ${event.type}`);
            break;
        }
    }
};

// Get orders by userid : /api/order/user
export const getUserOrders = async (req: Request, res: Response, next: NextFunction) => {
    const userId = get(req, "userId");
    const orders = await Order.find({
        userId,
        $or: [{ paymentType: "COD" }, { isPaid: true }]
    }).populate("items.product").populate("address").sort({ creaedAt: -1 });;
    res.status(200).send(orders);
}

// Get orders for seller : /api/order/seller
export const getSellerOrders = async (req: Request, res: Response, next: NextFunction) => {
    const orders = await Order.find({}).populate("items.product").populate("address").sort({ creaedAt: -1 });
    res.status(200).send(orders);
} 