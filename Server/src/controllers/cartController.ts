import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import User from "./../models/userModel";
import ExpressError from "./../ExpressError";

// update cart /api/cart/update
export const updatecart = async (req: Request, res: Response, next: NextFunction) => {
    const cartItems = req.body;
    const id = get(req,"userId");
      
    const user = await User.findByIdAndUpdate(id,{cartItems},{runValidators:true,new:true});
    if(user){
        res.status(200).send(user.cartItems);
    } else {
        throw new ExpressError(400,"An Error occured.")
    }
}