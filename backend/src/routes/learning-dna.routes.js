import { Router } from "express";
import { LearningDnaController } from "../controllers/learning-dna.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.use(authMiddleware);
router.get("/student/:studentId?", LearningDnaController.getStudentLearningDna);
router.get("/competency/:studentId?", LearningDnaController.getCompetencies);

export default router;
