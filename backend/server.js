import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDatabase } from './src/config/db.js';
import authRoutes from './src/routes/auth.routes.js';
import portalRoutes from './src/routes/portal.routes.js';
import growthRoutes from './src/routes/growth.routes.js';
import assessmentRoutes from './src/routes/assessment.routes.js';
import cmsRoutes from './src/routes/cms.routes.js';
import adminRoutes from './src/routes/admin.routes.js';
import notificationRoutes from './src/routes/notification.routes.js';
import uploadRoutes from './src/routes/upload.routes.js';
import sessionRoutes from './src/routes/session.routes.js';
import slecRoutes from './src/routes/slec.routes.js';
import mentoringRoutes from './src/routes/mentoring.routes.js';
import analyticsRoutes from './src/routes/analytics.routes.js';
import exportRoutes from './src/routes/export.routes.js';
import chatRoutes from './src/routes/chat.routes.js';
import liveEventsRoutes from './src/routes/liveEvents.routes.js';
import configRoutes from './src/routes/config.routes.js';
import docsRoutes from './src/routes/docs.routes.js';
import metricsRoutes from './src/routes/metrics.routes.js';
import paymentRoutes from './src/routes/payment.routes.js';
import cohortRoutes from './src/routes/cohort.routes.js';
import aiDiagnosticRoutes from './src/routes/aiDiagnostic.routes.js';
import certificateRoutes from './src/routes/certificate.routes.js';
import dashboardRoutes from './src/routes/dashboard.routes.js';
import parentDashboardRoutes from './src/routes/parentDashboard.routes.js';
import teacherDashboardRoutes from './src/routes/teacherDashboard.routes.js';
import schoolAdminRoutes from './src/routes/schoolAdmin.routes.js';
import superAdminRoutes from './src/routes/superAdmin.routes.js';
import { securityHeaders, rateLimiter } from './src/middleware/security.js';
import { auditLogger } from './src/middleware/auditLogger.js';
import { errorHandler } from './src/middleware/errorHandler.js';
import { setupGracefulShutdown } from './src/utils/shutdown.js';
import { sendSuccess } from './src/utils/response.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security Headers & Audit Logging
app.use(securityHeaders);
app.use(auditLogger);

// Enable CORS
const ALLOWED_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.WEB_ORIGIN,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (server-to-server, Postman, curl)
      if (!origin) return callback(null, true);
      if (ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
      callback(new Error(`CORS policy: origin ${origin} not allowed`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID', 'X-Correlation-ID', 'X-XSRF-TOKEN'],
  })
);

// Body parser
app.use(express.json());

// Apply rate limiting to critical auth endpoints
app.use('/api/v1/auth/login', rateLimiter(15, 15 * 60 * 1000));
app.use('/api/v1/auth/register', rateLimiter(10, 15 * 60 * 1000));

// Health Check Endpoint
app.get('/health', (req, res) => {
  return sendSuccess(res, { status: 'UP', timestamp: new Date().toISOString() }, 'VEDHKRIT Backend Service Healthy');
});
app.get('/api/v1/health', (req, res) => {
  return sendSuccess(res, { status: 'UP', timestamp: new Date().toISOString() }, 'VEDHKRIT Backend Service Healthy');
});

// API Routes Mounted under /api/v1
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1', portalRoutes);
app.use('/api/v1/growth', growthRoutes);
app.use('/api/v1', assessmentRoutes);
app.use('/api/v1', cmsRoutes);
app.use('/api/v1', schoolAdminRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1', notificationRoutes);
app.use('/api/v1', uploadRoutes);
app.use('/api/v1', sessionRoutes);
app.use('/api/v1', slecRoutes);
app.use('/api/v1', mentoringRoutes);
app.use('/api/v1', analyticsRoutes);
app.use('/api/v1', exportRoutes);
app.use('/api/v1', chatRoutes);
app.use('/api/v1', liveEventsRoutes);
app.use('/api/v1', configRoutes);
app.use('/api/v1', docsRoutes);
app.use('/api/v1', metricsRoutes);
app.use('/api/v1', paymentRoutes);
app.use('/api/v1', cohortRoutes);
app.use('/api/v1', aiDiagnosticRoutes);
app.use('/api/v1', certificateRoutes);
app.use('/api/v1', dashboardRoutes);
app.use('/api/v1', parentDashboardRoutes);
app.use('/api/v1', teacherDashboardRoutes);
app.use('/api/v1', superAdminRoutes);

// Global Error Handler
app.use(errorHandler);

// Initialize DB and start server
async function startServer() {
  await initDatabase();
  const server = app.listen(PORT, () => {
    console.log(`🚀 VEDHKRIT Backend Server running on http://localhost:${PORT}`);
    console.log(`📖 API Documentation Portal available at http://localhost:${PORT}/api/v1/docs`);
    console.log(`📊 Prometheus Telemetry Metrics at http://localhost:${PORT}/api/v1/metrics`);
  });

  setupGracefulShutdown(server);
}

startServer();
