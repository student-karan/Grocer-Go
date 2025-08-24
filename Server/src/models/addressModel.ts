import mongoose, { Schema } from "mongoose";

const addressSchema = new mongoose.Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref: "User"
    },
    firstName: {
        type:String,
        required:true
    },
    lastName: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    street: {
        type:String,
        required:true
    },
    city: {
        type:String,
        required:true
    },
    state: {
        type:String,
        required:true
    },
    zipcode: {
        type:String,
        required:true
    },
    country: {
        type:String,
        required:true
    },
    phone: {
        type:String,
        required:true
    },
})

const Address = mongoose.model("Address",addressSchema);

export default Address;