import { Router } from "express";
import { AnalyticsController } from "../controllers/analytics.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.use(authMiddleware);
router.get("/overview", AnalyticsController.getOverview);

export default router;
