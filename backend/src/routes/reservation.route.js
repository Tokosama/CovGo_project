import express from "express";
import { isDriver, isPassenger, protectRoute } from "../middleware/auth.middleware.js";
import { annulerReservation, confirmerReservation, createReservation, getMyReservationsController, getReservationsForConducteurController, updateReservationStatus } from "../controllers/reservation.controller.js";

const router = express.Router();



router.get("/me", protectRoute, getMyReservationsController);

router.post("/create", protectRoute,isPassenger, createReservation);//creer la reservation
router.patch("/:id/status", protectRoute,isDriver, updateReservationStatus); // PATCH /reservations/:id/status
router.put("/:id/confirmer", protectRoute,isPassenger, confirmerReservation); // PUT /reservations/:id/confirmer
router.put("/:id/annuler", protectRoute,isPassenger ,annulerReservation);
router.get('/mes-reservations-passager', protectRoute,isPassenger, getMyReservationsController);
router.get('/mes-reservations-conducteur', protectRoute,isDriver, getReservationsForConducteurController);

export default router;