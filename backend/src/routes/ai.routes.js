import { Router } from "express";
import { AiController } from "../controllers/ai.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.use(authMiddleware);
router.post("/chat", AiController.chat);

export default router;
