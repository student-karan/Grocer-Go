import { newProductValidation } from "./../helpers/validation";
import { addProduct, allProducts, allProductsSeller, changestock, getProduct } from "./../controllers/productController";
import { Router } from "express";
import { asyncWrap } from "./../helpers/utils";
import { isSellerLoggedIn } from "../middlewares/seller-middleware";
import { upload } from "../middlewares/multer-middleware";

const router = Router();

// Add product : /api/product/add
router.post("/add",upload.array("image",4),newProductValidation,asyncWrap(addProduct));

// get products : /api/product/user
router.get("/user",asyncWrap(allProducts));

// get products seller : /api/product/seller
router.get("/seller",asyncWrap(allProductsSeller));

// get product : /api/product/:id
router.get("/:id",asyncWrap(getProduct));

// change product inStock : /api/product/:id/stock
router.post("/stock/:id",asyncWrap(isSellerLoggedIn),asyncWrap(changestock));

export default router;