export interface Assignment {
  id: string;
  subject: string;
  teacher: string;
  title: string;
  due: string;
  priority: "High" | "Medium" | "Low";
  attachment: string;
  instructions: string;
  status: "pending" | "submitted" | "completed";
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  fileUrl: string;
  fileName: string;
  submittedOn: string;
  status: "submitted" | "completed";
  feedback?: string;
  marks?: string;
}

export interface SubmissionStatus {
  hasSubmission: boolean;
  submission?: Submission;
}

export interface UploadRequest {
  fileName: string;
  fileType: string;
}

export interface UploadResponse {
  uploadUrl: string;
  fileKey: string;
  publicUrl: string;
}

export interface DraftSubmission {
  assignmentId: string;
  studentId: string;
  fileKey?: string;
  fileName?: string;
  notes?: string;
}

export interface AssignmentDetail extends Assignment {
  submissions?: Submission[];
}
