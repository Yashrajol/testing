import { Router } from "express";
import { AssessmentController } from "../controllers/assessment.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.use(authMiddleware);
router.get("/", AssessmentController.getAssessments);
router.get("/:id", AssessmentController.getAssessmentById);
router.post("/:id/submit", AssessmentController.submitAssessment);

export default router;
