export interface ApiResponseWrapper<T> {
  success: boolean;
  data: T;
  meta?: Record<string, any>;
  timestamp: string;
}

export class ResponseWrapper {
  static success<T>(data: T, meta?: Record<string, any>): ApiResponseWrapper<T> {
    return {
      success: true,
      data,
      meta,
      timestamp: new Date().toISOString(),
    };
  }

  static error(message: string, code?: string): ApiResponseWrapper<null> {
    return {
      success: false,
      data: null,
      meta: { error: message, code },
      timestamp: new Date().toISOString(),
    };
  }
}
