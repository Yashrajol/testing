export interface Lesson {
  id: string;
  title: string;
  description?: string;
  duration?: string;
  videoUrl?: string;
  isCompleted?: boolean;
}

export interface RecordedLecture {
  id: string;
  title: string;
  date: string;
  length: string;
  videoUrl?: string;
}

export interface Chapter {
  id: string;
  title: string;
  status: "completed" | "active" | "locked";
  progress?: number;
  lessons?: Lesson[];
}

export interface Enrollment {
  id: string;
  studentId: string;
  subjectId: string;
  academicYear?: string;
  classSection?: string;
  batch?: string;
  rollNumber?: string | number;
}

export interface Progress {
  attendancePercentage: number;
  overallPercentage: number;
  homeworkPendingCount: number;
  lastTestScore: number;
  nextClassTime: string;
  syllabusCoverage: number;
}

export interface Assignment {
  id: string;
  title: string;
  due: string;
  status: "Pending" | "Submitted";
}

export interface Note {
  id: string;
  title: string;
  size: string;
  fileUrl?: string;
}

export interface PracticeQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  type: string;
}

export interface RecentScore {
  id: string;
  title: string;
  date: string;
  score: string;
}

export interface Resource {
  id: string;
  title: string;
  type: string;
}

export interface Subject {
  id: string;
  name: string;
  teacherName: string;
  currentChapterTitle: string;
  description?: string;
  colorClass?: string;
  iconName?: string;
  progress?: Progress;
  enrollment?: Enrollment;
  
  // Detailed arrays for child views
  chapters?: Chapter[];
  assignments?: Assignment[];
  notes?: Note[];
  recordedLectures?: RecordedLecture[];
  practiceQuestions?: PracticeQuestion[];
  announcements?: Announcement[];
  recentScores?: RecentScore[];
  resources?: Resource[];
}

export type AcademicEntityResponse = Subject[];
