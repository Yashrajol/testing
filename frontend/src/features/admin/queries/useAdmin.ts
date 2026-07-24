import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AdminService } from '../services/admin.service';
import {
  Student,
  Parent,
  Mentor,
  Course,
  Batch,
  Announcement,
  SystemSettings,
} from '../types';

export const ADMIN_QUERY_KEYS = {
  dashboard: ['admin', 'dashboard'] as const,
  students: ['admin', 'students'] as const,
  student: (id: string) => ['admin', 'students', id] as const,
  parents: ['admin', 'parents'] as const,
  parent: (id: string) => ['admin', 'parents', id] as const,
  mentors: ['admin', 'mentors'] as const,
  mentor: (id: string) => ['admin', 'mentors', id] as const,
  courses: ['admin', 'courses'] as const,
  batches: ['admin', 'batches'] as const,
  assignments: ['admin', 'assignments'] as const,
  assessments: ['admin', 'assessments'] as const,
  attendance: ['admin', 'attendance'] as const,
  announcements: ['admin', 'announcements'] as const,
  reports: ['admin', 'reports'] as const,
  settings: ['admin', 'settings'] as const,
};

// Dashboard
export function useAdminDashboard() {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.dashboard,
    queryFn: () => AdminService.getDashboard(),
    staleTime: 1000 * 60 * 5,
  });
}

// Students Hooks
export function useStudents() {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.students,
    queryFn: () => AdminService.getStudents(),
    staleTime: 1000 * 60 * 5,
  });
}

export function useStudent(studentId: string) {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.student(studentId),
    queryFn: () => AdminService.getStudent(studentId),
    enabled: !!studentId,
  });
}

export function useCreateStudent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<Student>) => AdminService.createStudent(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.students });
      queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.dashboard });
    },
  });
}

export function useUpdateStudent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ studentId, payload }: { studentId: string; payload: Partial<Student> }) =>
      AdminService.updateStudent(studentId, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.students });
      queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.student(variables.studentId) });
      queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.dashboard });
    },
  });
}

export function useDeleteStudent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (studentId: string) => AdminService.deleteStudent(studentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.students });
      queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.dashboard });
    },
  });
}

// Parents Hooks
export function useParents() {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.parents,
    queryFn: () => AdminService.getParents(),
  });
}

export function useParent(parentId: string) {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.parent(parentId),
    queryFn: () => AdminService.getParent(parentId),
    enabled: !!parentId,
  });
}

export function useCreateParent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<Parent>) => AdminService.createParent(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.parents });
    },
  });
}

export function useUpdateParent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ parentId, payload }: { parentId: string; payload: Partial<Parent> }) =>
      AdminService.updateParent(parentId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.parents });
    },
  });
}

export function useDeleteParent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (parentId: string) => AdminService.deleteParent(parentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.parents });
    },
  });
}

// Mentors Hooks
export function useMentors() {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.mentors,
    queryFn: () => AdminService.getMentors(),
  });
}

export function useMentor(mentorId: string) {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.mentor(mentorId),
    queryFn: () => AdminService.getMentor(mentorId),
    enabled: !!mentorId,
  });
}

export function useCreateMentor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<Mentor>) => AdminService.createMentor(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.mentors });
      queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.dashboard });
    },
  });
}

export function useUpdateMentor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ mentorId, payload }: { mentorId: string; payload: Partial<Mentor> }) =>
      AdminService.updateMentor(mentorId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.mentors });
    },
  });
}

export function useDeleteMentor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (mentorId: string) => AdminService.deleteMentor(mentorId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.mentors });
    },
  });
}

// Courses Hooks
export function useCourses() {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.courses,
    queryFn: () => AdminService.getCourses(),
  });
}

export function useCreateCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<Course>) => AdminService.createCourse(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.courses });
    },
  });
}

export function useUpdateCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ courseId, payload }: { courseId: string; payload: Partial<Course> }) =>
      AdminService.updateCourse(courseId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.courses });
    },
  });
}

export function useDeleteCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (courseId: string) => AdminService.deleteCourse(courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.courses });
    },
  });
}

// Batches Hooks
export function useBatches() {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.batches,
    queryFn: () => AdminService.getBatches(),
  });
}

export function useCreateBatch() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<Batch>) => AdminService.createBatch(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.batches });
    },
  });
}

export function useUpdateBatch() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ batchId, payload }: { batchId: string; payload: Partial<Batch> }) =>
      AdminService.updateBatch(batchId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.batches });
    },
  });
}

export function useDeleteBatch() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (batchId: string) => AdminService.deleteBatch(batchId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.batches });
    },
  });
}

// Overview Queries
export function useAssignments() {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.assignments,
    queryFn: () => AdminService.getAssignments(),
  });
}

export function useAssessments() {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.assessments,
    queryFn: () => AdminService.getAssessments(),
  });
}

export function useAttendance() {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.attendance,
    queryFn: () => AdminService.getAttendance(),
  });
}

// Announcements Hooks
export function useAnnouncements() {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.announcements,
    queryFn: () => AdminService.getAnnouncements(),
  });
}

export function useCreateAnnouncement() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<Announcement>) => AdminService.createAnnouncement(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.announcements });
    },
  });
}

export function useUpdateAnnouncement() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ announcementId, payload }: { announcementId: string; payload: Partial<Announcement> }) =>
      AdminService.updateAnnouncement(announcementId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.announcements });
    },
  });
}

export function useDeleteAnnouncement() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (announcementId: string) => AdminService.deleteAnnouncement(announcementId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.announcements });
    },
  });
}

// Reports & Settings
export function useReports() {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.reports,
    queryFn: () => AdminService.getReports(),
  });
}

export function useSettings() {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.settings,
    queryFn: () => AdminService.getSettings(),
  });
}

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<SystemSettings>) => AdminService.updateSettings(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.settings });
    },
  });
}
