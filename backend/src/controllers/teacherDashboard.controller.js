import { query } from '../config/db.js';
import { sendSuccess, sendError } from '../utils/response.js';

/**
 * Teacher Dashboard Overview Aggregator
 */
export async function getTeacherOverview(req, res) {
  try {
    const teacherId = req.user?.id || 'teacher-101';
    const teacherName = req.user?.name || 'Prof. Ananya Sen';

    const teacherPayload = {
      teacherId,
      teacherName,
      specialization: 'Mathematics & Advanced STEM Robotics',
      assignedCohorts: [
        { id: 'coh-1', name: 'Grade 10 - Section A', studentCount: 32, attendanceLoggedToday: true, averageScore: 88.5 },
        { id: 'coh-2', name: 'Grade 11 - STEM Alpha', studentCount: 28, attendanceLoggedToday: false, averageScore: 84.2 },
      ],
      todaySchedule: [
        { time: '09:00 AM - 10:00 AM', cohort: 'Grade 10-A', subject: 'Calculus Optimization', room: 'SLEC Lab 1' },
        { time: '11:30 AM - 12:30 PM', cohort: 'Grade 11-Alpha', subject: 'LiDAR Sensor Calibration', room: 'Robotics Studio B' },
      ],
      pendingAssessmentReviews: 5,
      atRiskStudents: [
        { id: 'stu-3', name: 'Aarav Mehta', cohort: 'Grade 10-A', issue: 'Missing CAD Assignment & 2 Absences', riskLevel: 'HIGH' },
      ],
      classAverageGrowth: 86.4,
      recentSubmissions: [
        { id: 'sub-1', studentName: 'Alex Rivera', title: 'LiDAR Navigation Rover Report', submittedAt: '2h ago', status: 'PENDING_REVIEW' },
        { id: 'sub-2', studentName: 'Riya Patel', title: 'Calculus Flight Path Worksheet', submittedAt: '4h ago', status: 'GRADED', score: '95/100' },
      ],
    };

    return sendSuccess(res, teacherPayload, 'Teacher dashboard overview aggregated successfully.');
  } catch (error) {
    console.error('Teacher Overview Error:', error);
    return sendError(res, 'Failed to aggregate teacher overview.', 500, 'INTERNAL_SERVER_ERROR');
  }
}

/**
 * Get Class Cohort Roster for Teacher
 */
export async function getCohortRoster(req, res) {
  try {
    const { id: cohortId } = req.params;

    const rosterPayload = [
      { id: 'stu-1', rollNumber: '1001', name: 'Alex Rivera', growthScore: 88, attendanceRate: '96.5%', status: 'ACTIVE' },
      { id: 'stu-2', rollNumber: '1002', name: 'Riya Patel', growthScore: 92, attendanceRate: '98.0%', status: 'ACTIVE' },
      { id: 'stu-3', rollNumber: '1003', name: 'Aarav Mehta', growthScore: 74, attendanceRate: '88.0%', status: 'AT_RISK' },
    ];

    return sendSuccess(res, rosterPayload, 'Cohort student roster retrieved.');
  } catch (error) {
    console.error('Get Cohort Roster Error:', error);
    return sendError(res, 'Failed to fetch cohort roster.', 500, 'INTERNAL_SERVER_ERROR');
  }
}

/**
 * Record Class Attendance
 */
export async function recordClassAttendance(req, res) {
  try {
    const { id: cohortId } = req.params;
    const { attendanceList, date = new Date().toISOString().split('T')[0] } = req.body;

    if (!Array.isArray(attendanceList)) {
      return sendError(res, 'Attendance list array is required.', 400, 'VALIDATION_ERROR');
    }

    return sendSuccess(res, { cohortId, date, recordedCount: attendanceList.length }, 'Class attendance recorded successfully.');
  } catch (error) {
    console.error('Record Class Attendance Error:', error);
    return sendError(res, 'Failed to record attendance.', 500, 'INTERNAL_SERVER_ERROR');
  }
}

/**
 * Get Pending Assignment Submissions
 */
export async function getPendingSubmissions(req, res) {
  try {
    const submissions = [
      { id: 'sub-1', studentId: 'stu-1', studentName: 'Alex Rivera', title: 'LiDAR Navigation Rover Report', subject: 'Robotics', submittedAt: new Date().toISOString() },
      { id: 'sub-3', studentId: 'stu-4', studentName: 'Priya Sharma', title: 'Calculus Minimization Proof', subject: 'Mathematics', submittedAt: new Date().toISOString() },
    ];

    return sendSuccess(res, submissions, 'Pending submissions retrieved.');
  } catch (error) {
    console.error('Get Pending Submissions Error:', error);
    return sendError(res, 'Failed to fetch pending submissions.', 500, 'INTERNAL_SERVER_ERROR');
  }
}

/**
 * Grade Student Submission
 */
export async function gradeSubmission(req, res) {
  try {
    const { submissionId, score, feedback } = req.body;

    if (!submissionId || score === undefined) {
      return sendError(res, 'Submission ID and score are required.', 400, 'VALIDATION_ERROR');
    }

    const gradedResult = {
      submissionId,
      score,
      feedback: feedback || 'Great work on sensor calibration methodology.',
      gradedAt: new Date().toISOString(),
      status: 'GRADED',
    };

    return sendSuccess(res, gradedResult, 'Submission graded successfully.');
  } catch (error) {
    console.error('Grade Submission Error:', error);
    return sendError(res, 'Failed to grade submission.', 500, 'INTERNAL_SERVER_ERROR');
  }
}
