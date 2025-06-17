// routes/evaluation.route.js
import express from "express";
import { createEvaluationController } from "../controllers/evaluation.controller.js";
import { protectRoute, isPassenger } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protectRoute, isPassenger, createEvaluationController);

export default router;
