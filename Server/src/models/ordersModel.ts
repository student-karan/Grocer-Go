import mongoose, { mongo, Schema } from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    items: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product"
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    amount: {
        type: Number,
        required: true
    },
    address: {
        type: Schema.Types.ObjectId,
        ref: "Address"
    },
    status: {
        type: String,
        default: "Order Placed"
    },
    paymentType: {
        type: String,
        required: true
    },
    isPaid: {
        type: Boolean,
        default:false
    },
},{timestamps:true});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;