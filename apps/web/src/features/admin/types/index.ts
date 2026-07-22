export interface DashboardStatistics {
  totalStudents: number;
  totalParents: number;
  totalMentors: number;
  activeCourses: number;
  activeBatches: number;
  attendanceRate: number;
  assignmentCompletion: number;
  assessmentCompletion: number;
  platformActivityScore: number;
}

export interface Student {
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
  wellbeing?: number;
  skills?: number;
  parentId?: string;
  mentorId?: string;
  createdAt?: string;
}

export interface Parent {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  studentIds: string[];
  studentsCount?: number;
  createdAt?: string;
}

export interface Mentor {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  expertise: string;
  students: number;
  sessions: number;
  rating: number;
  assignedStudentIds?: string[];
  createdAt?: string;
}

export interface Course {
  id: string;
  title: string;
  code?: string;
  subject: string;
  grades: number[];
  description?: string;
  teacherName?: string;
  activeBatchesCount?: number;
  status: 'active' | 'archived' | 'draft';
}

export interface Batch {
  id: string;
  name: string;
  courseId: string;
  courseName?: string;
  grade: number;
  section: string;
  studentCount: number;
  teacherName?: string;
  startDate?: string;
  endDate?: string;
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  grade: number;
  section: string;
  dueDate: string;
  totalSubmissions: number;
  pendingReviews: number;
  averageScore?: number;
}

export interface Assessment {
  id: string;
  name: string;
  grade: number;
  totalEnrolled: number;
  totalCompleted: number;
  completionRate: number;
  status: 'active' | 'scheduled' | 'closed';
  scheduledDate?: string;
}

export interface AttendanceSummary {
  date: string;
  totalStudents: number;
  presentCount: number;
  absentCount: number;
  attendancePercentage: number;
  byGrade: Array<{ grade: number; percentage: number }>;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  targetAudience: 'all' | 'students' | 'parents' | 'mentors' | 'teachers';
  authorName?: string;
  publishedAt: string;
  status: 'published' | 'draft' | 'archived';
  priority?: 'normal' | 'high' | 'urgent';
}

export interface Report {
  id: string;
  name: string;
  category?: string;
  date: string;
  size: string;
  status: 'Published' | 'Draft' | 'Archived';
  downloadUrl?: string;
}

export interface SystemSettings {
  schoolName: string;
  affiliationBoard: string;
  principalName: string;
  registeredCapacity: number;
  address: string;
  adminEmail: string;
  officePhone: string;
  academicYear: string;
  maintenanceMode: boolean;
}

export interface ActivityLog {
  id: string;
  user: string;
  role: string;
  action: string;
  timestamp: string;
}

export interface AdminDashboard {
  stats: DashboardStatistics;
  recentStudents: Student[];
  recentMentors: Mentor[];
  activityLogs: ActivityLog[];
  needsAttention: Student[];
}
