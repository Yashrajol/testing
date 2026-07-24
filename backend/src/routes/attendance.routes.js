import { Router } from "express";
import { AttendanceController } from "../controllers/attendance.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.use(authMiddleware);
router.get("/holidays/calendar", AttendanceController.getHolidaysCalendar);
router.get("/:studentId?", AttendanceController.getAttendance);

export default router;
