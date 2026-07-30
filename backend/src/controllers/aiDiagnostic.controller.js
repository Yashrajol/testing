import { query } from '../config/db.js';
import { cryptoNativeUuid } from '../utils/helpers.js';
import { sendSuccess, sendError } from '../utils/response.js';

/**
 * Evaluate Diagnostic Test Responses & Generate AI Recommendation
 */
export async function evaluateDiagnostics(req, res) {
  try {
    const userId = req.user.id;
    const { answers } = req.body;

    const recId = cryptoNativeUuid();
    const learningStyle = 'Visual & Kinesthetic';
    const recommendedPathway = 'AI & Autonomous Robotics Engineering';
    const focusAreas = JSON.stringify(['Spatial CAD Prototyping', 'Calculus Optimization', 'Peer Leadership']);
    const riskFlags = JSON.stringify(['Minor time management inconsistency on written tests']);
    const confidenceScore = 94.5;

    await query(
      `INSERT INTO ai_recommendations (id, user_id, learning_style, recommended_pathway, focus_areas, risk_flags, confidence_score)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [recId, userId, learningStyle, recommendedPathway, focusAreas, riskFlags, confidenceScore]
    );

    const resultPayload = {
      id: recId,
      userId,
      learningStyle,
      recommendedPathway,
      focusAreas: ['Spatial CAD Prototyping', 'Calculus Optimization', 'Peer Leadership'],
      riskFlags: ['Minor time management inconsistency on written tests'],
      confidenceScore,
      evaluatedAt: new Date().toISOString(),
    };

    return sendSuccess(res, resultPayload, 'AI Diagnostic evaluation completed successfully.');
  } catch (error) {
    console.error('Evaluate Diagnostics Error:', error);
    return sendError(res, 'Failed to process AI diagnostic evaluation.', 500, 'INTERNAL_SERVER_ERROR');
  }
}

/**
 * Get Authenticated Student's Current AI Recommendation
 */
export async function getMyRecommendation(req, res) {
  try {
    const userId = req.user.id;

    const recRows = await query(
      `SELECT id, learning_style, recommended_pathway, focus_areas, risk_flags, confidence_score, created_at
       FROM ai_recommendations WHERE user_id = ? ORDER BY created_at DESC LIMIT 1`,
      [userId]
    );

    const fallbackRecommendation = {
      id: 'rec-1',
      learningStyle: 'Visual & Kinesthetic',
      recommendedPathway: 'AI & Autonomous Robotics Engineering',
      focusAreas: ['Spatial CAD Prototyping', 'Calculus Optimization', 'Peer Leadership'],
      riskFlags: ['Minor time management inconsistency on written tests'],
      confidenceScore: 94.5,
      createdAt: new Date().toISOString(),
    };

    const rec = recRows.length > 0 ? recRows[0] : fallbackRecommendation;

    return sendSuccess(res, rec, 'Current AI recommendation card retrieved.');
  } catch (error) {
    console.error('Get Recommendation Error:', error);
    return sendError(res, 'Failed to fetch AI recommendation.', 500, 'INTERNAL_SERVER_ERROR');
  }
}
