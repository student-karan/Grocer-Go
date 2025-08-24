import { loginValidation, signupValidation } from "../helpers/validation";
import { checkauth, Login, Logout, Signup } from "../controllers/userController";
import { Router } from "express";
import { isLoggedIn } from "../middlewares/user_middleware";
import { asyncWrap } from "../helpers/utils";
const router = Router();

// signup : /api/user/signup
router.post("/signup",signupValidation,asyncWrap(Signup));

// login : /api/user/login
router.post("/login",loginValidation,asyncWrap(Login));

// logout : /api/user/logout
router.get("/logout",isLoggedIn,Logout);

//Authentication check : /api/user/checkUser
router.get("/checkUser",isLoggedIn,checkauth);

export default router;