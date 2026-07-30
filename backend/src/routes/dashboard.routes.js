import { Router } from 'express';
import {
  getStudentDashboard,
  toggleChecklistItem,
  getParentDashboard,
  getTeacherDashboard,
  getMentorDashboard,
  getAdminDashboard,
} from '../controllers/dashboard.controller.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';

const router = Router();

// Student Dashboard Routes & Gateway Aliases
router.get('/dashboards/student', getStudentDashboard);
router.get('/gateway/dashboard/student/:studentId', getStudentDashboard);
router.patch('/dashboards/student/checklist', authenticateToken, toggleChecklistItem);

// Other Role Dashboards
router.get('/dashboards/parent', authenticateToken, getParentDashboard);
router.get('/parent/dashboard', authenticateToken, getParentDashboard);
router.get('/dashboards/teacher', authenticateToken, authorizeRoles('TEACHER', 'SCHOOL_ADMIN', 'SUPERADMIN'), getTeacherDashboard);
router.get('/dashboards/mentor', authenticateToken, authorizeRoles('MENTOR', 'SUPERADMIN'), getMentorDashboard);
router.get('/mentor/dashboard', authenticateToken, authorizeRoles('MENTOR', 'SUPERADMIN'), getMentorDashboard);
router.get('/dashboards/admin', authenticateToken, authorizeRoles('SCHOOL_ADMIN', 'SUPERADMIN'), getAdminDashboard);
router.get('/admin/dashboard', authenticateToken, authorizeRoles('SCHOOL_ADMIN', 'SUPERADMIN'), getAdminDashboard);

export default router;
