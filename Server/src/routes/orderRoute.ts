import { isLoggedIn } from "../middlewares/user-middleware";
import { Router } from "express";
import { asyncWrap } from "./../helpers/utils";
import { getSellerOrders, getUserOrders, placeOrderCOD, placeOrderStripe,updateOrderStatus, verifyStripe } from "./../controllers/orderController";
import { isSellerLoggedIn } from "../middlewares/seller-middleware";
const router = Router();

// place order cod : /api/order/cod
router.post("/cod",isLoggedIn,asyncWrap(placeOrderCOD));

// place order stripe : /api/order/stripe
router.post("/stripe",isLoggedIn,asyncWrap(placeOrderStripe));

// stripe payment verification : /api/order/verify/:success/:orderId
router.get("/verify/:success/:orderId",isLoggedIn,asyncWrap(verifyStripe));

// get orders by user id : /api/order/user
router.get("/user",isLoggedIn,asyncWrap(getUserOrders));

// get orders for seller : /api/order/seller
router.get("/seller",isSellerLoggedIn,asyncWrap(getSellerOrders));

// update order status : /api/order/updateStatus/:orderId
router.post("/updateStatus/:orderId",isSellerLoggedIn,asyncWrap(updateOrderStatus));

export default router;