import { Router } from 'express';
import { getUsers, updateUserStatus, getSystemStats, getStudentsList, getMentorsList, getParentsList } from '../controllers/admin.controller.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';

const router = Router();

// Protect specific admin routes for SCHOOL_ADMIN and SUPERADMIN roles
const adminAuth = [authenticateToken, authorizeRoles('SCHOOL_ADMIN', 'SUPERADMIN')];

router.get('/users', ...adminAuth, getUsers);
router.get('/students', ...adminAuth, getStudentsList);
router.get('/mentors', ...adminAuth, getMentorsList);
router.get('/parents', ...adminAuth, getParentsList);
router.patch('/users/:id/status', ...adminAuth, updateUserStatus);
router.get('/stats', ...adminAuth, getSystemStats);

export default router;
