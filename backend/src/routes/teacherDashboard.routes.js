import { Router } from 'express';
import {
  getTeacherOverview,
  getCohortRoster,
  recordClassAttendance,
  getPendingSubmissions,
  gradeSubmission,
} from '../controllers/teacherDashboard.controller.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';

const router = Router();

// Teacher Overview Route
router.get('/teacher/overview', getTeacherOverview);

// Teacher Class & Roster Routes
router.get('/teacher/cohorts/:id/roster', authenticateToken, authorizeRoles('TEACHER', 'SCHOOL_ADMIN', 'SUPERADMIN'), getCohortRoster);
router.post('/teacher/cohorts/:id/attendance', authenticateToken, authorizeRoles('TEACHER', 'SCHOOL_ADMIN', 'SUPERADMIN'), recordClassAttendance);

// Teacher Grading Routes
router.get('/teacher/submissions/pending', authenticateToken, authorizeRoles('TEACHER', 'SCHOOL_ADMIN', 'SUPERADMIN'), getPendingSubmissions);
router.post('/teacher/submissions/grade', authenticateToken, authorizeRoles('TEACHER', 'SCHOOL_ADMIN', 'SUPERADMIN'), gradeSubmission);

export default router;
