import { Router } from "express";
import { AdminController } from "../controllers/admin.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.use(authMiddleware);
router.get("/dashboard", AdminController.getDashboard);
router.get("/students", AdminController.getStudents);
router.get("/mentors", AdminController.getMentors);

export default router;
