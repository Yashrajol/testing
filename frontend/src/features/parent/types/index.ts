export interface ParentOverview {
  parentId: string;
  parentName: string;
  studentId: string;
  studentName: string;
  grade: string;
  school: string;
  avatar?: string;
  vedhkritIndex: number;
  attendancePercentage: number;
  academicAverage: number;
  assessmentDone: boolean;
  upcomingEvents: Array<{
    date: string;
    time: string;
    title: string;
    cat: string;
    action: string;
  }>;
  recentActivities: Array<{
    title: string;
    desc: string;
    time: string;
    category: string;
  }>;
}

export interface AttendanceSummary {
  studentId: string;
  attendancePercentage: number;
  classesAttended: number;
  totalClasses: number;
  history: Array<{
    date: string;
    status: "present" | "absent" | "late";
  }>;
}

export interface SubjectProgress {
  subject: string;
  score: number;
  trend: string;
  teacher: string;
  lastTest: string;
  improvement: string;
}

export interface AcademicProgress {
  studentId: string;
  academicAverage: number;
  subjects: SubjectProgress[];
  history: Array<{
    month: string;
    Academic: number;
    Attendance: number;
    Homework: number;
  }>;
}

export interface AssignmentSummary {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: "pending" | "submitted" | "graded" | "late";
  grade?: string;
}

export interface AssessmentSummary {
  id: string;
  name: string;
  type: string;
  date: string;
  status: string;
  score: string;
}

export interface GrowthSnapshot {
  studentId: string;
  learningDna: {
    strengths: string[];
    weaknesses: string[];
  };
  careers: string[];
  growthIndex: number;
}

export interface ParentNotification {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  isRead: boolean;
}
