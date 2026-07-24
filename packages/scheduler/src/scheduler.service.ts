export interface JobDefinition {
  id: string;
  name: string;
  cronTime?: string;
  intervalMs?: number;
  maxRetries?: number;
  task: () => Promise<void>;
}

export class SchedulerService {
  private readonly activeJobs = new Map<string, JobDefinition>();

  registerJob(job: JobDefinition): void {
    this.activeJobs.set(job.id, job);
    console.log(`[SchedulerService] Registered background job: ${job.name} (${job.id})`);
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
        console.log(`[SchedulerService] Executing job ${job.name} (Attempt ${attempt}/${maxRetries})`);
        await job.task();
        success = true;
        console.log(`[SchedulerService] Job ${job.name} completed successfully`);
      } catch (err: any) {
        console.error(`[SchedulerService] Job ${job.name} failed on attempt ${attempt}: ${err.message}`, err.stack);
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

export const schedulerService = new SchedulerService();
