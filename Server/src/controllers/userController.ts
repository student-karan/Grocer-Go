import "dotenv/config";
import { signupData, loginData } from "../helpers/validation";
import User from "../models/userModel";
import { Request, Response, NextFunction } from "express";
import ExpressError from "../ExpressError";
import bcrypt from "bcryptjs";
import { generateToken } from "../helpers/utils";
import { get } from "lodash";

export const Signup = async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body as signupData;

    const existedUser = await User.findOne({ email: email });
    if (existedUser) {
        throw new ExpressError(400, "User with this email already exists.");
    }
    const hashedpassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        username,
        email,
        password: hashedpassword
    })
    if (newUser) {
        generateToken(newUser._id, res);
        await newUser.save();
        const ActiveUser = newUser.toObject();
        res.status(200).send({ user: {...ActiveUser,password:undefined}, message: `Welcome to our Website ${newUser.username}` });
    }
}

export const Login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body as loginData;

    const existedUser = await User.findOne({ email: email }).select("+password");
    if (!existedUser) {
        throw new ExpressError(400, "You hadn't registered on our website.");
    }
    const isPasswordSame = await bcrypt.compare(password, existedUser.password);

    if (!isPasswordSame) {
        throw new ExpressError(400, "Password provided is incorrect.");
    }
    generateToken(existedUser._id, res);
    const ActiveUser = existedUser.toObject();
    res.status(200).send({ user: {...ActiveUser,password:undefined}, message: `Welcome back ${existedUser.username}` });
}

export const Logout = (req: Request, res: Response) => {
    res.clearCookie("token", { path: '/' });
    res.status(200).send({ message: "You are logged out of the website" });
}

export const checkauth = async(req: Request, res: Response) => {
    const id = get(req, "userId");
    const user = await User.findById(id);
    res.status(200).send({ user });
}