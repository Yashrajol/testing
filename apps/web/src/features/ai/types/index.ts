export interface StudySession {
  topic: string;
  duration: number;
}

export interface StudyPlan {
  planId: string;
  studentId: string;
  title: string;
  sessions: StudySession[];
  createdAt: string;
}

export interface CareerAdvice {
  career: string;
  matchScore: number;
  roadmap: string[];
  recommendations: string[];
}

export interface Insight {
  area: string;
  score: number;
  trend: "improving" | "stable" | "declining";
}

export interface Recommendation {
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
}

export interface AIMessage {
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
}

export interface Conversation {
  id: string;
  messages: AIMessage[];
  updatedAt: string;
}
