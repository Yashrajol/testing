import { query } from '../config/db.js';
import { cryptoNativeUuid } from '../utils/helpers.js';
import { sendSuccess, sendError } from '../utils/response.js';

/**
 * List Available Mentors
 */
export async function getMentors(req, res) {
  try {
    const dbMentors = await query(
      `SELECT u.id, u.name, u.email, mp.bio, mp.expertise, mp.rating, mp.active_mentees_count
       FROM users u
       JOIN mentor_profiles mp ON u.id = mp.user_id
       WHERE u.role = 'MENTOR' AND u.status = 'ACTIVE'`
    );

    const fallbackMentors = [
      {
        id: 'mentor-1',
        name: 'Dr. Rajesh Sharma',
        email: 'rajesh.sharma@vedhkrit.edu',
        bio: 'Senior AI Research Fellow & SLEC Robotics Lead mentor.',
        expertise: 'Robotics, Machine Learning & Systems Architecture',
        rating: 4.95,
        active_mentees_count: 14,
      },
      {
        id: 'mentor-2',
        name: 'Anita Roy',
        email: 'anita.roy@vedhkrit.edu',
        bio: 'Biotech Systems Specialist and Innovation Coach.',
        expertise: 'Bioengineering, Environmental Science & Analytical Math',
        rating: 4.88,
        active_mentees_count: 10,
      },
    ];

    const mentors = dbMentors.length > 0 ? dbMentors : fallbackMentors;

    return sendSuccess(res, mentors, 'Mentors list retrieved successfully.');
  } catch (error) {
    console.error('Get Mentors Error:', error);
    return sendError(res, 'Failed to fetch mentors list.', 500, 'INTERNAL_SERVER_ERROR');
  }
}

/**
 * Get Logged-In User's Mentoring Sessions
 */
export async function getMySessions(req, res) {
  try {
    const userId = req.user.id;
    const isMentor = req.user.role === 'MENTOR';

    let sessions;
    if (isMentor) {
      sessions = await query(
        `SELECT ms.id, ms.topic, ms.scheduled_at, ms.status, ms.meeting_link, u.name as student_name, u.email as student_email
         FROM mentoring_sessions ms
         JOIN users u ON ms.student_id = u.id
         WHERE ms.mentor_id = ?
         ORDER BY ms.scheduled_at DESC`,
        [userId]
      );
    } else {
      sessions = await query(
        `SELECT ms.id, ms.topic, ms.scheduled_at, ms.status, ms.meeting_link, u.name as mentor_name, u.email as mentor_email
         FROM mentoring_sessions ms
         JOIN users u ON ms.mentor_id = u.id
         WHERE ms.student_id = ?
         ORDER BY ms.scheduled_at DESC`,
        [userId]
      );
    }

    const fallbackSessions = [
      {
        id: 'sess-1',
        topic: 'Robotics Prototyping Review & Pitch Strategy',
        mentor_name: 'Dr. Rajesh Sharma',
        scheduled_at: new Date(Date.now() + 86400000).toISOString(),
        status: 'SCHEDULED',
        meeting_link: 'https://meet.vedhkrit.edu/room/slec-robotics-01',
      },
    ];

    return sendSuccess(res, sessions.length > 0 ? sessions : fallbackSessions, 'Mentoring sessions retrieved.');
  } catch (error) {
    console.error('Get Sessions Error:', error);
    return sendError(res, 'Failed to fetch sessions.', 500, 'INTERNAL_SERVER_ERROR');
  }
}

/**
 * Book 1-on-1 Mentorship Session
 */
export async function bookSession(req, res) {
  try {
    const studentId = req.user.id;
    const { mentorId, topic, scheduledAt } = req.body;

    if (!mentorId || !topic || !scheduledAt) {
      return sendError(res, 'Mentor ID, session topic, and scheduled time are required.', 400, 'VALIDATION_ERROR');
    }

    const sessionId = cryptoNativeUuid();
    const meetingLink = `https://meet.vedhkrit.edu/room/${sessionId.substring(0, 8)}`;

    await query(
      `INSERT INTO mentoring_sessions (id, mentor_id, student_id, topic, scheduled_at, status, meeting_link) VALUES (?, ?, ?, ?, ?, 'SCHEDULED', ?)`,
      [sessionId, mentorId, studentId, topic.trim(), new Date(scheduledAt), meetingLink]
    );

    const sessionPayload = {
      id: sessionId,
      mentorId,
      studentId,
      topic: topic.trim(),
      scheduledAt,
      status: 'SCHEDULED',
      meetingLink,
    };

    return sendSuccess(res, sessionPayload, 'Mentoring session booked successfully.', 201);
  } catch (error) {
    console.error('Book Session Error:', error);
    return sendError(res, 'Failed to book session.', 500, 'INTERNAL_SERVER_ERROR');
  }
}
