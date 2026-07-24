import { apiClient } from '@/shared/api/axios';
import {
  AdminDashboard,
  Student,
  Parent,
  Mentor,
  Course,
  Batch,
  Assignment,
  Assessment,
  AttendanceSummary,
  Announcement,
  Report,
  SystemSettings,
} from '../types';

export const AdminService = {
  // Dashboard
  async getDashboard(): Promise<AdminDashboard> {
    return (await apiClient.get('/api/v1/admin/dashboard')) as any;
  },

  // Students CRUD
  async getStudents(): Promise<Student[]> {
    return (await apiClient.get('/api/v1/admin/students')) as any;
  },

  async getStudent(studentId: string): Promise<Student> {
    return (await apiClient.get(`/api/v1/admin/students/${studentId}`)) as any;
  },

  async createStudent(payload: Partial<Student>): Promise<Student> {
    return (await apiClient.post('/api/v1/admin/students', payload)) as any;
  },

  async updateStudent(studentId: string, payload: Partial<Student>): Promise<Student> {
    return (await apiClient.put(`/api/v1/admin/students/${studentId}`, payload)) as any;
  },

  async deleteStudent(studentId: string): Promise<{ success: boolean }> {
    return (await apiClient.delete(`/api/v1/admin/students/${studentId}`)) as any;
  },

  // Parents CRUD
  async getParents(): Promise<Parent[]> {
    return (await apiClient.get('/api/v1/admin/parents')) as any;
  },

  async getParent(parentId: string): Promise<Parent> {
    return (await apiClient.get(`/api/v1/admin/parents/${parentId}`)) as any;
  },

  async createParent(payload: Partial<Parent>): Promise<Parent> {
    return (await apiClient.post('/api/v1/admin/parents', payload)) as any;
  },

  async updateParent(parentId: string, payload: Partial<Parent>): Promise<Parent> {
    return (await apiClient.put(`/api/v1/admin/parents/${parentId}`, payload)) as any;
  },

  async deleteParent(parentId: string): Promise<{ success: boolean }> {
    return (await apiClient.delete(`/api/v1/admin/parents/${parentId}`)) as any;
  },

  // Mentors CRUD
  async getMentors(): Promise<Mentor[]> {
    return (await apiClient.get('/api/v1/admin/mentors')) as any;
  },

  async getMentor(mentorId: string): Promise<Mentor> {
    return (await apiClient.get(`/api/v1/admin/mentors/${mentorId}`)) as any;
  },

  async createMentor(payload: Partial<Mentor>): Promise<Mentor> {
    return (await apiClient.post('/api/v1/admin/mentors', payload)) as any;
  },

  async updateMentor(mentorId: string, payload: Partial<Mentor>): Promise<Mentor> {
    return (await apiClient.put(`/api/v1/admin/mentors/${mentorId}`, payload)) as any;
  },

  async deleteMentor(mentorId: string): Promise<{ success: boolean }> {
    return (await apiClient.delete(`/api/v1/admin/mentors/${mentorId}`)) as any;
  },

  // Courses CRUD
  async getCourses(): Promise<Course[]> {
    return (await apiClient.get('/api/v1/admin/courses')) as any;
  },

  async createCourse(payload: Partial<Course>): Promise<Course> {
    return (await apiClient.post('/api/v1/admin/courses', payload)) as any;
  },

  async updateCourse(courseId: string, payload: Partial<Course>): Promise<Course> {
    return (await apiClient.put(`/api/v1/admin/courses/${courseId}`, payload)) as any;
  },

  async deleteCourse(courseId: string): Promise<{ success: boolean }> {
    return (await apiClient.delete(`/api/v1/admin/courses/${courseId}`)) as any;
  },

  // Batches CRUD
  async getBatches(): Promise<Batch[]> {
    return (await apiClient.get('/api/v1/admin/batches')) as any;
  },

  async createBatch(payload: Partial<Batch>): Promise<Batch> {
    return (await apiClient.post('/api/v1/admin/batches', payload)) as any;
  },

  async updateBatch(batchId: string, payload: Partial<Batch>): Promise<Batch> {
    return (await apiClient.put(`/api/v1/admin/batches/${batchId}`, payload)) as any;
  },

  async deleteBatch(batchId: string): Promise<{ success: boolean }> {
    return (await apiClient.delete(`/api/v1/admin/batches/${batchId}`)) as any;
  },

  // Overview Queries
  async getAssignments(): Promise<Assignment[]> {
    return (await apiClient.get('/api/v1/admin/assignments')) as any;
  },

  async getAssessments(): Promise<Assessment[]> {
    return (await apiClient.get('/api/v1/admin/assessments')) as any;
  },

  async getAttendance(): Promise<AttendanceSummary[]> {
    return (await apiClient.get('/api/v1/admin/attendance')) as any;
  },

  // Announcements CRUD
  async getAnnouncements(): Promise<Announcement[]> {
    return (await apiClient.get('/api/v1/admin/announcements')) as any;
  },

  async createAnnouncement(payload: Partial<Announcement>): Promise<Announcement> {
    return (await apiClient.post('/api/v1/admin/announcements', payload)) as any;
  },

  async updateAnnouncement(
    announcementId: string,
    payload: Partial<Announcement>
  ): Promise<Announcement> {
    return (await apiClient.put(
      `/api/v1/admin/announcements/${announcementId}`,
      payload
    )) as any;
  },

  async deleteAnnouncement(announcementId: string): Promise<{ success: boolean }> {
    return (await apiClient.delete(`/api/v1/admin/announcements/${announcementId}`)) as any;
  },

  // Reports & Settings
  async getReports(): Promise<Report[]> {
    return (await apiClient.get('/api/v1/admin/reports')) as any;
  },

  async getSettings(): Promise<SystemSettings> {
    return (await apiClient.get('/api/v1/admin/settings')) as any;
  },

  async updateSettings(payload: Partial<SystemSettings>): Promise<SystemSettings> {
    return (await apiClient.put('/api/v1/admin/settings', payload)) as any;
  },
};
