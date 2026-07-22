export const ASSESSMENT_REPOSITORY_TOKEN = Symbol('IAssessmentRepository');

export enum QuestionType {
  MCQ = 'MCQ',
  TRUE_FALSE = 'TRUE_FALSE',
  SHORT_ANSWER = 'SHORT_ANSWER',
  LONG_ANSWER = 'LONG_ANSWER',
  CODING = 'CODING',
  FILE_UPLOAD = 'FILE_UPLOAD',
  MATCHING = 'MATCHING',
  FILL_IN_BLANKS = 'FILL_IN_BLANKS',
}

export enum AssessmentType {
  QUIZ = 'QUIZ',
  PRACTICE_TEST = 'PRACTICE_TEST',
  EXAM = 'EXAM',
  ASSIGNMENT = 'ASSIGNMENT',
}

export enum AttemptStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  SUBMITTED = 'SUBMITTED',
  EVALUATED = 'EVALUATED',
  EXPIRED = 'EXPIRED',
}

export enum EvaluatorType {
  AUTO = 'AUTO',
  MANUAL = 'MANUAL',
}
