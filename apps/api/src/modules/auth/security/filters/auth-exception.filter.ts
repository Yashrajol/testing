import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthDomainException } from '../../domain/exceptions/auth.exception';

@Catch()
export class AuthExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AuthExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const requestId = (request as any).requestId;

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let title = 'Internal Server Error';
    let detail = 'An unexpected security or authentication error occurred.';
    let errorCode = 'INTERNAL_ERROR';

    if (exception instanceof AuthDomainException) {
      status = HttpStatus.UNAUTHORIZED;
      title = 'Authentication Error';
      detail = exception.message;
      errorCode = exception.code;
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      title = exception.name;
      const res = exception.getResponse();
      detail = typeof res === 'string' ? res : (res as any).message || exception.message;
      errorCode = (res as any).error || 'HTTP_ERROR';
    } else if (exception instanceof Error) {
      detail = exception.message;
    }

    this.logger.error(`[${requestId || 'N/A'}] Exception on ${request.method} ${request.url}: ${detail}`);

    const problemDetails = {
      type: `https://api.vedhkrit.com/errors/${errorCode.toLowerCase().replace(/_/g, '-')}`,
      title,
      status,
      detail,
      instance: request.url,
      code: errorCode,
      requestId,
      timestamp: new Date().toISOString(),
    };

    response
      .status(status)
      .header('Content-Type', 'application/problem+json')
      .json(problemDetails);
  }
}
