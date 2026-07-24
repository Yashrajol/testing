export interface StudySession {
  id: string;
  subject: string;
  teacher: string;
  topic: string;
  duration: string;
  time: string;
  status: "live" | "upcoming" | "recorded" | "completed";
  date: string;
}
