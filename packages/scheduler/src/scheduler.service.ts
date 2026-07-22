import { Injectable, Logger } from '@nestjs/common';

export interface JobDefinition {
  id: string;
  name: string;
  cronTime?: string;
  intervalMs?: number;
  maxRetries?: number;
  task: () => Promise<void>;
}

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);
  private readonly activeJobs = new Map<string, JobDefinition>();

  registerJob(job: JobDefinition): void {
    this.activeJobs.set(job.id, job);
    this.logger.log(`Registered background job: ${job.name} (${job.id})`);
  }

  async executeWithRetry(jobId: string): Promise<void> {
    const job = this.activeJobs.get(jobId);
    if (!job) {
      throw new Error(`Job ${jobId} not found in SchedulerService`);
    }

    const maxRetries = job.maxRetries ?? 3;
    let attempt = 0;
    let success = false;

    while (attempt < maxRetries && !success) {
      try {
        attempt++;
        this.logger.log(`Executing job ${job.name} (Attempt ${attempt}/${maxRetries})`);
        await job.task();
        success = true;
        this.logger.log(`Job ${job.name} completed successfully`);
      } catch (err: any) {
        this.logger.error(`Job ${job.name} failed on attempt ${attempt}: ${err.message}`, err.stack);
        if (attempt >= maxRetries) {
          throw err;
        }
        await new Promise((resolve) => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }
  }

  getActiveJobs(): JobDefinition[] {
    return Array.from(this.activeJobs.values());
  }
}
