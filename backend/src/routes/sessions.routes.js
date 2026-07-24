import { Router } from "express";
import { SessionsController } from "../controllers/sessions.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.use(authMiddleware);
router.get("/:studentId?", SessionsController.getSessions);

export default router;
