import { Router } from 'express';
import { evaluateDiagnostics, getMyRecommendation } from '../controllers/aiDiagnostic.controller.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.post('/ai/diagnostics/evaluate', authenticateToken, evaluateDiagnostics);
router.get('/ai/diagnostics/me', authenticateToken, getMyRecommendation);

export default router;
