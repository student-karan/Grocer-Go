import { isLoggedIn } from "../middlewares/user-middleware";
import { addAddress, getAddresses } from "./../controllers/addressController";
import { Router } from "express";
import { asyncWrap } from "./../helpers/utils";
const router = Router();

// ADD ADDRESS  /api/address/add
router.post("/add",isLoggedIn,asyncWrap(addAddress));

// GET ADDRESSES  /api/address/get
router.get("/get",isLoggedIn,asyncWrap(getAddresses));

export default router;