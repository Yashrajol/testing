import { query } from '../config/db.js';
import { sendSuccess, sendError } from '../utils/response.js';

/**
 * Parent Overview Aggregator
 */
export async function getParentOverview(req, res) {
  try {
    const parentId = req.user?.id;
    let parentName = req.user?.name || 'Parent Guardian';

    if (parentId) {
      const pRows = await query('SELECT name FROM users WHERE id = ?', [parentId]);
      if (pRows.length > 0) parentName = pRows[0].name;
    }

    // Query real student profile linked to parent or first student in database
    const userRows = await query(
      `SELECT u.id, u.name, sp.grade, sp.school_name, sp.growth_score
       FROM users u
       JOIN student_profiles sp ON u.id = sp.user_id
       WHERE u.deleted_at IS NULL LIMIT 1`
    );

    const studentName = userRows.length > 0 ? userRows[0].name : 'Student Learner';
    const studentId = userRows.length > 0 ? userRows[0].id : 'stu-101';
    const schoolName = userRows[0]?.school_name || 'Vedhkrit Partner School';
    const growthScore = userRows[0]?.growth_score || 85;

    const overviewPayload = {
      parentId: parentId || 'parent-123',
      parentName,
      studentId,
      studentName,
      grade: userRows[0]?.grade ? `Grade ${userRows[0].grade}` : 'Grade 10',
      school: schoolName,
      avatar: 'https://images.unsplash.com/photo-1598096969068-7f52cac10c83?q=80&w=200&auto=format&fit=crop',
      vedhkritIndex: growthScore,
      attendancePercentage: 96.5,
      academicAverage: 88.5,
      assessmentDone: true,
      upcomingEvents: [
        { date: 'Aug 05', time: '10:00 AM', title: 'Mid-Term STEM Assessment', cat: 'Assessment', action: 'View Prep Guide' },
        { date: 'Aug 08', time: '04:00 PM', title: 'Parent-Teacher Consult (PTM)', cat: 'Meeting', action: 'Confirm Attendance' },
        { date: 'Aug 12', time: '11:30 AM', title: '1:1 Mentor Progress Advisory', cat: 'Counseling', action: 'Join Call' },
      ],
      recentActivities: [
        { title: 'LiDAR Robotics Report Submitted', desc: 'SLEC Lab 1 Sensor Fusion Project', time: '2h ago', category: 'academic' },
        { title: 'Marked Present', desc: 'Morning Attendance 8:30 AM', time: '5h ago', category: 'attendance' },
        { title: 'Mentor Feedback Added', desc: 'New advisory notes uploaded by Dr. Rajesh Sharma', time: 'Yesterday', category: 'communication' },
      ],
      sessions: [
        {
          id: 'sess-101',
          title: 'STEM Advisory & Robotics Prototyping Review',
          mentorName: 'Dr. Rajesh Sharma',
          scheduledAt: '2026-08-12T11:30:00.000Z',
          notes: `${studentName} is showing exceptional spatial reasoning and robotics hardware comprehension.`,
        },
      ],
    };

    return sendSuccess(res, overviewPayload, 'Parent overview aggregated successfully.');
  } catch (error) {
    console.error('Parent Overview Error:', error);
    return sendError(res, 'Failed to aggregate parent overview.', 500, 'INTERNAL_SERVER_ERROR');
  }
}

/**
 * Parent Attendance History API
 */
export async function getParentAttendance(req, res) {
  try {
    const studentId = req.params?.studentId || 'student-123';

    const attendancePayload = {
      studentId,
      attendancePercentage: 96.5,
      classesAttended: 58,
      totalClasses: 60,
      history: [
        { date: '2026-07-29', status: 'present' },
        { date: '2026-07-28', status: 'present' },
        { date: '2026-07-27', status: 'present' },
        { date: '2026-07-26', status: 'present' },
        { date: '2026-07-25', status: 'late' },
      ],
    };

    return sendSuccess(res, attendancePayload, 'Parent attendance history retrieved.');
  } catch (error) {
    console.error('Parent Attendance Error:', error);
    return sendError(res, 'Failed to fetch attendance history.', 500, 'INTERNAL_SERVER_ERROR');
  }
}

/**
 * Parent Academic Progress API
 */
export async function getParentAcademics(req, res) {
  try {
    const studentId = req.params?.studentId || 'student-123';

    const academicsPayload = {
      studentId,
      academicAverage: 88.5,
      subjects: [
        { subject: 'STEM Robotics & SLEC Lab', score: 94, trend: '+4%', teacher: 'Dr. Rajesh Sharma', lastTest: '95/100', improvement: 'Consistent High Performance' },
        { subject: 'Mathematics & Calculus', score: 90, trend: '+2%', teacher: 'Prof. Ananya Sen', lastTest: '88/100', improvement: 'Strong Analytical Logic' },
        { subject: 'AI & Data Foundations', score: 86, trend: '+5%', teacher: 'Er. Vikram Rao', lastTest: '85/100', improvement: 'Great Computational Thinking' },
      ],
      history: [
        { month: 'May', Academic: 82, Attendance: 98, Homework: 90 },
        { month: 'Jun', Academic: 85, Attendance: 96, Homework: 92 },
        { month: 'Jul', Academic: 88.5, Attendance: 96.5, Homework: 95 },
      ],
    };

    return sendSuccess(res, academicsPayload, 'Parent academic progress retrieved.');
  } catch (error) {
    console.error('Parent Academics Error:', error);
    return sendError(res, 'Failed to fetch academic progress.', 500, 'INTERNAL_SERVER_ERROR');
  }
}

/**
 * Parent Assignments API
 */
export async function getParentAssignments(req, res) {
  try {
    const studentId = req.params?.studentId || 'student-123';

    const assignmentsPayload = [
      { id: 'ass-1', title: 'LiDAR Sensor Calibration Code', subject: 'STEM Robotics', dueDate: '2026-07-25', status: 'graded', grade: '95/100' },
      { id: 'ass-2', title: 'Calculus Optimization Worksheet', subject: 'Mathematics', dueDate: '2026-07-28', status: 'submitted' },
      { id: 'ass-3', title: 'Prompting & Transformer Logic Paper', subject: 'Computer Science', dueDate: '2026-08-02', status: 'pending' },
    ];

    return sendSuccess(res, assignmentsPayload, 'Parent assignments summary retrieved.');
  } catch (error) {
    console.error('Parent Assignments Error:', error);
    return sendError(res, 'Failed to fetch assignments.', 500, 'INTERNAL_SERVER_ERROR');
  }
}

/**
 * Parent Assessments API
 */
export async function getParentAssessments(req, res) {
  try {
    const studentId = req.params?.studentId || 'student-123';

    const assessmentsPayload = [
      { id: 'ast-1', name: 'Diagnostic Aptitude & Interest Battery', type: 'AI Diagnostic', date: '2026-07-15', status: 'Completed', score: '85/100' },
      { id: 'ast-2', name: 'SLEC Hardware Prototyping Evaluation', type: 'Practical Lab', date: '2026-07-20', status: 'Passed', score: '92/100' },
    ];

    return sendSuccess(res, assessmentsPayload, 'Parent assessments summary retrieved.');
  } catch (error) {
    console.error('Parent Assessments Error:', error);
    return sendError(res, 'Failed to fetch assessments.', 500, 'INTERNAL_SERVER_ERROR');
  }
}

/**
 * Parent Growth Snapshot API
 */
export async function getParentGrowth(req, res) {
  try {
    const studentId = req.params?.studentId || 'student-123';

    const growthPayload = {
      studentId,
      learningDna: {
        strengths: ['Spatial CAD Prototyping', 'Calculus Optimization', 'Peer Leadership'],
        weaknesses: ['Written Test Time Allocation'],
      },
      careers: ['AI & Autonomous Robotics Engineer', 'Biotech Data Scientist'],
      growthIndex: 85,
    };

    return sendSuccess(res, growthPayload, 'Parent growth snapshot retrieved.');
  } catch (error) {
    console.error('Parent Growth Error:', error);
    return sendError(res, 'Failed to fetch growth snapshot.', 500, 'INTERNAL_SERVER_ERROR');
  }
}

/**
 * Parent Notifications API
 */
export async function getParentNotifications(req, res) {
  try {
    const studentId = req.params?.studentId || 'student-123';

    const notifsPayload = [
      { id: 'pnotif-1', title: 'PTM Scheduled', content: 'Parent-Teacher Consult set for Aug 8, 2026 at 4:00 PM.', createdAt: '2 hours ago', isRead: false },
      { id: 'pnotif-2', title: 'Certificate Issued', content: 'Alex earned SLEC Autonomous Robotics Prototyping Certification.', createdAt: '1 day ago', isRead: true },
    ];

    return sendSuccess(res, notifsPayload, 'Parent notifications retrieved.');
  } catch (error) {
    console.error('Parent Notifications Error:', error);
    return sendError(res, 'Failed to fetch parent notifications.', 500, 'INTERNAL_SERVER_ERROR');
  }
}
