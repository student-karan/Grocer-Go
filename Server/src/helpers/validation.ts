import { NextFunction, Request, Response } from "express";
import ExpressError from "./../ExpressError";
import * as z from "zod";

// USER SIGNUP VALIDATION
const signupSchema = z.object({
    username: z.string().min(5, "Full name is required"),
    email: z.email("Please enter a valid email address"),
    password: z.string().min(5, "Password must be of atleast 5 characters.")
        .regex(/[a-z]/, "Password must contain atleast 1 lowercase letter.")
        .regex(/[A-Z]/, "Password must contain atleast 1 uppercase letter.")
        .regex(/[0-9]/, "Password must contain atleast 1 numeral.")
        .regex(/[^a-zA-Z0-9]/, "Password must contain atleast 1 special character.")
}).strict();

export const signupValidation = (req: Request, res: Response, next: NextFunction) => {
    const results = signupSchema.safeParse(req.body);
    if (results.error) {
        next(new ExpressError(400, results.error.issues[0].message));
    } else {
        next();
    }
}
export type signupData = z.infer<typeof signupSchema>;

// USER LOGIN VALIDATION
const loginSchema = z.object({
    email: z.email("Please enter a valid email address"),
    password: z.string()
}).strict();

export const loginValidation = (req: Request, res: Response, next: NextFunction) => {
    const results = loginSchema.safeParse(req.body);
    if (results.error) {
        next(new ExpressError(400, results.error.issues[0].message));
    } else {
        next();
    }
}
export type loginData = z.infer<typeof loginSchema>;

// NEW PRODUCT VALIDATION
const productSchema = z.object({
    name: z.string(),
    category: z.enum(["Vegetables", "Fruits", "Drinks", "Instant", "Dairy", "Bakery", "Grains"]),
    price: z.string(),
    offerprice: z.string(),
    description: z.array(z.string()),
    inStock: z.boolean().default(true)
})

export const newProductValidation = (req: Request, res: Response, next: NextFunction) => {
    const results = productSchema.safeParse(req.body);
    if (results.error) {
        next(new ExpressError(400, results.error.issues[0].message));
    } else {
        next();
    }
}
export type productData = z.infer<typeof productSchema>;

// USER ADDRESS VALIDATION
const addressSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zipcode: z.string(),
    country: z.string(),
    phone: z.string(),
})
export const newAddressValidation = (req: Request, res: Response, next: NextFunction) => {
    const results = addressSchema.safeParse(req.body);
    if (results.error) {
        next(new ExpressError(400, results.error.issues[0].message));
    } else {
        next();
    }
}
export type addressData = z.infer<typeof addressSchema>;

// PLACED ORDER (CASH ON DELIVERY)
const orderSchema = z.object({
    address: z.string().min(1,"Address cannot be empty"),
    cartItems: z.record(z.string(),z.number())
})
export const orderValidation = (req: Request, res: Response, next: NextFunction) => {
    const results = orderSchema.safeParse(req.body);
    if (results.error) {
        next(new ExpressError(400, results.error.issues[0].message));
    } else {
        next();
    }
}
export type orderData = z.infer<typeof orderSchema>;