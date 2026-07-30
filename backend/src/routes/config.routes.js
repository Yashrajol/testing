import { Router } from 'express';
import { getFeatureFlags, updateFeatureFlag } from '../controllers/config.controller.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';

const router = Router();

router.get('/config/flags', getFeatureFlags);
router.post('/config/flags', authenticateToken, authorizeRoles('SCHOOL_ADMIN', 'SUPERADMIN'), updateFeatureFlag);

export default router;
