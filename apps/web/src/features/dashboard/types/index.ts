export interface StudentProfile {
  studentId: string;
  studentName: string;
  schoolName?: string;
  className?: string;
  sectionName?: string;
  batchName?: string;
  rollNumber?: string | number;
  academicYear?: string;
}

export interface AttendanceSummary {
  attendancePercentage: number;
  totalDays?: number;
  presentDays?: number;
  absentDays?: number;
}

export interface TodaysLesson {
  id: string;
  time: string;
  title: string;
  subject?: string;
  description?: string;
  live?: boolean;
  deadline?: boolean;
  joinUrl?: string;
}

export interface UpcomingAssessment {
  id: string;
  title: string;
  subject: string;
  date: string;
  time: string;
  duration?: string;
}

export interface AssignmentStatus {
  homeworkCompletion: number;
  overallPercentage: number;
  testAverage: number;
  confidenceIndex: number;
  checklist: Array<{ id: string | number; text: string; done: boolean }>;
  revisionGoals: Array<{ id: string | number; text: string; done: boolean }>;
}

export interface LearningDNA {
  learningStyle: string;
  brainDominance?: string;
  cognitiveStrengths?: string[];
  dimensions: {
    academic: number;
    communication: number;
    consistency: number;
    innovation: number;
    leadership: number;
  };
}

export interface VedhkritIndex {
  value: number;
  status: string;
  history?: number[];
}

export interface CareerMatch {
  id: string;
  title: string;
  matchPercentage: number;
  demand?: string;
  description?: string;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  type?: string;
  actionLabel?: string;
}

export interface Notification {
  id: string;
  title: string;
  content: string;
  time: string;
  type?: string;
}

export interface StudentDashboardResponse {
  studentId: string;
  studentName: string;
  attendancePercentage: number;
  enrolledCoursesCount: number;
  profile?: StudentProfile;
  attendanceSummary?: AttendanceSummary;
  todaysLessons: TodaysLesson[];
  upcomingAssessments: UpcomingAssessment[];
  assignmentStatus: AssignmentStatus;
  learningDna: LearningDNA;
  vedhkritIndex: VedhkritIndex;
  careerMatches: CareerMatch[];
  recommendations: Recommendation[];
  notifications: Notification[];
}
