import { Router } from 'express';
import { getPrometheusMetrics } from '../controllers/metrics.controller.js';

const router = Router();

router.get('/metrics', getPrometheusMetrics);

export default router;
