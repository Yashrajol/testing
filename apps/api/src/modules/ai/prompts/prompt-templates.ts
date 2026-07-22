import { PromptType } from '../constants/ai.constants';

export class PromptTemplates {
  static getTemplate(type: PromptType, variables: Record<string, any>): string {
    switch (type) {
      case PromptType.STUDY_PLAN:
        return `Generate a personalized study plan for Student ${variables.studentId}.
Focus subject: ${variables.focusSubject || 'ALL'}.
Consider learning speed, retention, weak topics, and active assignments.`;

      case PromptType.LEARNING_INSIGHTS:
        return `Analyze historical progress and DNA for Student ${variables.studentId}.
Identify focus index, topic retention levels, and recommended revision schedules.`;

      case PromptType.CAREER_ADVICE:
        return `Provide career guidance for Student ${variables.studentId}.
Identify best-fit industry, roles, current skill gaps, and custom advice text.`;

      case PromptType.RISK_ANALYSIS:
        return `Assess academic risk levels (LOW, MEDIUM, HIGH) for Student ${variables.studentId}.
Provide summary of risk factors and immediate recommended interventions.`;

      case PromptType.TEACHER_ASSISTANT:
        return `You are a teacher assistant. Help with the following task: "${variables.promptInstruction}".`;

      case PromptType.PARENT_SUMMARY:
        return `Generate a parent-friendly progress summary for child ${variables.studentId}.
Detail attendance, assignments completion, overall mastery, and action items.`;

      default:
        return `Analyze input data context for student ${variables.studentId}.`;
    }
  }
}
