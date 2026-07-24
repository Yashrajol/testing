import { Router } from "express";
import authRoutes from "./auth.routes.js";
import studentRoutes from "./student.routes.js";
import parentRoutes from "./parent.routes.js";
import adminRoutes from "./admin.routes.js";
import analyticsRoutes from "./analytics.routes.js";
import mentorRoutes from "./mentor.routes.js";
import aiRoutes from "./ai.routes.js";
import notificationRoutes from "./notification.routes.js";
import assessmentRoutes from "./assessment.routes.js";
import growthRoutes from "./growth.routes.js";
import sessionsRoutes from "./sessions.routes.js";
import superAdminRoutes from "./super-admin.routes.js";
import academicsRoutes from "./academics.routes.js";
import assignmentRoutes from "./assignment.routes.js";
import attendanceRoutes from "./attendance.routes.js";
import learningDnaRoutes from "./learning-dna.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/student", studentRoutes);
router.use("/gateway", studentRoutes);
router.use("/parent", parentRoutes);
router.use("/parent-portal", parentRoutes);
router.use("/admin", adminRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/mentor", mentorRoutes);
router.use("/ai", aiRoutes);
router.use("/notifications", notificationRoutes);
router.use("/assessments", assessmentRoutes);
router.use("/growth", growthRoutes);
router.use("/sessions", sessionsRoutes);
router.use("/super-admin", superAdminRoutes);
router.use("/academics", academicsRoutes);
router.use("/assignments", assignmentRoutes);
router.use("/attendance", attendanceRoutes);
router.use("/learning-dna", learningDnaRoutes);

// Healthcheck endpoint
router.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "VEDHKRIT Express.js BFF Service",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

export default router;
