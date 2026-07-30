import { query } from '../config/db.js';
import { sendSuccess, sendError } from '../utils/response.js';

/**
 * Get Paginated List of Users for Admins
 */
export async function getUsers(req, res) {
  try {
    const { role, status, page = 1, limit = 20 } = req.query;

    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10)));
    const offset = (pageNum - 1) * limitNum;

    let sql = `SELECT id, name, email, phone_number, role, status, created_at FROM users WHERE deleted_at IS NULL`;
    const params = [];

    if (role) {
      sql += ` AND role = ?`;
      params.push(role.toUpperCase());
    }

    if (status) {
      sql += ` AND status = ?`;
      params.push(status.toUpperCase());
    }

    sql += ` ORDER BY created_at DESC LIMIT ? OFFSET ?`;
    params.push(limitNum, offset);

    const users = await query(sql, params);

    // Count total users matching filters
    let countSql = `SELECT COUNT(*) as total FROM users WHERE deleted_at IS NULL`;
    const countParams = [];

    if (role) {
      countSql += ` AND role = ?`;
      countParams.push(role.toUpperCase());
    }
    if (status) {
      countSql += ` AND status = ?`;
      countParams.push(status.toUpperCase());
    }

    const countResult = await query(countSql, countParams);
    const total = countResult[0]?.total || 0;

    return sendSuccess(
      res,
      {
        users,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum),
        },
      },
      'Admin users list retrieved successfully.'
    );
  } catch (error) {
    console.error('Get Admin Users Error:', error);
    return sendError(res, 'Failed to fetch users list.', 500, 'INTERNAL_SERVER_ERROR');
  }
}

/**
 * Update User Status (Suspend, Activate)
 */
export async function updateUserStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['ACTIVE', 'SUSPENDED', 'PENDING_VERIFICATION'];
    if (!status || !validStatuses.includes(status.toUpperCase())) {
      return sendError(res, `Invalid status. Must be one of: ${validStatuses.join(', ')}`, 400, 'VALIDATION_ERROR');
    }

    const formattedStatus = status.toUpperCase();

    const userRows = await query('SELECT id FROM users WHERE id = ? AND deleted_at IS NULL', [id]);
    if (userRows.length === 0) {
      return sendError(res, 'User not found.', 404, 'NOT_FOUND');
    }

    await query('UPDATE users SET status = ? WHERE id = ?', [formattedStatus, id]);

    if (formattedStatus === 'SUSPENDED') {
      // Terminate active user sessions
      await query('DELETE FROM sessions WHERE user_id = ?', [id]);
    }

    return sendSuccess(res, { id, status: formattedStatus }, `User status updated to ${formattedStatus}.`);
  } catch (error) {
    console.error('Update User Status Error:', error);
    return sendError(res, 'Failed to update user status.', 500, 'INTERNAL_SERVER_ERROR');
  }
}

/**
 * Get System High-Level Overview Metrics
 */
export async function getSystemStats(req, res) {
  try {
    const totalUsers = await query('SELECT COUNT(*) as c FROM users WHERE deleted_at IS NULL');
    const totalStudents = await query("SELECT COUNT(*) as c FROM users WHERE role = 'STUDENT' AND deleted_at IS NULL");
    const totalParents = await query("SELECT COUNT(*) as c FROM users WHERE role = 'PARENT' AND deleted_at IS NULL");
    const totalMentors = await query("SELECT COUNT(*) as c FROM users WHERE role = 'MENTOR' AND deleted_at IS NULL");
    const activeSessions = await query('SELECT COUNT(*) as c FROM sessions WHERE expires_at > NOW()');

    const stats = {
      totalUsers: totalUsers[0]?.c || 0,
      totalStudents: totalStudents[0]?.c || 0,
      totalParents: totalParents[0]?.c || 0,
      totalMentors: totalMentors[0]?.c || 0,
      activeSessions: activeSessions[0]?.c || 0,
      systemHealth: 'OPERATIONAL',
      serverTime: new Date().toISOString(),
    };

    return sendSuccess(res, stats, 'System statistics retrieved successfully.');
  } catch (error) {
    console.error('Get System Stats Error:', error);
    return sendError(res, 'Failed to fetch system stats.', 500, 'INTERNAL_SERVER_ERROR');
  }
}

export async function getStudentsList(req, res) {
  try {
    const students = await query(
      `SELECT u.id, u.name, u.email, u.phone_number as phone, sp.grade, sp.section, sp.growth_score as growthScore, sp.school_name as school
       FROM users u
       LEFT JOIN student_profiles sp ON u.id = sp.user_id
       WHERE u.role = 'STUDENT' AND u.deleted_at IS NULL
       ORDER BY u.created_at DESC`
    );
    return sendSuccess(res, students, 'Students list retrieved.');
  } catch (error) {
    console.error('Get Students List Error:', error);
    return sendError(res, 'Failed to fetch students list.', 500, 'INTERNAL_SERVER_ERROR');
  }
}

export async function getMentorsList(req, res) {
  try {
    const mentors = await query(
      `SELECT u.id, u.name, u.email, u.phone_number as phone, mp.expertise, mp.organization, mp.rating
       FROM users u
       LEFT JOIN mentor_profiles mp ON u.id = mp.user_id
       WHERE u.role = 'MENTOR' AND u.deleted_at IS NULL
       ORDER BY u.created_at DESC`
    );
    return sendSuccess(res, mentors, 'Mentors list retrieved.');
  } catch (error) {
    console.error('Get Mentors List Error:', error);
    return sendError(res, 'Failed to fetch mentors list.', 500, 'INTERNAL_SERVER_ERROR');
  }
}

export async function getParentsList(req, res) {
  try {
    const parents = await query(
      `SELECT u.id, u.name, u.email, u.phone_number as phone
       FROM users u
       WHERE u.role = 'PARENT' AND u.deleted_at IS NULL
       ORDER BY u.created_at DESC`
    );
    return sendSuccess(res, parents, 'Parents list retrieved.');
  } catch (error) {
    console.error('Get Parents List Error:', error);
    return sendError(res, 'Failed to fetch parents list.', 500, 'INTERNAL_SERVER_ERROR');
  }
}
