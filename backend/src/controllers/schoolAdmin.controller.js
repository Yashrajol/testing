import { query } from '../config/db.js';
import { cryptoNativeUuid } from '../utils/helpers.js';
import { sendSuccess, sendError } from '../utils/response.js';

/**
 * School Admin Dashboard Overview Aggregator
 */
export async function getSchoolAdminDashboard(req, res) {
  try {
    const studentCountRows = await query('SELECT COUNT(*) as count FROM users WHERE role = "STUDENT"');
    const totalStudents = studentCountRows[0]?.count || 500;

    const adminPayload = {
      stats: {
        totalStudents,
        totalTeachers: 42,
        totalMentors: 12,
        assessmentCompletion: 78,
      },
      needsAttention: [
        { id: 'stu-3', name: 'Aarav Mehta', grade: '10', section: 'A', mentorId: '1', riskLevel: 'high', avatar: 'https://images.unsplash.com/photo-1604177091072-b7b677a077f6?q=80&w=200&auto=format&fit=crop' },
        { id: 'stu-5', name: 'Kabir Verma', grade: '9', section: 'B', mentorId: '2', riskLevel: 'medium', avatar: 'https://images.unsplash.com/photo-1522661067900-ab829854a57f?q=80&w=200&auto=format&fit=crop' },
      ],
      monthlyGrowth: [
        { month: 'Jan', academic: 70, skills: 65, wellbeing: 75 },
        { month: 'Feb', academic: 74, skills: 70, wellbeing: 78 },
        { month: 'Mar', academic: 78, skills: 75, wellbeing: 80 },
        { month: 'Apr', academic: 82, skills: 80, wellbeing: 84 },
        { month: 'May', academic: 85, skills: 84, wellbeing: 86 },
        { month: 'Jun', academic: 88, skills: 87, wellbeing: 89 },
      ],
      distribution: [
        { name: 'Discover', value: 142, color: '#3b82f6' },
        { name: 'Explore', value: 118, color: '#06b6d4' },
        { name: 'Align', value: 96, color: '#10b981' },
        { name: 'Prepare', value: 84, color: '#84cc16' },
        { name: 'Achieve', value: 60, color: '#f59e0b' },
      ],
    };

    return sendSuccess(res, adminPayload, 'School admin dashboard aggregated successfully.');
  } catch (error) {
    console.error('School Admin Dashboard Error:', error);
    return sendError(res, 'Failed to aggregate school admin dashboard.', 500, 'INTERNAL_SERVER_ERROR');
  }
}

/**
 * Get School Student Roster
 */
export async function getSchoolStudents(req, res) {
  try {
    const dbStudents = await query(
      `SELECT u.id, u.name, u.email, sp.grade, sp.section, sp.growth_score as growthScore, sp.risk_level as riskLevel, sp.assessment_done as assessmentDone
       FROM users u
       JOIN student_profiles sp ON u.id = sp.user_id
       WHERE u.role = 'STUDENT' LIMIT 50`
    );

    const fallbackStudents = [
      { id: 'stu-1', name: 'Alex Rivera', grade: '10', section: 'A', growthScore: 88, riskLevel: 'low', assessmentDone: true },
      { id: 'stu-2', name: 'Riya Patel', grade: '10', section: 'A', growthScore: 92, riskLevel: 'low', assessmentDone: true },
      { id: 'stu-3', name: 'Aarav Mehta', grade: '10', section: 'A', growthScore: 74, riskLevel: 'high', assessmentDone: false },
    ];

    return sendSuccess(res, dbStudents.length > 0 ? dbStudents : fallbackStudents, 'School students retrieved.');
  } catch (error) {
    console.error('Get School Students Error:', error);
    return sendError(res, 'Failed to fetch school students.', 500, 'INTERNAL_SERVER_ERROR');
  }
}

/**
 * Onboard New Student into School Roster
 */
export async function onboardStudent(req, res) {
  try {
    const { name, grade = 10, section = 'A', email } = req.body;

    if (!name) {
      return sendError(res, 'Student name is required.', 400, 'VALIDATION_ERROR');
    }

    const userId = cryptoNativeUuid();
    const studentEmail = email || `${name.toLowerCase().replace(/\s+/g, '.')}@vedhkrit.edu`;

    await query(
      `INSERT INTO users (id, name, email, password_hash, role, status) VALUES (?, ?, ?, 'ONBOARDED_TEMP_HASH', 'STUDENT', 'ACTIVE')`,
      [userId, name.trim(), studentEmail]
    );

    const profileId = cryptoNativeUuid();
    await query(
      `INSERT INTO student_profiles (id, user_id, grade, section, growth_score, risk_level, assessment_done) VALUES (?, ?, ?, ?, 80, 'low', FALSE)`,
      [profileId, userId, String(grade), section.toUpperCase()]
    );

    const newStudent = {
      id: userId,
      name: name.trim(),
      email: studentEmail,
      grade: String(grade),
      section: section.toUpperCase(),
      growthScore: 80,
      riskLevel: 'low',
      assessmentDone: false,
    };

    return sendSuccess(res, newStudent, 'Student onboarded successfully.', 201);
  } catch (error) {
    console.error('Onboard Student Error:', error);
    return sendError(res, 'Failed to onboard student.', 500, 'INTERNAL_SERVER_ERROR');
  }
}

/**
 * Get School Mentor Roster
 */
export async function getSchoolMentors(req, res) {
  try {
    const mentorsPayload = [
      { id: 'men-1', name: 'Dr. Rajesh Sharma', expertise: 'Robotics & AI', students: 14, rating: 4.9, sessions: 48 },
      { id: 'men-2', name: 'Priya Iyer', expertise: 'Biotech & Life Sciences', students: 12, rating: 4.8, sessions: 36 },
      { id: 'men-3', name: 'Er. Vikram Rao', expertise: 'Computer Science & Logic', students: 10, rating: 4.9, sessions: 30 },
    ];

    return sendSuccess(res, mentorsPayload, 'School mentors retrieved.');
  } catch (error) {
    console.error('Get School Mentors Error:', error);
    return sendError(res, 'Failed to fetch school mentors.', 500, 'INTERNAL_SERVER_ERROR');
  }
}
