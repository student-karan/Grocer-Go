import { NextFunction, Request, Response } from "express";
import Address from "../models/addressModel";
import { addressData } from "./../helpers/validation";
import { get } from "lodash";
import ExpressError from "./../ExpressError";

export const addAddress = async(req:Request,res:Response,next:NextFunction) => {
    const addressData = req.body as addressData;
    const userId = get(req,"userId");

    const newAddress = new Address({...addressData,userId});

    if(newAddress){
        await newAddress.save();
        res.status(200).send("Address added successfully.");
    } else {
        throw new ExpressError(400,"Invalid address data.");
    }
    
}

export const getAddresses= async(req:Request,res:Response,next:NextFunction) => {
    const userId = get(req,"userId");
    const addresses = await Address.find({userId});
    res.status(200).send(addresses);
}