import { AssessmentFilterOptions } from '../types/assessment.types';

export interface IAssessmentRepository {
  createAssessment(data: any): Promise<any>;
  findAssessmentById(id: string): Promise<any | null>;
  findAssessments(options: AssessmentFilterOptions): Promise<{ items: any[]; total: number }>;
  
  createQuestionBank(data: any): Promise<any>;
  createQuestion(data: any): Promise<any>;
  findQuestionById(id: string): Promise<any | null>;

  startAttempt(data: any): Promise<any>;
  findAttemptById(id: string): Promise<any | null>;
  updateAttempt(id: string, data: any): Promise<any>;
  findAttemptsByStudent(studentId: string): Promise<any[]>;

  saveAnswer(data: any): Promise<any>;
  findAnswersByAttempt(attemptId: string): Promise<any[]>;

  createRubric(data: any): Promise<any>;
  saveGrading(data: any): Promise<any>;
  saveCompetencyScore(data: any): Promise<any>;
}
