// routes/admin.routes.js
import express from "express";
import { getUnverifiedUsersController } from "../controllers/admin.controller.js";
import { isAdmin, protectRoute } from "../middleware/auth.middleware.js";
import { getSingleUserController } from "../controllers/admin.controller.js";
import { verifyUserController } from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/users/unverified", protectRoute, isAdmin, getUnverifiedUsersController);
router.get("/users/:id", protectRoute, isAdmin, getSingleUserController);
router.put("/users/:id/verify", protectRoute, isAdmin, verifyUserController);


export default router;
