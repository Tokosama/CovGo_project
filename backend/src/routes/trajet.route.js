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
import {
  isDriver,
  isPassenger,
  protectRoute,
} from "../middleware/auth.middleware.js";
import { verifyConducteurOwnership } from "../middleware/trajet.middleware.js";
import { createEvaluationController } from "../controllers/evaluation.controller.js";

const router = express.Router();
//creer le trajet
router.post("/create", protectRoute, isDriver, createTrajetController);
//recuperer tous les trajets
router.get("/all", protectRoute, getAllTrajets);
//recupere tous les trajets de l'user connectee
router.get("/me", protectRoute, isDriver, getMyTrajets); // accessible uniquement à l'utilisateur connecté
//recuperer un trajet precis
router.get("/:id", protectRoute, getTrajetById); // accessible uniquement à l'utilisateur connecté
//filtrer les trajets
router.get("/filter", protectRoute, getTrajetsWithFilters); // 🌟 nouvelle route
//annuler un trajet
router.put(
  "/:id/annuler",
  protectRoute,
  isDriver,
  verifyConducteurOwnership,
  annulerTrajet
);
//demarrer un trajet
router.put(
  "/:id/demarrer",
  protectRoute,
  isDriver,
  verifyConducteurOwnership,
  demarrerTrajet
);
//terminer un trajet
router.put(
  "/:id/terminer",
  protectRoute,
  isDriver,
  verifyConducteurOwnership,
  terminerTrajet
);

//recuperer les reservations du trajet
router.get("/:trajetId/reservations", protectRoute, getReservationsByTrajet);
//evaluer un trajet
router.post(
  "/:trajet_id/evaluation",
  protectRoute,
  isPassenger,
  createEvaluationController
);

export default router;
