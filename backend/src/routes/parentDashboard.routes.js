import { Router } from 'express';
import {
  getParentOverview,
  getParentAttendance,
  getParentAcademics,
  getParentAssignments,
  getParentAssessments,
  getParentGrowth,
  getParentNotifications,
} from '../controllers/parentDashboard.controller.js';

const router = Router();

// Parent Overview Routes
router.get('/parent/overview', getParentOverview);
router.get('/parent/overview/:studentId', getParentOverview);

// Parent Subpage Telemetry Routes
router.get('/parent/attendance/:studentId', getParentAttendance);
router.get('/parent/academics/:studentId', getParentAcademics);
router.get('/parent/assignments/:studentId', getParentAssignments);
router.get('/parent/assessments/:studentId', getParentAssessments);
router.get('/parent/growth/:studentId', getParentGrowth);
router.get('/parent/notifications/:studentId', getParentNotifications);

export default router;
