import { isSellerLoggedIn } from "./../middlewares/seller_middleware";
import { checkseller, sellerLogin, sellerLogout } from "./../controllers/sellerController";
import { Router } from "express";
import { asyncWrap } from "./../helpers/utils";
const router = Router();

// seller login : /api/seller/login
router.post("/login",asyncWrap(sellerLogin));

// seller logout : /api/seller/logout
router.get("/logout",isSellerLoggedIn,asyncWrap(sellerLogout));

// seller isAuthenticated : /api/seller/checkSeller
router.get("/checkSeller",isSellerLoggedIn,asyncWrap(checkseller));

export default router;