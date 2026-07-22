import { Module, Global } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { CorrelationIdMiddleware, RequestLoggerMiddleware } from './logger.middleware';

@Global()
@Module({
  providers: [LoggerService, CorrelationIdMiddleware, RequestLoggerMiddleware],
  exports: [LoggerService, CorrelationIdMiddleware, RequestLoggerMiddleware],
})
export class LoggerModule {}
