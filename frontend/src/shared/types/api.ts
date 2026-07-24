export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data: T;
  meta?: PaginationMeta | CursorMeta;
  errors?: string[];
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CursorMeta {
  nextCursor?: string;
  hasNextPage: boolean;
}

export class ApiError extends Error {
  status: number;
  code?: string;
  detail?: string;
  errors?: string[];

  constructor(message: string, status: number, code?: string, detail?: string, errors?: string[]) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.detail = detail;
    this.errors = errors;
  }
}

