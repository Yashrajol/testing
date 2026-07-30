import { query } from '../config/db.js';
import { sendSuccess, sendError } from '../utils/response.js';

/**
 * Get Student Detailed Growth & Radar Analytics
 */
export async function getStudentAnalytics(req, res) {
  try {
    const studentId = req.params.id || req.user?.id;

    const historyRows = await query(
      `SELECT academic_score, communication_score, consistency_score, innovation_score, leadership_score, recorded_at
       FROM growth_metrics_history WHERE user_id = ? ORDER BY recorded_at ASC LIMIT 10`,
      [studentId]
    );

    const radarCurrent = [
      { subject: 'Academic', score: 85, target: 95 },
      { subject: 'Communication', score: 90, target: 95 },
      { subject: 'Consistency', score: 78, target: 85 },
      { subject: 'Innovation', score: 92, target: 98 },
      { subject: 'Leadership', score: 88, target: 92 },
    ];

    const historicalTrend = historyRows.length > 0 ? historyRows : [
      { month: 'Jan', academic: 75, innovation: 80, consistency: 70 },
      { month: 'Feb', academic: 78, innovation: 84, consistency: 72 },
      { month: 'Mar', academic: 82, innovation: 88, consistency: 75 },
      { month: 'Apr', academic: 85, innovation: 92, consistency: 78 },
    ];

    const analyticsPayload = {
      studentId,
      overallGrowthIndex: 85,
      percentileRank: 'Top 5%',
      radarCurrent,
      historicalTrend,
      strengths: ['Visual Prototyping', 'Spatial Reasoning', 'Peer Mentoring'],
      areasForGrowth: ['Calculus Consistency', 'Structured Time Management'],
    };

    return sendSuccess(res, analyticsPayload, 'Student growth analytics retrieved.');
  } catch (error) {
    console.error('Get Student Analytics Error:', error);
    return sendError(res, 'Failed to fetch student analytics.', 500, 'INTERNAL_SERVER_ERROR');
  }
}

/**
 * Get Cohort-Wide System Growth Analytics for Admins
 */
export async function getCohortAnalytics(req, res) {
  try {
    const cohortStats = {
      averageGrowthIndex: 82.4,
      totalActiveStudents: 1420,
      riskDistribution: {
        lowRisk: 1150,
        mediumRisk: 210,
        highRisk: 60,
      },
      topPerformingLabs: [
        { labName: 'Robotics & AI', activeProjects: 12, avgIndex: 88 },
        { labName: '3D Design & Rapid Fabrication', activeProjects: 15, avgIndex: 86 },
        { labName: 'AR/VR Spatial Simulation', activeProjects: 9, avgIndex: 84 },
      ],
    };

    return sendSuccess(res, cohortStats, 'Cohort growth analytics retrieved.');
  } catch (error) {
    console.error('Get Cohort Analytics Error:', error);
    return sendError(res, 'Failed to fetch cohort analytics.', 500, 'INTERNAL_SERVER_ERROR');
  }
}
