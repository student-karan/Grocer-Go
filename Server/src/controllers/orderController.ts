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
            quantity : quantity
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
        paymentType: "Online"
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
            success_url: `${origin}/verify?success=true&orderId=${Neworder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${Neworder._id}`,
        });
        res.status(200).send({ url: session.url });

    } catch (err) {
        // If session creation fails, delete the order
        await Order.findByIdAndDelete(Neworder._id);
        throw new ExpressError(500, "Payment session creation failed");
    }
};

// stripe payment verification : /stripe
export const verifyStripe = async (req: Request, res: Response, next: NextFunction) => {
    const {orderId,success} = req.params;
    const userId = get(req, "userId");
    if(success === "true"){
        await Order.findByIdAndUpdate(orderId,{isPaid:true},{new:true,runValidators:true});
        await User.findByIdAndUpdate(userId, { cartItems: {} });
        res.status(200).send("Payment successful and order placed");
    } else {
        await Order.findByIdAndDelete(orderId);
        throw new ExpressError(400, "Payment failed, order cancelled");
    }
};

// Get orders by userid : /api/order/user
export const getUserOrders = async (req: Request, res: Response, next: NextFunction) => {
    const userId = get(req, "userId");
    const orders = await Order.find({
        userId,
        $or: [{ paymentType: "COD" }, { isPaid: true }]
    }).populate("items.product").populate("address").sort({ createdAt: -1 });
    res.status(200).send(orders);
}

// Get orders for seller : /api/order/seller
export const getSellerOrders = async (req: Request, res: Response, next: NextFunction) => {
    const orders = await Order.find({}).populate("items.product").populate("address").sort({ createdAt: -1 });
    res.status(200).send(orders);
} 

// Update oder status : /api/order/updateStatus/:orderId
export const updateOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
    const { orderId } = req.params;
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true, runValidators: true });

    if (!updatedOrder) {
        throw new ExpressError(404, "Order not found");
    }

    res.status(200).send("Order status updated successfully");
}