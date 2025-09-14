import express from "express";
import { checkAdmin, checkloggedIn, loginUser, registerUser } from "../controller/userController.js";
import { isLoggedIn } from "../middleware/isloggedin.js";
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/checkAdmin").get(isLoggedIn,checkAdmin);
router.route("/checkloggedIn").get(isLoggedIn,checkloggedIn);
export default router;