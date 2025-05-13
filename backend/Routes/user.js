import express from "express";
import RegisterUser from "../controllers/user.js";
import { loginUser } from "../controllers/user.js";
import { getUserProfile } from "../controllers/user.js";
import { logOut } from "../controllers/user.js";
const router = express.Router();

router.post("/register", RegisterUser);
router.post("/login", loginUser);
router.get("/profile", getUserProfile);
router.post("/logout", logOut);

export { router };
