import { Router } from 'express';
import { getMyCertificates, issueCertificate, verifyCertificate } from '../controllers/certificate.controller.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';

const router = Router();

router.get('/certificates/me', authenticateToken, getMyCertificates);
router.post('/certificates/issue', authenticateToken, authorizeRoles('TEACHER', 'MENTOR', 'SCHOOL_ADMIN', 'SUPERADMIN'), issueCertificate);
router.get('/certificates/verify/:hash', verifyCertificate);

export default router;
