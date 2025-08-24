import { Router} from "express";
import { isLoggedIn } from "./../middlewares/user_middleware";
import { updatecart } from "./../controllers/cartController";
import { asyncWrap } from "./../helpers/utils";
const router = Router();

router.post("/update",isLoggedIn,asyncWrap(updatecart));

export default router;