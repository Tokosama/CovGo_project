import express from "express";
import {
  register,
  verifyOTP,
  resendOTP,
  login,
  logout,
  checkAuth,
  updateProfile,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();
//register 
router.post("/register", register); // étape 1
router.post("/verify", verifyOTP); // étape 2
router.post("/resend-otp", resendOTP); // étape 2
//login
router.post("/login", login);
//logout
router.post("/logout", logout);

router.patch("/updateProfile", protectRoute,upload.single("photo"),updateProfile);

router.get("/check", protectRoute, checkAuth);
export default router;
