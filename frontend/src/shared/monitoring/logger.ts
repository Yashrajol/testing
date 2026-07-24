/**
 * Provider-Agnostic Enterprise Logging & Telemetry Layer
 */

export interface LogPayload {
  message: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  context?: string;
  requestId?: string;
  correlationId?: string;
  metadata?: Record<string, any>;
  timestamp?: string;
}

class TelemetryLogger {
  private isProduction = import.meta.env.PROD;

  private formatMessage(payload: LogPayload): string {
    const timestamp = new Date().toISOString();
    return JSON.stringify({
      timestamp,
      level: payload.level,
      context: payload.context || 'App',
      message: payload.message,
      requestId: payload.requestId,
      correlationId: payload.correlationId,
      ...payload.metadata,
    });
  }

  info(message: string, context?: string, metadata?: Record<string, any>) {
    if (this.isProduction) {
      console.log(this.formatMessage({ level: 'info', message, context, metadata }));
    } else {
      console.log(`[INFO] [${context || 'App'}] ${message}`, metadata || '');
    }
  }

  warn(message: string, context?: string, metadata?: Record<string, any>) {
    if (this.isProduction) {
      console.warn(this.formatMessage({ level: 'warn', message, context, metadata }));
    } else {
      console.warn(`[WARN] [${context || 'App'}] ${message}`, metadata || '');
    }
  }

  error(message: string, error?: any, context?: string, metadata?: Record<string, any>) {
    const errorDetails = error instanceof Error
      ? { name: error.name, message: error.message, stack: error.stack }
      : { error };

    if (this.isProduction) {
      console.error(this.formatMessage({
        level: 'error',
        message,
        context,
        metadata: { ...metadata, error: errorDetails },
      }));
    } else {
      console.error(`[ERROR] [${context || 'App'}] ${message}`, error || '', metadata || '');
    }
  }

  // API Timing Performance Instrumentation
  timeApiCall(endpoint: string, durationMs: number, status: number) {
    this.info(`API Call completed: ${endpoint}`, 'NetworkTelemetry', {
      durationMs,
      status,
      performanceCategory: durationMs > 1000 ? 'slow' : 'optimal',
    });
  }
}

export const logger = new TelemetryLogger();

// Attach global error listeners for frontend monitoring
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    logger.error('Unhandled Global Error', event.error || event.message, 'GlobalErrorBoundary');
  });

  window.addEventListener('unhandledrejection', (event) => {
    logger.error('Unhandled Promise Rejection', event.reason, 'GlobalPromiseListener');
  });
}
