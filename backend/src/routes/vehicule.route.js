import express from "express";
import { isDriver, protectRoute } from "../middleware/auth.middleware.js";
import { createVehicule } from "../controllers/vehicule.controller.js";

const router = express.Router();

router.post("/", protectRoute,isDriver, createVehicule);

export default router;
