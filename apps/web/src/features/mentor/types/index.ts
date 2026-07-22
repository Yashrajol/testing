export interface MentorStatistics {
  totalStudents: number;
  assignedStudents?: number;
  activeSessions: number;
  sessionsConducted?: number;
  pendingAssignmentReviews: number;
  pendingAssessmentReviews: number;
  avgStudentScore: number;
  avgProgress?: number;
  avgAttendance: number;
  studentsAtRisk: number;
  weeklyActivityScore: number;
  rating?: number;
}

export interface MentorStudent {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  grade: number;
  section: string;
  school: string;
  academic: number;
  growthScore: number;
  stage: string;
  riskLevel: 'low' | 'medium' | 'high';
  assessmentDone: boolean;
  attendance: number;
  wellbeing: number;
  skills: number;
  assignedMentorId?: string;
  lastActive?: string;
}

export interface StudentOverview {
  student: MentorStudent;
  recentActivity: Array<{
    id: string;
    type: string;
    title: string;
    timestamp: string;
    status: string;
  }>;
  attendanceRate: number;
  assignmentCompletionRate: number;
}

export interface StudentAttendance {
  studentId: string;
  studentName?: string;
  totalClasses: number;
  attendedClasses: number;
  percentage: number;
  history: Array<{
    date: string;
    status: 'present' | 'absent' | 'late' | 'excused';
    topic?: string;
  }>;
}

export interface StudentProgress {
  studentId: string;
  studentName?: string;
  overallScore: number;
  academicScore: number;
  skillsScore: number;
  wellbeingScore: number;
  weeklyTrend: Array<{
    week: string;
    score: number;
    attendance: number;
  }>;
  milestones: Array<{
    id: string;
    title: string;
    description: string;
    status: 'Completed' | 'Active' | 'Pending';
    completedAt?: string;
  }>;
}

export interface StudentAssignment {
  id: string;
  studentId: string;
  studentName: string;
  title: string;
  subject: string;
  dueDate: string;
  submittedAt?: string;
  status: 'pending' | 'submitted' | 'reviewed' | 'late';
  score?: number;
  maxScore?: number;
  feedback?: string;
  submissionUrl?: string;
}

export interface StudentAssessment {
  id: string;
  attemptId: string;
  studentId: string;
  studentName: string;
  studentAvatar?: string;
  grade: number;
  section: string;
  school: string;
  assessmentName: string;
  status: 'pending' | 'completed' | 'reviewed';
  score?: number;
  growthScore?: number;
  academic?: number;
  skills?: number;
  wellbeing?: number;
  submittedAt: string;
  reviewedAt?: string;
  mentorFeedback?: string;
}

export interface MentorSession {
  id: string;
  title?: string;
  topic: string;
  studentId: string;
  studentName: string;
  mentorName?: string;
  scheduledAt: string;
  durationMinutes: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  meetUrl?: string;
  notes?: string;
  stage?: string;
}

export interface MentorCalendar {
  date: string;
  sessions: MentorSession[];
}

export interface LearningDNASummary {
  studentId: string;
  learningStyle: string; // e.g. "Visual Learner"
  strengths: string[];
  growthAreas: string[];
  cognitiveSpeed: number;
  retentionIndex: number;
  recommendedPace: string;
}

export interface GrowthSummary {
  studentId: string;
  baselineScore: number;
  currentScore: number;
  growthPercentage: number;
  cohortPercentile: number;
  historicalScores: Array<{ month: string; score: number }>;
}

export interface MentorFeedback {
  id?: string;
  studentId: string;
  studentName?: string;
  rating: number;
  title: string;
  comment: string;
  createdAt?: string;
}

export interface MentorNote {
  id: string;
  studentId: string;
  studentName?: string;
  authorId?: string;
  authorName?: string;
  content: string;
  tags?: string[];
  createdAt: string;
}

export interface MentorNotification {
  id: string;
  type: 'risk_warning' | 'session_reminder' | 'assessment_submitted' | 'general';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  studentId?: string;
  studentName?: string;
  riskLevel?: 'low' | 'medium' | 'high';
}

export interface AIInsight {
  id: string;
  studentId?: string;
  cohortId?: string;
  category: 'academic' | 'wellbeing' | 'engagement' | 'career';
  summary: string;
  actionablePoints: string[];
  confidenceScore: number;
  generatedAt: string;
}

export interface Recommendation {
  id: string;
  studentId: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'applied' | 'dismissed';
}

export interface MentorDashboard {
  mentor: {
    id: string;
    name: string;
    email?: string;
    avatar?: string;
  };
  stats: MentorStatistics;
  students: MentorStudent[];
  nextSession?: MentorSession;
  upcomingSessions: MentorSession[];
  pendingAssessments: StudentAssessment[];
  recentFeedback: MentorFeedback[];
  growthStudios: Array<{
    title: string;
    count: number;
    active: boolean;
  }>;
}
