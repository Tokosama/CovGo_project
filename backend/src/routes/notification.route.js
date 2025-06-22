import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getUserNotifications, markNotificationAsRead } from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/", protectRoute, getUserNotifications);
router.put("/:id/mark-as-read", protectRoute,markNotificationAsRead);
router.post("mark-all-as-read ", protectRoute);
export default router;
