import "dotenv/config";
import jwt, { DecodeOptions, JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import ExpressError from "../ExpressError";
import { merge } from "lodash";

const secret = process.env.JWT_SECRET as string;

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if(!token){
        next(new ExpressError(401,"Unauthorized - No token provided."));
    }
    const decoded = jwt.verify(token,secret) as JwtPayload;
    if(!decoded){
        next(new ExpressError(401,"Invalid token data."));
    }
    const userId = decoded.id;
    merge(req,{userId});
    next();
}