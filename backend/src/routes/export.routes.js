import { Router } from 'express';
import { exportReportCard, exportCohortCsv } from '../controllers/export.controller.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';

const router = Router();

router.get('/export/report-card/:studentId', authenticateToken, exportReportCard);
router.get('/export/analytics/csv', authenticateToken, authorizeRoles('SCHOOL_ADMIN', 'SUPERADMIN'), exportCohortCsv);

export default router;
