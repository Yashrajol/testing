import { query } from '../config/db.js';
import { cryptoNativeUuid } from '../utils/helpers.js';
import { sendSuccess, sendError } from '../utils/response.js';

/**
 * Get List of Available Diagnostic Assessments
 */
export async function getAssessments(req, res) {
  try {
    const dbAssessments = await query('SELECT * FROM assessments ORDER BY created_at DESC');

    const assessmentsList = dbAssessments.length > 0 ? dbAssessments : [
      {
        id: 'asm-1',
        title: 'Cognitive & Learning Style Diagnostic',
        category: 'Foundational',
        description: 'Analyzes visual, auditory, and kinesthetic learning tendencies.',
        duration_minutes: 20,
        total_questions: 15,
      },
      {
        id: 'asm-2',
        title: 'SLEC STEM Aptitude Index',
        category: 'Technical Focus',
        description: 'Measures logical reasoning, mathematical pattern recognition, and problem solving.',
        duration_minutes: 30,
        total_questions: 20,
      },
      {
        id: 'asm-3',
        title: 'Leadership & Emotional Quotient (EQ)',
        category: 'Soft Skills',
        description: 'Evaluates peer interaction skills, emotional resilience, and team dynamics.',
        duration_minutes: 25,
        total_questions: 12,
      },
    ];

    return sendSuccess(res, assessmentsList, 'Assessments fetched successfully.');
  } catch (error) {
    console.error('Get Assessments Error:', error);
    return sendError(res, 'Failed to fetch assessments.', 500, 'INTERNAL_SERVER_ERROR');
  }
}

/**
 * Get Specific Assessment Details by ID
 */
export async function getAssessmentById(req, res) {
  try {
    const { id } = req.params;

    const mockAssessment = {
      id,
      title: 'Cognitive & Learning Style Diagnostic',
      category: 'Foundational',
      description: 'Analyzes visual, auditory, and kinesthetic learning tendencies.',
      duration_minutes: 20,
      total_questions: 3,
      questions: [
        {
          id: 'q1',
          text: 'When preparing for a complex concept exam, which method helps you retain information best?',
          options: [
            { id: 'opt1', text: 'Drawing mind maps and visual flowcharts' },
            { id: 'opt2', text: 'Listening to recorded lectures and explanations' },
            { id: 'opt3', text: 'Building physical prototypes or hands-on practice' },
          ],
        },
        {
          id: 'q2',
          text: 'How do you approach solving an unfamiliar logic problem?',
          options: [
            { id: 'opt1', text: 'Break it down systematically into step-by-step components' },
            { id: 'opt2', text: 'Discuss it out loud with a peer or mentor' },
            { id: 'opt3', text: 'Experiment with multiple visual trial-and-error sketches' },
          ],
        },
      ],
    };

    return sendSuccess(res, mockAssessment, 'Assessment details retrieved.');
  } catch (error) {
    console.error('Get Assessment Detail Error:', error);
    return sendError(res, 'Failed to fetch assessment details.', 500, 'INTERNAL_SERVER_ERROR');
  }
}

/**
 * Submit Answer / Assessment Attempt
 */
export async function submitAssessmentAnswer(req, res) {
  try {
    const { attemptId } = req.params;
    const { questionId, selectedOptionId, textAnswer } = req.body;

    return sendSuccess(
      res,
      {
        attemptId,
        questionId,
        selectedOptionId,
        textAnswer,
        status: 'SAVED',
        scoreUpdated: 10,
      },
      'Answer recorded successfully.'
    );
  } catch (error) {
    console.error('Submit Answer Error:', error);
    return sendError(res, 'Failed to record answer.', 500, 'INTERNAL_SERVER_ERROR');
  }
}
