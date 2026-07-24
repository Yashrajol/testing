import { Router } from "express";
import { MentorController } from "../controllers/mentor.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.use(authMiddleware);
router.get("/dashboard", MentorController.getDashboard);
router.get("/students", MentorController.getStudents);
router.get("/sessions", MentorController.getSessions);

export default router;
