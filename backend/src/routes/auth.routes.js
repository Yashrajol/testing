import { Router } from 'express';
import {
  register,
  registerSchool,
  registerMentor,
  verifyOtp,
  login,
  me,
  refreshToken,
  forgotPassword,
  resetPassword,
  updateProfile,
  completeOnboarding,
} from '../controllers/auth.controller.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.post('/register', register);
router.post('/register-school', registerSchool);
router.post('/register-mentor', registerMentor);
router.post('/verify-otp', verifyOtp);
router.post('/login', login);
router.post('/refresh', refreshToken);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/onboarding', completeOnboarding);

router.get('/me', authenticateToken, me);
router.put('/profile', authenticateToken, updateProfile);

export default router;