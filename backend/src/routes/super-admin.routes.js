import { Router } from "express";
import { SuperAdminController } from "../controllers/super-admin.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.use(authMiddleware);
router.get("/dashboard", SuperAdminController.getDashboard);

export default router;
