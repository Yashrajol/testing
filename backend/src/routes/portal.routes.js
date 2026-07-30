import { Router } from 'express';
import { getStudentOverview, getParentOverview, getMentorOverview } from '../controllers/portal.controller.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// Routes for portal overviews (compatible with frontend URLs)
router.get('/student-portal/:id/overview', authenticateToken, getStudentOverview);
router.get('/student-portal/overview', authenticateToken, getStudentOverview);

router.get('/parent-portal/:id/overview', authenticateToken, getParentOverview);
router.get('/parent-portal/overview', authenticateToken, getParentOverview);

router.get('/mentor-portal/:id/overview', authenticateToken, getMentorOverview);
router.get('/mentor-portal/overview', authenticateToken, getMentorOverview);

export default router;
