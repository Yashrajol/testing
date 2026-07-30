import { Router } from 'express';
import { getLabs, getLabById, getMyProjects, createProject } from '../controllers/slec.controller.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.get('/slec/labs', getLabs);
router.get('/slec/labs/:id', getLabById);
router.get('/slec/projects/me', authenticateToken, getMyProjects);
router.post('/slec/projects', authenticateToken, createProject);

export default router;
