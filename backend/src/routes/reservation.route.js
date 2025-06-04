import express from "express";
import { isDriver, isPassenger, protectRoute } from "../middleware/auth.middleware.js";
import { annulerReservation, confirmerReservation, createReservation, updateReservationStatus } from "../controllers/reservation.controller.js";

const router = express.Router();

router.post("/", protectRoute,isPassenger, createReservation);//creer la reservation
router.patch("/:id/status", protectRoute,isDriver, updateReservationStatus); // PATCH /reservations/:id/status
router.put("/:id/confirmer", protectRoute,isPassenger, confirmerReservation); // PUT /reservations/:id/confirmer
router.put("/:id/annuler", protectRoute,isPassenger ,annulerReservation);

router.get("/passager/trajets", protectRoute,isDriver, updateReservationStatus); // PATCH /reservations/:id/status

export default router;
