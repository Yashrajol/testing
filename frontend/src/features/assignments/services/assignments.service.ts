import { apiClient } from '@/shared/api/axios';
import { 
  Assignment, 
  Submission, 
  SubmissionStatus, 
  UploadRequest, 
  UploadResponse, 
  DraftSubmission, 
  AssignmentDetail 
} from '../types';

export const AssignmentsService = {
  async getAssignments(): Promise<Assignment[]> {
    return (await apiClient.get('/api/v1/assignments')) as any;
  },

  async getAssignment(id: string): Promise<AssignmentDetail> {
    return (await apiClient.get(`/api/v1/assignments/${id}`)) as any;
  },

  async getSubmissionStatus(id: string, studentId: string): Promise<SubmissionStatus> {
    return (await apiClient.get(`/api/v1/assignments/${id}/submissions/student/${studentId}`)) as any;
  },

  async getPresignedUploadUrl(req: UploadRequest): Promise<UploadResponse> {
    return (await apiClient.post('/api/v1/storage/presigned-url', req)) as any;
  },

  async submitAssignment(data: { assignmentId: string; studentId: string; fileKey: string; fileName: string }): Promise<Submission> {
    return (await apiClient.post('/api/v1/assignments/submissions', data)) as any;
  },

  async saveDraft(data: DraftSubmission): Promise<Submission> {
    return (await apiClient.post('/api/v1/assignments/submissions/draft', data)) as any;
  },
};
