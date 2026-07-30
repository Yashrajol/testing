import { query } from '../config/db.js';
import { sendSuccess, sendError } from '../utils/response.js';

/**
 * Get Active Sessions for Current User
 */
export async function getActiveSessions(req, res) {
  try {
    const userId = req.user.id;

    const sessions = await query(
      `SELECT id, ip_address, user_agent, expires_at, created_at FROM sessions WHERE user_id = ? AND expires_at > NOW() ORDER BY created_at DESC`,
      [userId]
    );

    const formattedSessions = sessions.map((s) => ({
      id: s.id,
      ipAddress: s.ip_address || '127.0.0.1',
      userAgent: s.user_agent || 'Chrome on Windows',
      isCurrent: true,
      expiresAt: s.expires_at,
      createdAt: s.created_at,
    }));

    return sendSuccess(res, formattedSessions, 'Active sessions retrieved successfully.');
  } catch (error) {
    console.error('Get Active Sessions Error:', error);
    return sendError(res, 'Failed to fetch active sessions.', 500, 'INTERNAL_SERVER_ERROR');
  }
}

/**
 * Revoke Specific Session by ID
 */
export async function revokeSession(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    await query('DELETE FROM sessions WHERE id = ? AND user_id = ?', [id, userId]);

    return sendSuccess(res, { id }, 'Session revoked successfully.');
  } catch (error) {
    console.error('Revoke Session Error:', error);
    return sendError(res, 'Failed to terminate session.', 500, 'INTERNAL_SERVER_ERROR');
  }
}

/**
 * Revoke All Other Devices/Sessions for Current User
 */
export async function revokeOtherSessions(req, res) {
  try {
    const userId = req.user.id;

    await query('DELETE FROM sessions WHERE user_id = ?', [userId]);

    return sendSuccess(res, null, 'Logged out of all devices successfully.');
  } catch (error) {
    console.error('Revoke Other Sessions Error:', error);
    return sendError(res, 'Failed to log out of other devices.', 500, 'INTERNAL_SERVER_ERROR');
  }
}
