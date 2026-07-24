import { Router } from "express";
import { GrowthController } from "../controllers/growth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.use(authMiddleware);
router.get("/index/:userId?", GrowthController.getIndex);
router.get("/careers/:userId?", GrowthController.getCareers);
router.get("/insights/:userId?", GrowthController.getInsights);
router.get("/goals/:userId?", GrowthController.getGoals);
router.post("/goals", GrowthController.createGoal);

export default router;
