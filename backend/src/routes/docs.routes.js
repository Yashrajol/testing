import { Router } from 'express';
import { getApiDocsHtml, getApiDocsJson } from '../controllers/docs.controller.js';

const router = Router();

router.get('/docs/json', getApiDocsJson);
router.get('/docs', getApiDocsHtml);

export default router;
