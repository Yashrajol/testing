import { Router } from 'express';
import { getActiveSessions, revokeSession, revokeOtherSessions } from '../controllers/session.controller.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.get('/sessions/me', authenticateToken, getActiveSessions);
router.delete('/sessions/other', authenticateToken, revokeOtherSessions);
router.delete('/sessions/:id', authenticateToken, revokeSession);

export default router;
