import { Router } from 'express';
import { getGoals, createGoal, updateGoal, deleteGoal } from '../controllers/growth.controller.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.get('/goals/me', authenticateToken, getGoals);
router.get('/goals/:studentId', authenticateToken, getGoals);
router.post('/goals', authenticateToken, createGoal);
router.patch('/goals/:id', authenticateToken, updateGoal);
router.delete('/goals/:id', authenticateToken, deleteGoal);

export default router;
