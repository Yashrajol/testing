import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { BaseBusinessException } from './base.exception';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let problemDetails: Record<string, any> = {
      type: 'https://vedhkrit.com/errors/internal-server-error',
      title: 'Internal Server Error',
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      detail: 'An unexpected error occurred processing your request.',
      instance: request.url,
      timestamp: new Date().toISOString(),
    };

    if (exception instanceof BaseBusinessException) {
      status = exception.getStatus();
      problemDetails = {
        type: exception.errorType,
        title: exception.errorTitle,
        status,
        detail: exception.detail,
        instance: request.url,
        invalidParams: exception.invalidParams,
        timestamp: new Date().toISOString(),
      };
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      problemDetails = {
        type: 'https://vedhkrit.com/errors/http-error',
        title: exception.name,
        status,
        detail: typeof res === 'string' ? res : (res as any).message || exception.message,
        instance: request.url,
        timestamp: new Date().toISOString(),
      };
    } else if (exception instanceof Error) {
      problemDetails.detail = exception.message;
    }

    response.status(status).json(problemDetails);
  }
}
