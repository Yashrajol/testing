import { query } from '../config/db.js';
import { cryptoNativeUuid } from '../utils/helpers.js';
import { sendSuccess, sendError } from '../utils/response.js';

/**
 * Get Growth Goals for Current User or Student
 */
export async function getGoals(req, res) {
  try {
    const userId = req.params.studentId || req.user.id;

    const goals = await query(
      `SELECT id, title, description, category, progress, status, deadline, created_at FROM growth_goals WHERE user_id = ? ORDER BY created_at DESC`,
      [userId]
    );

    // Fallback default goals if DB is empty for initial user
    const responseGoals = goals.length > 0 ? goals : [
      { id: 'g1', title: 'Complete AI Diagnostic Assessment', description: 'Evaluate learning styles and cognitive focus.', category: 'Innovation', progress: 100, status: 'COMPLETED', created_at: new Date() },
      { id: 'g2', title: 'Improve Math Consistency Score', description: 'Daily practice of 10 calculus problems.', category: 'Academic', progress: 75, status: 'IN_PROGRESS', created_at: new Date() },
      { id: 'g3', title: 'Attend Public Speaking Workshop', description: 'Build confidence for project pitch presentations.', category: 'Communication', progress: 40, status: 'IN_PROGRESS', created_at: new Date() },
    ];

    return sendSuccess(res, responseGoals, 'Growth goals retrieved successfully.');
  } catch (error) {
    console.error('Get Goals Error:', error);
    return sendError(res, 'Failed to fetch growth goals.', 500, 'INTERNAL_SERVER_ERROR');
  }
}

/**
 * Create New Goal
 */
export async function createGoal(req, res) {
  try {
    const { title, description, category = 'Academic', deadline } = req.body;

    if (!title) {
      return sendError(res, 'Goal title is required.', 400, 'VALIDATION_ERROR');
    }

    const goalId = cryptoNativeUuid();
    const userId = req.user.id;

    await query(
      `INSERT INTO growth_goals (id, user_id, title, description, category, progress, status, deadline) VALUES (?, ?, ?, ?, ?, 0, 'IN_PROGRESS', ?)`,
      [goalId, userId, title.trim(), description ? description.trim() : null, category, deadline ? new Date(deadline) : null]
    );

    const newGoal = {
      id: goalId,
      user_id: userId,
      title: title.trim(),
      description,
      category,
      progress: 0,
      status: 'IN_PROGRESS',
      deadline,
    };

    return sendSuccess(res, newGoal, 'Growth goal created successfully.', 201);
  } catch (error) {
    console.error('Create Goal Error:', error);
    return sendError(res, 'Failed to create growth goal.', 500, 'INTERNAL_SERVER_ERROR');
  }
}

/**
 * Update Goal Progress or Details
 */
export async function updateGoal(req, res) {
  try {
    const { id } = req.params;
    const { title, description, category, progress, status } = req.body;

    // Check goal exists
    const goalRows = await query('SELECT * FROM growth_goals WHERE id = ?', [id]);
    if (goalRows.length === 0) {
      return sendError(res, 'Goal not found.', 404, 'NOT_FOUND');
    }

    const existing = goalRows[0];

    const updatedTitle = title !== undefined ? title : existing.title;
    const updatedDesc = description !== undefined ? description : existing.description;
    const updatedCategory = category !== undefined ? category : existing.category;
    const updatedProgress = progress !== undefined ? Math.min(100, Math.max(0, parseInt(progress, 10))) : existing.progress;
    
    let updatedStatus = status !== undefined ? status : existing.status;
    if (updatedProgress === 100) updatedStatus = 'COMPLETED';

    await query(
      `UPDATE growth_goals SET title = ?, description = ?, category = ?, progress = ?, status = ? WHERE id = ?`,
      [updatedTitle, updatedDesc, updatedCategory, updatedProgress, updatedStatus, id]
    );

    return sendSuccess(res, { id, title: updatedTitle, progress: updatedProgress, status: updatedStatus }, 'Goal updated successfully.');
  } catch (error) {
    console.error('Update Goal Error:', error);
    return sendError(res, 'Failed to update goal.', 500, 'INTERNAL_SERVER_ERROR');
  }
}

/**
 * Delete Goal
 */
export async function deleteGoal(req, res) {
  try {
    const { id } = req.params;

    await query('DELETE FROM growth_goals WHERE id = ?', [id]);

    return sendSuccess(res, { id }, 'Goal deleted successfully.');
  } catch (error) {
    console.error('Delete Goal Error:', error);
    return sendError(res, 'Failed to delete goal.', 500, 'INTERNAL_SERVER_ERROR');
  }
}
