import "dotenv/config";
import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

const secret = process.env.JWT_SECRET as string;

export const generateToken = (id: Types.ObjectId, res: Response) => {
    const token = jwt.sign({ id }, secret, { expiresIn: "7d" });

    res.cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", //CSRF Protection
        httpOnly: true, // prevent javascript to access cookie
        secure: process.env.NODE_ENV === "production" // use secure cookie in production
    })
    return token;
}

export const generateSellerToken = (email: string, res: Response) => {
    const token = jwt.sign({ email }, secret, { expiresIn: "7d" });

    res.cookie("SellerToken", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", //CSRF Protection
        httpOnly: true, // prevent javascript to access cookie
        secure: process.env.NODE_ENV === "production" // use secure cookie in production
    })
    return token;
}


export function asyncWrap(fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) {
    return function (req: Request, res: Response, next: NextFunction) {
        fn(req, res, next).catch((err: unknown) => next(err));
    }
}