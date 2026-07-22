export interface Timetable {
  time: string;
  label: string;
  type: "class" | "break" | "free" | "study";
  active?: boolean;
}

export interface CalendarDay {
  date: string;
  day: number;
  status: "present" | "absent" | "holiday" | "none";
}

export interface Holiday {
  date: string;
  name: string;
}

export interface Goal {
  id: string;
  chapter: string;
  subject: string;
  progress: number;
  target: number;
}

export interface PlannerEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  type: string;
}

export interface UpcomingClass {
  id: string;
  subject: string;
  teacher: string;
  time: string;
  duration: string;
}

export interface AttendanceCalendar {
  studentId: string;
  month: string;
  attendancePercentage: number;
  days: CalendarDay[];
}
