export interface GrowthIndex {
  studentId: string;
  indexValue: number;
  percentileDesc: string;
  history: number[];
}

export interface CareerMatch {
  id: string;
  name: string;
  subjects: string;
  skills: string[];
  activities: string[];
  videos: Array<{ title: string; speaker: string; length: string }>;
  progress: number;
}

export interface GrowthInsights {
  strengths: string[];
  improvements: string[];
  recommendations: string;
  advisorName: string;
}

export interface Goal {
  id: string;
  title: string;
  desc: string;
  status: "completed" | "active" | "locked";
}

export interface CreateGoalRequest {
  studentId: string;
  title: string;
  desc: string;
}
