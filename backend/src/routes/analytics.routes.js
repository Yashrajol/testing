import { Router } from 'express';
import { getStudentAnalytics, getCohortAnalytics } from '../controllers/analytics.controller.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.get('/analytics/student/:id', authenticateToken, getStudentAnalytics);
router.get('/analytics/overview', authenticateToken, getCohortAnalytics);

export default router;
