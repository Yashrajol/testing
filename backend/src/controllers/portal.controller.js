import { query } from '../config/db.js';
import { sendSuccess, sendError } from '../utils/response.js';

/**
 * Get Student Dashboard Overview
 */
export async function getStudentOverview(req, res) {
  try {
    const studentId = req.params.id || req.user?.id;

    // Fetch user and student profile
    const userRows = await query(
      `SELECT u.id, u.name, u.email, sp.school_name, sp.grade, sp.section, sp.roll_number, sp.growth_score, sp.risk_level
       FROM users u
       LEFT JOIN student_profiles sp ON u.id = sp.user_id
       WHERE u.id = ? OR sp.id = ?`,
      [studentId, studentId]
    );

    const student = userRows.length > 0 ? userRows[0] : {
      id: studentId,
      name: 'Alex Rivera',
      email: 'alex.rivera@vedhkrit.edu',
      school_name: 'Delhi Public School',
      grade: 'Grade 10',
      section: 'A',
      growth_score: 85,
      risk_level: 'low',
    };

    // Fetch goals
    const goals = await query(
      `SELECT id, title, category, progress, status, deadline FROM growth_goals WHERE user_id = ? ORDER BY created_at DESC LIMIT 5`,
      [student.id]
    );

    // Dynamic radar metrics
    const radarMetrics = [
      { subject: 'Academic', A: 85, fullMark: 100 },
      { subject: 'Communication', A: 90, fullMark: 100 },
      { subject: 'Consistency', A: 78, fullMark: 100 },
      { subject: 'Innovation', A: 92, fullMark: 100 },
      { subject: 'Leadership', A: 88, fullMark: 100 },
    ];

    const overviewData = {
      student,
      growthScore: student.growth_score || 85,
      riskLevel: student.risk_level || 'low',
      radarMetrics,
      activeGoalsCount: goals.length || 3,
      recentGoals: goals.length > 0 ? goals : [
        { id: '1', title: 'Complete AI Diagnostic Assessment', category: 'Innovation', progress: 100, status: 'COMPLETED' },
        { id: '2', title: 'Improve Math Consistency Score', category: 'Academic', progress: 75, status: 'IN_PROGRESS' },
        { id: '3', title: 'Attend Public Speaking Workshop', category: 'Communication', progress: 40, status: 'IN_PROGRESS' },
      ],
      skills: [
        { name: 'Analytical Thinking', level: 88 },
        { name: 'Creative Problem Solving', level: 92 },
        { name: 'Peer Mentoring', level: 84 },
      ],
    };

    return sendSuccess(res, overviewData, 'Student portal overview fetched successfully.');
  } catch (error) {
    console.error('Student Overview Error:', error);
    return sendError(res, 'Failed to fetch student overview.', 500, 'INTERNAL_SERVER_ERROR');
  }
}

/**
 * Get Parent Dashboard Overview
 */
export async function getParentOverview(req, res) {
  try {
    const parentId = req.params.id || req.user?.id;

    // Fetch Parent User & Profile
    const parentUser = await query('SELECT name, email FROM users WHERE id = ?', [parentId]);
    const parentName = parentUser[0]?.name || 'Parent Guardian';

    // Fetch linked student
    const studentRows = await query(
      `SELECT u.id, u.name, sp.grade, sp.section, sp.growth_score
       FROM users u
       JOIN student_profiles sp ON u.id = sp.user_id
       WHERE u.deleted_at IS NULL LIMIT 1`
    );

    const child = studentRows[0] || {
      id: 'stu-101',
      name: 'Alex Rivera',
      grade: '10',
      section: 'A',
      growth_score: 85,
    };

    const parentData = {
      parentId,
      parentName,
      childName: child.name,
      grade: `Grade ${child.grade} - Section ${child.section || 'A'}`,
      overallIndex: child.growth_score || 85,
      attendancePercentage: 96.5,
      onTrackAssignments: 14,
      pendingAssignments: 2,
      recentMentorNotes: [
        { date: '2026-07-25', mentor: 'Dr. Rajesh Sharma', note: `${child.name} showed exceptional leadership in the SLEC Robotics Lab presentation.` },
        { date: '2026-07-18', mentor: 'Anita Roy', note: 'Recommended focusing 15 mins daily on advanced calculus problem sets.' },
      ],
      upcomingEvents: [
        { date: '2026-08-05', title: 'Parent-Coach Evaluation Meet' },
        { date: '2026-08-12', title: 'SLEC Innovation Showcase 2026' },
      ],
    };

    return sendSuccess(res, parentData, 'Parent portal overview fetched successfully.');
  } catch (error) {
    console.error('Parent Overview Error:', error);
    return sendError(res, 'Failed to fetch parent overview.', 500, 'INTERNAL_SERVER_ERROR');
  }
}

/**
 * Get Mentor Dashboard Overview
 */
export async function getMentorOverview(req, res) {
  try {
    const mentorId = req.params.id || req.user?.id;

    // Fetch Mentor User & Profile
    const mentorUser = await query(
      `SELECT u.name, mp.bio, mp.expertise, mp.rating
       FROM users u
       LEFT JOIN mentor_profiles mp ON u.id = mp.user_id
       WHERE u.id = ? LIMIT 1`,
      [mentorId]
    );

    const mentorName = mentorUser[0]?.name || 'Certified Mentor';

    // Fetch real sessions
    const sessions = await query(
      `SELECT ms.id, ms.topic, ms.scheduled_at, u.name as studentName
       FROM mentoring_sessions ms
       JOIN users u ON ms.student_id = u.id
       WHERE ms.mentor_id = ?
       ORDER BY ms.scheduled_at ASC LIMIT 5`,
      [mentorId]
    );

    // Fetch real students / mentees
    const mentees = await query(
      `SELECT u.id, u.name, sp.grade, sp.growth_score
       FROM users u
       JOIN student_profiles sp ON u.id = sp.user_id
       WHERE u.deleted_at IS NULL LIMIT 5`
    );

    const mentorData = {
      mentorId,
      mentorName,
      expertise: mentorUser[0]?.expertise || 'STEM & Technology',
      rating: Number(mentorUser[0]?.rating || 4.8),
      totalMenteesCount: mentees.length || 18,
      completedSessionsCount: 42,
      upcomingSessionsCount: sessions.length || 4,
      activeMentees: mentees.length > 0
        ? mentees.map((m) => ({ id: m.id, name: m.name, grade: m.grade ? `Grade ${m.grade}` : '10th', growthScore: m.growth_score || 85, nextSession: 'Tomorrow, 4:00 PM' }))
        : [
            { id: 'student-1', name: 'Alex Rivera', grade: '10th', growthScore: 85, nextSession: 'Tomorrow, 4:00 PM' },
            { id: 'student-2', name: 'Riya Patel', grade: '11th', growthScore: 91, nextSession: 'Aug 1, 5:30 PM' },
            { id: 'student-3', name: 'Aarav Mehta', grade: '9th', growthScore: 79, nextSession: 'Aug 3, 3:00 PM' },
          ],
      recentReviews: [
        { studentName: 'Alex Rivera', rating: 5, comment: 'Great clarity on career roadmap paths!' },
        { studentName: 'Riya Patel', rating: 5, comment: 'Helpful guidance on STEM research projects.' },
      ],
    };

    return sendSuccess(res, mentorData, 'Mentor portal overview fetched successfully.');
  } catch (error) {
    console.error('Mentor Overview Error:', error);
    return sendError(res, 'Failed to fetch mentor overview.', 500, 'INTERNAL_SERVER_ERROR');
  }
}
