import { Router } from 'express';
import { getAssessments, getAssessmentById, submitAssessmentAnswer } from '../controllers/assessment.controller.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.get('/assessments', authenticateToken, getAssessments);
router.get('/assessments/:id', authenticateToken, getAssessmentById);
router.post('/attempts/:attemptId/answer', authenticateToken, submitAssessmentAnswer);

export default router;
