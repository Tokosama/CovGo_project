import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();
//register 
router.post("/register", register); // étape 1

