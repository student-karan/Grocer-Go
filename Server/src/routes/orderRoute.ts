import { isLoggedIn } from "../middlewares/user-middleware";
import { Router } from "express";
import { asyncWrap } from "./../helpers/utils";
import { getSellerOrders, getUserOrders, placeOrderCOD, placeOrderStripe } from "./../controllers/orderController";
import { isSellerLoggedIn } from "../middlewares/seller-middleware";
const router = Router();

router.post("/cod",isLoggedIn,asyncWrap(placeOrderCOD));

router.post("/stripe",isLoggedIn,asyncWrap(placeOrderStripe));

router.get("/user",isLoggedIn,asyncWrap(getUserOrders));

router.get("/seller",isSellerLoggedIn,asyncWrap(getSellerOrders));


export default router;