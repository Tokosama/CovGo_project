import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createJustificatifs, getJustificatifsByUserId } from "../controllers/justificatif.controller.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.post("/create", protectRoute, upload.array("files"), createJustificatifs);
router.get("/:userId", protectRoute, getJustificatifsByUserId);

export default router;
