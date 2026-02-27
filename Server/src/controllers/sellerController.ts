import "dotenv/config";
import { Request, Response,NextFunction } from "express";
import ExpressError from "./../ExpressError";
import { loginData } from "./../helpers/validation";
import { generateSellerToken } from "./../helpers/utils";

export const sellerLogin = async (req: Request, res: Response,next:NextFunction) => {
    const { email, password } = req.body as loginData;
    
    if (email === process.env.SELLER_EMAIL && password === process.env.SELLER_PASSWORD) {
        generateSellerToken(email, res);
        res.status(200).send({seller:"SELLER",message:"Seller is logged in"})
    } else {
        throw new ExpressError(401, "Details provided are incorrect.");
    }
}

export const sellerLogout = async (req: Request, res: Response,next:NextFunction) => {
    res.clearCookie("SellerToken", { path: '/' });
    res.status(200).send({ message: "You are logged out of the seller dashboard." });
}

export const checkseller = async(req: Request, res: Response,next:NextFunction) => {
    res.status(200).send("SELLER");
}