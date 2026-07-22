import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from './generated';
import { checkDatabaseHealth, DatabaseHealthResult } from './prisma';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    const isProduction = process.env.NODE_ENV === 'production';
    super({
      log: isProduction
        ? [{ emit: 'stdout', level: 'error' }, { emit: 'stdout', level: 'warn' }]
        : [
            { emit: 'stdout', level: 'warn' },
            { emit: 'stdout', level: 'error' },
          ],
      errorFormat: isProduction ? 'minimal' : 'colorless',
    });
  }

  async onModuleInit(): Promise<void> {
    try {
      await this.$connect();
      this.logger.log('Successfully connected to PostgreSQL via Prisma ORM');
    } catch (error) {
      this.logger.error('Failed to establish initial database connection', error);
      throw error;
    }
  }

  async onModuleDestroy(): Promise<void> {
    try {
      await this.$disconnect();
      this.logger.log('Gracefully disconnected Prisma ORM from PostgreSQL');
    } catch (error) {
      this.logger.error('Error during Prisma ORM disconnect', error);
    }
  }

  async ping(): Promise<boolean> {
    try {
      await this.$queryRaw`SELECT 1`;
      return true;
    } catch (error) {
      this.logger.error('Database ping failed', error);
      return false;
    }
  }

  async isHealthy(): Promise<DatabaseHealthResult> {
    return checkDatabaseHealth(this);
  }

  async executeInTransaction<T>(
    fn: (tx: Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>) => Promise<T>,
    options?: { maxWait?: number; timeout?: number; maxRetries?: number },
  ): Promise<T> {
    const maxRetries = options?.maxRetries || 3;
    let attempt = 0;
    while (attempt < maxRetries) {
      try {
        return await this.$transaction(async (tx) => {
          return fn(tx);
        }, options);
      } catch (error: any) {
        attempt++;
        if (attempt >= maxRetries || !error.message?.includes('deadlock')) {
          throw error;
        }
        await new Promise((resolve) => setTimeout(resolve, Math.pow(2, attempt) * 50));
      }
    }
    throw new Error('Transaction failed after maximum deadlock retries');
  }
}
