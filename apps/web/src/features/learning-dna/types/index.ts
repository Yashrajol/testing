export interface LearningDnaProfile {
  studentId: string;
  learnStyle: string;
  learnStyleDesc: string;
  confidence: number;
  confidenceChange: number;
  studyGrowth: number;
}

export interface KnowledgeNode {
  id: string;
  label: string;
  level: number;
  subject?: string;
  score?: number;
}

export interface CompetencyProfile {
  studentId: string;
  academic: number;
  communication: number;
  leadership: number;
  criticalThinking: number;
  creativity: number;
  consistency: number;
  overallScore: number;
}
