import { HttpException, HttpStatus } from '@nestjs/common';

export abstract class BaseBusinessException extends HttpException {
  public readonly errorType: string;
  public readonly errorTitle: string;
  public readonly detail: string;
  public readonly instance?: string;
  public readonly invalidParams?: any[];

  constructor(
    type: string,
    title: string,
    statusCode: HttpStatus,
    detail: string,
    instance?: string,
    invalidParams?: any[],
  ) {
    super(
      {
        type,
        title,
        status: statusCode,
        detail,
        instance,
        invalidParams,
      },
      statusCode,
    );
    this.errorType = type;
    this.errorTitle = title;
    this.detail = detail;
    this.instance = instance;
    this.invalidParams = invalidParams;
  }
}

export class ResourceNotFoundException extends BaseBusinessException {
  constructor(resourceName: string, identifier: string) {
    super(
      'https://vedhkrit.com/errors/not-found',
      'Resource Not Found',
      HttpStatus.NOT_FOUND,
      `${resourceName} with identifier '${identifier}' was not found.`,
    );
  }
}

export class ConflictException extends BaseBusinessException {
  constructor(detail: string) {
    super(
      'https://vedhkrit.com/errors/conflict',
      'Resource Conflict',
      HttpStatus.CONFLICT,
      detail,
    );
  }
}

export class ValidationException extends BaseBusinessException {
  constructor(errors: any[]) {
    super(
      'https://vedhkrit.com/errors/validation',
      'Validation Failed',
      HttpStatus.BAD_REQUEST,
      'One or more validation errors occurred.',
      undefined,
      errors,
    );
  }
}

export class ForbiddenException extends BaseBusinessException {
  constructor(detail = 'Access to this resource is forbidden.') {
    super(
      'https://vedhkrit.com/errors/forbidden',
      'Access Forbidden',
      HttpStatus.FORBIDDEN,
      detail,
    );
  }
}

export class UnauthorizedException extends BaseBusinessException {
  constructor(detail = 'Authentication credentials were not provided or are invalid.') {
    super(
      'https://vedhkrit.com/errors/unauthorized',
      'Unauthorized',
      HttpStatus.UNAUTHORIZED,
      detail,
    );
  }
}
