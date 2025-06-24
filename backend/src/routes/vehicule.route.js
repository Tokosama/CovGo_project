import express from "express";
import { isDriver, protectRoute } from "../middleware/auth.middleware.js";
import { createVehicule, deleteVehicule, getVehiculesByUser } from "../controllers/vehicule.controller.js";

const router = express.Router();

router.post("/", protectRoute,isDriver, createVehicule);
router.get("/mes-vehicules", protectRoute, getVehiculesByUser);
router.delete("/:vehiculeId", protectRoute, isDriver, deleteVehicule);
export default router;
