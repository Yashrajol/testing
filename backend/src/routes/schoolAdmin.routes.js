import { Router } from 'express';
import {
  getSchoolAdminDashboard,
  getSchoolStudents,
  onboardStudent,
  getSchoolMentors,
} from '../controllers/schoolAdmin.controller.js';

const router = Router();

// Admin Dashboard Route
router.get('/admin/dashboard', getSchoolAdminDashboard);

// Admin Students Roster & Onboarding Routes
router.get('/admin/students', getSchoolStudents);
router.post('/admin/students', onboardStudent);

// Admin Mentors Route
router.get('/admin/mentors', getSchoolMentors);

export default router;
