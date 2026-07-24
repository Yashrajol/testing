import { Router } from "express";
import { ParentController } from "../controllers/parent.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.use(authMiddleware);
router.get("/overview/:studentId?", ParentController.getOverview);
router.get("/:studentId/overview", ParentController.getOverview);
router.get("/attendance/:studentId?", ParentController.getAttendance);
router.get("/academics/:studentId?", ParentController.getAcademics);
router.get("/assignments/:studentId?", ParentController.getAssignments);
router.get("/assessments/:studentId?", ParentController.getAssessments);
router.get("/growth/:studentId?", ParentController.getGrowth);
router.get("/notifications/:studentId?", ParentController.getNotifications);

export default router;
