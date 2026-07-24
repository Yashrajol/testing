import { Router } from "express";
import { StudentController } from "../controllers/student.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.use(authMiddleware);
router.get("/dashboard/:studentId?", StudentController.getDashboard);
router.get("/dashboard/student/:studentId?", StudentController.getDashboard);
router.get("/academics", StudentController.getAcademics);
router.get("/assessments", StudentController.getAssessments);
router.get("/goals", StudentController.getGoals);
router.get("/sessions", StudentController.getSessions);

export default router;
