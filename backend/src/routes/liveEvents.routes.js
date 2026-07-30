import { Router } from 'express';
import { connectLiveEvents } from '../controllers/liveEvents.controller.js';

const router = Router();

router.get('/live/events', connectLiveEvents);

export default router;
