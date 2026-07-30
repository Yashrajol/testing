import { Router } from 'express';
import {
  getSuperAdminDashboard,
  getOrganizations,
  getSystemHealth,
  getPlatformAnalytics,
  getSubscriptions,
  createSubscriptionPlan,
  updateSubscriptionPlan,
  deleteSubscriptionPlan,
  getAuditLogs,
} from '../controllers/superAdmin.controller.js';

const router = Router();

// Public / Shared Plans Endpoint
router.get('/plans', getSubscriptions);

// Dashboard & Telemetry
router.get('/super-admin/dashboard', getSuperAdminDashboard);

// Organizations Management
router.get('/super-admin/organizations', getOrganizations);

// Health & Analytics
router.get('/super-admin/system-health', getSystemHealth);
router.get('/super-admin/analytics', getPlatformAnalytics);

// Subscriptions & Billing CRUD
router.get('/super-admin/subscriptions', getSubscriptions);
router.post('/super-admin/subscriptions', createSubscriptionPlan);
router.put('/super-admin/subscriptions/:id', updateSubscriptionPlan);
router.delete('/super-admin/subscriptions/:id', deleteSubscriptionPlan);

// Security & Audit Logs
router.get('/super-admin/audit-logs', getAuditLogs);

export default router;
