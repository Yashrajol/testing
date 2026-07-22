import { Injectable } from '@nestjs/common';

@Injectable()
export class MetricsService {
  private requestsTotal = 0;

  incrementRequests() {
    this.requestsTotal++;
  }

  async getMetrics(): Promise<string> {
    const memory = process.memoryUsage();
    return [
      `# HELP http_requests_total Total number of HTTP requests processed`,
      `# TYPE http_requests_total counter`,
      `http_requests_total ${this.requestsTotal}`,
      `# HELP process_heap_bytes Process heap size in bytes`,
      `# TYPE process_heap_bytes gauge`,
      `process_heap_bytes ${memory.heapUsed}`,
    ].join('\n');
  }
}
