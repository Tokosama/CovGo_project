import express from "express";
import {
  annulerTrajet,
  createTrajetController,
  demarrerTrajet,
  getAllTrajets,
  getMyTrajets,
  getReservationsByTrajet,
  getTrajetById,
  getTrajetsWithFilters,
  terminerTrajet,
} from "../controllers/trajet.controller.js";
import { isDriver, protectRoute } from "../middleware/auth.middleware.js";
import { verifyConducteurOwnership } from "../middleware/trajet.middleware.js";

const router = express.Router();

router.post("/create", protectRoute, isDriver, createTrajetController);
router.get("/all", protectRoute, getAllTrajets);
router.get("/me", protectRoute, isDriver, getMyTrajets); // accessible uniquement à l'utilisateur connecté
router.get("/:id", protectRoute, getTrajetById); // accessible uniquement à l'utilisateur connecté
router.get("/filter", protectRoute, getTrajetsWithFilters); // 🌟 nouvelle route
router.put(
  "/:id/annuler",
  protectRoute,isDriver,
  verifyConducteurOwnership,
  annulerTrajet
);
router.put(
  "/:id/demarrer",
  protectRoute,
  isDriver,
  verifyConducteurOwnership,
  demarrerTrajet
);
router.put(
  "/:id/terminer",
  protectRoute,
  isDriver,
  verifyConducteurOwnership,
  terminerTrajet
);
router.get("/:trajetId/reservations", protectRoute, getReservationsByTrajet);


export default router;
