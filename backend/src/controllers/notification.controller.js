import { query } from '../config/db.js';
import { sendSuccess, sendError } from '../utils/response.js';

/**
 * Get Authenticated User's Notifications
 */
export async function getNotifications(req, res) {
  try {
    const userId = req.params?.userId || req.user?.id || 'student-123';

    const notifications = await query(
      `SELECT id, title, message, type, is_read, created_at FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT 20`,
      [userId]
    );

    // Default notifications payload fallback if user has no DB entries yet
    const items = notifications.length > 0 ? notifications : [
      {
        id: 'notif-1',
        title: 'Welcome to VEDHKRIT',
        message: 'Your account setup is complete. Explore your growth dashboard and SLEC labs.',
        type: 'SUCCESS',
        is_read: 0,
        created_at: new Date(),
      },
      {
        id: 'notif-2',
        title: 'Diagnostic Assessment Available',
        message: 'A new STEM Aptitude assessment has been assigned to your portal profile.',
        type: 'INFO',
        is_read: 0,
        created_at: new Date(Date.now() - 3600000),
      },
    ];

    const unreadCount = items.filter((n) => !n.is_read).length;

    return sendSuccess(res, { notifications: items, unreadCount }, 'Notifications retrieved successfully.');
  } catch (error) {
    console.error('Get Notifications Error:', error);
    return sendError(res, 'Failed to fetch notifications.', 500, 'INTERNAL_SERVER_ERROR');
  }
}

/**
 * Mark Specific Notification as Read
 */
export async function markAsRead(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    await query('UPDATE notifications SET is_read = 1 WHERE id = ? AND user_id = ?', [id, userId]);

    return sendSuccess(res, { id, is_read: 1 }, 'Notification marked as read.');
  } catch (error) {
    console.error('Mark Read Error:', error);
    return sendError(res, 'Failed to update notification.', 500, 'INTERNAL_SERVER_ERROR');
  }
}

/**
 * Mark All Notifications as Read
 */
export async function markAllAsRead(req, res) {
  try {
    const userId = req.user.id;

    await query('UPDATE notifications SET is_read = 1 WHERE user_id = ?', [userId]);

    return sendSuccess(res, null, 'All notifications marked as read.');
  } catch (error) {
    console.error('Mark All Read Error:', error);
    return sendError(res, 'Failed to update notifications.', 500, 'INTERNAL_SERVER_ERROR');
  }
}
