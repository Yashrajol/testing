import { Router } from "express";
import { NotificationController } from "../controllers/notification.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.use(authMiddleware);
router.get("/user/:userId?", NotificationController.getNotifications);
router.get("/:userId?", NotificationController.getNotifications);
router.patch("/:id/read", NotificationController.markAsRead);

export default router;
