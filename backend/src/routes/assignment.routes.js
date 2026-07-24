import { Router } from "express";
import { AssignmentController } from "../controllers/assignment.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.use(authMiddleware);
router.get("/:studentId?", AssignmentController.getAssignments);
router.get("/detail/:id", AssignmentController.getAssignmentById);
router.post("/:id/submit", AssignmentController.submitAssignment);

export default router;
