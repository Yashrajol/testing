import { Router } from "express";
import { AcademicsController } from "../controllers/academics.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.use(authMiddleware);
router.get("/entities", AcademicsController.getEntities);
router.get("/", AcademicsController.getEntities);

export default router;
