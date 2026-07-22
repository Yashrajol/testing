import { PrismaClient, Prisma } from './generated';

declare global {
  // eslint-disable-next-line no-var
  var __vedhkritPrismaClient__: PrismaClient | undefined;
}

export interface DatabaseHealthResult {
  status: 'healthy' | 'unhealthy';
  latencyMs: number;
  timestamp: string;
  error?: string;
}

export function createPrismaClient(): PrismaClient {
  const isProduction = process.env.NODE_ENV === 'production';

  const logLevels: Prisma.LogLevel[] = isProduction
    ? ['error', 'warn']
    : ['query', 'info', 'warn', 'error'];

  return new PrismaClient({
    log: logLevels.map((level) => ({
      emit: 'event',
      level,
    })),
    errorFormat: isProduction ? 'minimal' : 'pretty',
  });
}

export function getPrismaClient(): PrismaClient {
  if (process.env.NODE_ENV === 'production') {
    return createPrismaClient();
  }

  if (!globalThis.__vedhkritPrismaClient__) {
    globalThis.__vedhkritPrismaClient__ = createPrismaClient();
  }

  return globalThis.__vedhkritPrismaClient__;
}

export const prisma = getPrismaClient();

export async function checkDatabaseHealth(client: PrismaClient = prisma): Promise<DatabaseHealthResult> {
  const startTime = Date.now();
  try {
    await client.$queryRaw`SELECT 1`;
    const latencyMs = Date.now() - startTime;
    return {
      status: 'healthy',
      latencyMs,
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    const latencyMs = Date.now() - startTime;
    return {
      status: 'unhealthy',
      latencyMs,
      timestamp: new Date().toISOString(),
      error: error?.message || 'Failed to query database',
    };
  }
}

export async function disconnectPrisma(client: PrismaClient = prisma): Promise<void> {
  try {
    await client.$disconnect();
  } catch (error) {
    console.error('Error disconnecting Prisma client:', error);
  }
}
