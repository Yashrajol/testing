import { Router } from 'express';
import { getMessages, sendMessage, markThreadAsRead } from '../controllers/chat.controller.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.get('/chat/messages/:recipientId', authenticateToken, getMessages);
router.post('/chat/messages', authenticateToken, sendMessage);
router.patch('/chat/messages/read', authenticateToken, markThreadAsRead);

export default router;
