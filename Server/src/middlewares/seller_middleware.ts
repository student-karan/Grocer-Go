import "dotenv/config";
import jwt, { DecodeOptions, JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import ExpressError from "./../ExpressError";

const secret = process.env.JWT_SECRET as string;

export const isSellerLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.SellerToken;

    if (!token) {
        next(new ExpressError(401, "Unauthorized - No token provided."));
    }
    const decoded = jwt.verify(token, secret) as JwtPayload;

    if (!decoded || decoded.email !== process.env.SELLER_EMAIL) {
        next(new ExpressError(401, "Invalid token data."));
    } else {
        next();
    }
}