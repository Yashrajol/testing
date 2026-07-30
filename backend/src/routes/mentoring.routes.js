import { Router } from 'express';
import { getMentors, getMySessions, bookSession } from '../controllers/mentoring.controller.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.get('/mentoring/mentors', getMentors);
router.get('/mentoring/sessions/me', authenticateToken, getMySessions);
router.post('/mentoring/sessions', authenticateToken, bookSession);

export default router;
