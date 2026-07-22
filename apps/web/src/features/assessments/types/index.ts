export interface Option {
  id: string | number;
  text: string;
}

export interface Question {
  id: string;
  q: string;
  options: string[];
  answerIdx?: number;
}

export interface Assessment {
  id: string;
  subject: string;
  chapter: string;
  duration: string;
  questions: number;
  marks: number;
  difficulty: "Easy" | "Medium" | "Hard";
  status?: "upcoming" | "practice" | "completed";
  questionsList?: Question[];
}

export interface Attempt {
  id: string;
  assessmentId: string;
  studentId: string;
  startedAt: string;
  expiresAt: string;
  answers?: Record<string, number>;
}

export interface Answer {
  questionId: string;
  answerIdx: number;
}

export interface ScoreBreakdown {
  subject: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
}

export interface LeaderboardPosition {
  rank: string;
  percentile: number;
}

export interface AssessmentResult {
  attemptId: string;
  assessmentId: string;
  score: number;
  rank: string;
  percentile: number;
  timeTaken: string;
  wrongAnswers: number;
  correctAnswers: number;
  date: string;
  subject?: string;
  chapter?: string;
}

export interface AssessmentSummary {
  upcomingCount: number;
  completedCount: number;
  averageScore: number;
  bestSubject: string;
  weakTopics?: Array<{ name: string; count: number }>;
  recommendedPractice?: Array<{ id: string; title: string; desc: string }>;
  subjectScores?: Array<{ name: string; score: number; color: string }>;
  performanceHistory?: number[];
}
