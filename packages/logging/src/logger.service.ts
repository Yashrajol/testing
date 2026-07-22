import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';

@Injectable()
export class LoggerService implements NestLoggerService {
  private formatLog(level: string, message: string, context?: string, metadata?: Record<string, any>) {
    return JSON.stringify({
      level,
      timestamp: new Date().toISOString(),
      context,
      message,
      ...metadata,
    });
  }

  log(message: string, context?: string, metadata?: Record<string, any>) {
    process.stdout.write(this.formatLog('info', message, context, metadata) + '\n');
  }

  error(message: string, trace?: string, context?: string, metadata?: Record<string, any>) {
    process.stderr.write(this.formatLog('error', message, context, { trace, ...metadata }) + '\n');
  }

  warn(message: string, context?: string, metadata?: Record<string, any>) {
    process.stdout.write(this.formatLog('warn', message, context, metadata) + '\n');
  }

  debug(message: string, context?: string, metadata?: Record<string, any>) {
    process.stdout.write(this.formatLog('debug', message, context, metadata) + '\n');
  }

  verbose(message: string, context?: string, metadata?: Record<string, any>) {
    process.stdout.write(this.formatLog('trace', message, context, metadata) + '\n');
  }
}
