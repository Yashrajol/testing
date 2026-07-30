import { Router } from 'express';
import { getCohorts, getCohortStudents, recordAttendance, getAttendanceReport } from '../controllers/cohort.controller.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';

const router = Router();

router.get('/cohorts', authenticateToken, getCohorts);
router.get('/cohorts/:id/students', authenticateToken, getCohortStudents);
router.post('/cohorts/:id/attendance', authenticateToken, authorizeRoles('TEACHER', 'SCHOOL_ADMIN', 'SUPERADMIN'), recordAttendance);
router.get('/cohorts/:id/attendance', authenticateToken, getAttendanceReport);

export default router;
