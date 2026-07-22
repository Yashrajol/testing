import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { MentorService } from '../services/mentor.service';
import { MentorSession, StudentAssignment, StudentAssessment, MentorNote, MentorFeedback } from '../types';

export const MENTOR_QUERY_KEYS = {
  dashboard: ['mentor', 'dashboard'] as const,
  students: ['mentor', 'students'] as const,
  student: (id: string) => ['mentor', 'students', id] as const,
  sessions: ['mentor', 'sessions'] as const,
  attendance: ['mentor', 'attendance'] as const,
  assignments: ['mentor', 'assignments'] as const,
  assessments: ['mentor', 'assessments'] as const,
  learningDNA: (id: string) => ['mentor', 'learning-dna', id] as const,
  growth: (id: string) => ['mentor', 'growth', id] as const,
  notes: (id: string) => ['mentor', 'notes', id] as const,
  notifications: ['mentor', 'notifications'] as const,
};

export function useMentorDashboard() {
  return useQuery({
    queryKey: MENTOR_QUERY_KEYS.dashboard,
    queryFn: () => MentorService.getDashboard(),
    staleTime: 1000 * 60 * 5, // 5 mins cache
  });
}

export function useMentorStudents() {
  return useQuery({
    queryKey: MENTOR_QUERY_KEYS.students,
    queryFn: () => MentorService.getStudents(),
    staleTime: 1000 * 60 * 5,
  });
}

export function useMentorStudent(studentId: string) {
  return useQuery({
    queryKey: MENTOR_QUERY_KEYS.student(studentId),
    queryFn: () => MentorService.getStudent(studentId),
    enabled: !!studentId,
  });
}

export function useMentorSessions() {
  return useQuery({
    queryKey: MENTOR_QUERY_KEYS.sessions,
    queryFn: () => MentorService.getSessions(),
    staleTime: 1000 * 60 * 2,
  });
}

export function useCreateSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { studentId: string; topic: string; scheduledAt: string; durationMinutes?: number }) =>
      MentorService.createSession(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MENTOR_QUERY_KEYS.sessions });
      queryClient.invalidateQueries({ queryKey: MENTOR_QUERY_KEYS.dashboard });
    },
  });
}

export function useUpdateSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ sessionId, payload }: { sessionId: string; payload: Partial<MentorSession> }) =>
      MentorService.updateSession(sessionId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MENTOR_QUERY_KEYS.sessions });
      queryClient.invalidateQueries({ queryKey: MENTOR_QUERY_KEYS.dashboard });
    },
  });
}

export function useMentorAttendance() {
  return useQuery({
    queryKey: MENTOR_QUERY_KEYS.attendance,
    queryFn: () => MentorService.getAttendance(),
  });
}

export function useMentorAssignments() {
  return useQuery({
    queryKey: MENTOR_QUERY_KEYS.assignments,
    queryFn: () => MentorService.getAssignments(),
  });
}

export function useReviewAssignment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ assignmentId, score, feedback }: { assignmentId: string; score: number; feedback: string }) =>
      MentorService.reviewAssignment(assignmentId, { score, feedback }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MENTOR_QUERY_KEYS.assignments });
      queryClient.invalidateQueries({ queryKey: MENTOR_QUERY_KEYS.dashboard });
    },
  });
}

export function useMentorAssessments() {
  return useQuery({
    queryKey: MENTOR_QUERY_KEYS.assessments,
    queryFn: () => MentorService.getAssessments(),
  });
}

export function useReviewAssessment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ attemptId, score, mentorFeedback }: { attemptId: string; score?: number; mentorFeedback: string }) =>
      MentorService.reviewAssessment(attemptId, { score, mentorFeedback }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MENTOR_QUERY_KEYS.assessments });
      queryClient.invalidateQueries({ queryKey: MENTOR_QUERY_KEYS.dashboard });
    },
  });
}

export function useLearningDNA(studentId: string) {
  return useQuery({
    queryKey: MENTOR_QUERY_KEYS.learningDNA(studentId),
    queryFn: () => MentorService.getLearningDNA(studentId),
    enabled: !!studentId,
  });
}

export function useGrowth(studentId: string) {
  return useQuery({
    queryKey: MENTOR_QUERY_KEYS.growth(studentId),
    queryFn: () => MentorService.getGrowth(studentId),
    enabled: !!studentId,
  });
}

export function useMentorNotes(studentId: string) {
  return useQuery({
    queryKey: MENTOR_QUERY_KEYS.notes(studentId),
    queryFn: () => MentorService.getNotes(studentId),
    enabled: !!studentId,
  });
}

export function useCreateNote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { studentId: string; content: string; tags?: string[] }) =>
      MentorService.createNote(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: MENTOR_QUERY_KEYS.notes(variables.studentId) });
      queryClient.invalidateQueries({ queryKey: MENTOR_QUERY_KEYS.student(variables.studentId) });
    },
  });
}

export function useSubmitFeedback() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { studentId: string; rating: number; title: string; comment: string }) =>
      MentorService.submitFeedback(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MENTOR_QUERY_KEYS.dashboard });
    },
  });
}

export function useMentorNotifications() {
  return useQuery({
    queryKey: MENTOR_QUERY_KEYS.notifications,
    queryFn: () => MentorService.getNotifications(),
  });
}

export function useGenerateAIInsights() {
  return useMutation({
    mutationFn: (payload: { studentId?: string; prompt?: string; type?: string }) =>
      MentorService.generateAIInsights(payload),
  });
}
