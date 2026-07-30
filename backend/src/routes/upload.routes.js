import { Router } from 'express';
import { handleUpload } from '../controllers/upload.controller.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.post('/upload', authenticateToken, handleUpload);

export default router;
