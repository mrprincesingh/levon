import express from "express"
import { getAllUsers, getMyProfile, login, logout, register } from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.route("/register").post(  register)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/me").get( getMyProfile )
router.route("/users").get( getAllUsers);

export default router