import { apiClient } from '@/shared/api/axios';
import { Timetable, AttendanceCalendar } from '../types';

export const PlannerService = {
  async getDailySchedule(studentId: string): Promise<Timetable[]> {
    return (await apiClient.get(`/api/v1/sessions/${studentId}`)) as any;
  },

  async getWeeklySchedule(studentId: string): Promise<any> {
    return (await apiClient.get(`/api/v1/sessions/${studentId}`)) as any;
  },

  async getCalendar(): Promise<AttendanceCalendar> {
    return (await apiClient.get('/api/v1/attendance/holidays/calendar')) as any;
  },

  async createGoal(goal: { studentId: string; title: string; desc: string }): Promise<any> {
    return (await apiClient.post('/api/v1/growth/goals', goal)) as any;
  },
};
