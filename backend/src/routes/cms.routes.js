import { Router } from 'express';
import { getCmsPage, updateCmsSection } from '../controllers/cms.controller.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.get('/cms/:slug', getCmsPage);
router.post('/cms/:slug/:sectionKey', authenticateToken, updateCmsSection);

export default router;
