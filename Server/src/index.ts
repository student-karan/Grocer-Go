import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "compression";
import connectdb from "./helpers/db";
import UserRouter from "./routes/userRoute";
import SellerRouter from "./routes/sellerRoute";
import ProductRouter from "./routes/productRoute";
import CartRouter from "./routes/cartRoute";
import AddressRouter from "./routes/addressRoute";
import OrderRouter from "./routes/orderRoute";
import ExpressError from "./ExpressError";
import path from "path";
import { asyncWrap } from "./helpers/utils";
import { connectCloudinary } from "./helpers/cloudinary";
import { stripeWebhooks } from "./controllers/orderController";

const app = express();
const port = process.env.PORT || 4000;

// database and cloudinary configuration
connectdb();
connectCloudinary();

const AllowedOrigins = ["http://localhost:5173"];

app.use(cors({
    origin: AllowedOrigins,
    credentials: true
}))

app.post("/stripe",express.raw({type:"application/json"}),asyncWrap(stripeWebhooks));

// middleware configuration
app.use(cookieParser());
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// all routes
app.use("/api/user", UserRouter);
app.use("/api/seller", SellerRouter);
app.use("/api/product", ProductRouter);
app.use("/api/cart", CartRouter);
app.use("/api/address", AddressRouter);
app.use("/api/order",OrderRouter);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../../Client/dist")));

    app.get(/.*/,(req:Request,res:Response)=>{
        res.sendFile(path.join(__dirname,"../../Client/dist/index.html"));
    })
}

// error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ExpressError) {
        res.status(err.status).json(err.message);
    } else {
        res.status(500).send(err.message);
    }
})
app.listen(port, () => {
    console.log(`server running on http://localhost:${port}`);
})
