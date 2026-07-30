import { Router } from 'express';
import { getNotifications, markAsRead, markAllAsRead } from '../controllers/notification.controller.js';
import { authenticateToken, optionalAuthToken } from '../middleware/auth.js';

const router = Router();

// Auth-based route (token required, fetches own notifications)
router.get('/notifications/me', authenticateToken, getNotifications);

// User-ID based route (uses optionalAuthToken to prevent 401 on guest / fallback ID requests)
router.get('/notifications/user/:userId', optionalAuthToken, getNotifications);

// Announcements
router.get('/notifications/announcements', optionalAuthToken, getNotifications);

// Mark read
router.post('/notifications/mark-read', optionalAuthToken, markAllAsRead);

router.patch('/notifications/:id/read', authenticateToken, markAsRead);
router.patch('/notifications/read-all', authenticateToken, markAllAsRead);

export default router;
