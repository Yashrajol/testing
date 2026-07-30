import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cryptoNativeUuid, generateOtp } from '../utils/helpers.js';
import { query } from '../config/db.js';
import { sendSuccess, sendError } from '../utils/response.js';

const JWT_SECRET = process.env.JWT_SECRET || 'vedhkrit_super_secret_jwt_key_2026';
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET || 'vedhkrit_super_secret_refresh_key_2026';

/**
 * Register User (STUDENT, PARENT, TEACHER, MENTOR, SCHOOL_ADMIN, SUPERADMIN)
 */
export async function register(req, res) {
  try {
    const {
      name,
      email,
      phoneNumber,
      password,
      role = 'STUDENT',
      // Role-specific fields
      schoolName,
      grade,
      section,
      rollNumber,
      studentPhone,
      studentRollNumber,
      subjectExpertise,
      bio,
      designation,
      schoolCode,
    } = req.body;

    if (!name || !email || !password) {
      return sendError(res, 'Name, email, and password are required.', 400, 'VALIDATION_ERROR');
    }

    const validRoles = ['STUDENT', 'PARENT', 'TEACHER', 'MENTOR', 'SCHOOL_ADMIN', 'SUPERADMIN'];
    if (!validRoles.includes(role.toUpperCase())) {
      return sendError(res, `Invalid role specified. Must be one of: ${validRoles.join(', ')}`, 400, 'VALIDATION_ERROR');
    }

    const formattedRole = role.toUpperCase();

    // Check existing email
    const existingUser = await query('SELECT id FROM users WHERE email = ?', [email.toLowerCase().trim()]);
    if (existingUser.length > 0) {
      return sendError(res, 'This email is already registered.', 409, 'AUTH_001');
    }

    // Check existing phone if provided
    if (phoneNumber) {
      const existingPhone = await query('SELECT id FROM users WHERE phone_number = ?', [phoneNumber.trim()]);
      if (existingPhone.length > 0) {
        return sendError(res, 'This phone number is already registered.', 409, 'AUTH_001');
      }
    }

    // Hash Password
    const passwordHash = await bcrypt.hash(password, 10);
    const userId = cryptoNativeUuid();

    // Insert User Record
    await query(
      `INSERT INTO users (id, name, email, phone_number, password_hash, role, status) VALUES (?, ?, ?, ?, ?, ?, 'PENDING_VERIFICATION')`,
      [userId, name.trim(), email.toLowerCase().trim(), phoneNumber ? phoneNumber.trim() : null, passwordHash, formattedRole]
    );

    // Insert Role-Specific Profile
    const profileId = cryptoNativeUuid();
    if (formattedRole === 'STUDENT') {
      await query(
        `INSERT INTO student_profiles (id, user_id, school_name, grade, section, roll_number) VALUES (?, ?, ?, ?, ?, ?)`,
        [profileId, userId, schoolName || null, grade || null, section || null, rollNumber || null]
      );
    } else if (formattedRole === 'PARENT') {
      await query(
        `INSERT INTO parent_profiles (id, user_id, student_phone, student_roll_number) VALUES (?, ?, ?, ?)`,
        [profileId, userId, studentPhone || null, studentRollNumber || null]
      );
    } else if (formattedRole === 'TEACHER') {
      await query(
        `INSERT INTO teacher_profiles (id, user_id, school_name, subject_expertise) VALUES (?, ?, ?, ?)`,
        [profileId, userId, schoolName || null, subjectExpertise || null]
      );
    } else if (formattedRole === 'MENTOR') {
      await query(
        `INSERT INTO mentor_profiles (id, user_id, bio, expertise) VALUES (?, ?, ?, ?)`,
        [profileId, userId, bio || null, subjectExpertise || null]
      );
    } else if (formattedRole === 'SCHOOL_ADMIN') {
      await query(
        `INSERT INTO school_admin_profiles (id, user_id, school_name, school_code, designation) VALUES (?, ?, ?, ?, ?)`,
        [profileId, userId, schoolName || 'Vedhkrit School', schoolCode || null, designation || 'Administrator']
      );
    }

    // Generate 6-Digit OTP (Expires in 10 minutes)
    const otpCode = generateOtp();
    const otpId = cryptoNativeUuid();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await query(
      `INSERT INTO user_otps (id, user_id, otp_code, type, expires_at) VALUES (?, ?, ?, 'REGISTER', ?)`,
      [otpId, userId, otpCode, expiresAt]
    );

    console.log(`🔑 DEV DISPATCH: OTP for ${email} (${formattedRole}): ${otpCode}`);

    return sendSuccess(
      res,
      {
        userId,
        email: email.toLowerCase().trim(),
        role: formattedRole,
        status: 'PENDING_VERIFICATION',
        devOtp: otpCode, // Provided for instant testing during development
      },
      'Registration successful. Verification OTP dispatched.',
      201
    );
  } catch (error) {
    console.error('Registration Error:', error);
    return sendError(res, 'Failed to complete registration.', 500, 'INTERNAL_SERVER_ERROR');
  }
}

/**
 * Register School / Educational Institution
 */
export async function registerSchool(req, res) {
  try {
    const {
      schoolName,
      board = 'CBSE',
      studentStrength = '500-1000',
      city,
      state,
      contactName,
      designation = 'Principal',
      email,
      phone,
      password,
      interests = [],
    } = req.body;

    if (!schoolName || !email || !password || !contactName) {
      return sendError(res, 'School Name, Contact Name, Email, and Password are required.', 400, 'VALIDATION_ERROR');
    }

    // Check existing email
    const existingUser = await query('SELECT id FROM users WHERE email = ?', [email.toLowerCase().trim()]);
    if (existingUser.length > 0) {
      return sendError(res, 'This email address is already registered.', 409, 'AUTH_001');
    }

    // Hash Password
    const passwordHash = await bcrypt.hash(password, 10);
    const userId = cryptoNativeUuid();

    // Insert User with SCHOOL_ADMIN role
    await query(
      `INSERT INTO users (id, name, email, phone_number, password_hash, role, status) VALUES (?, ?, ?, ?, ?, 'SCHOOL_ADMIN', 'PENDING_VERIFICATION')`,
      [userId, contactName.trim(), email.toLowerCase().trim(), phone ? phone.trim() : null, passwordHash]
    );

    // Insert School Admin Profile with extended fields
    const profileId = cryptoNativeUuid();
    const interestsJson = Array.isArray(interests) ? JSON.stringify(interests) : JSON.stringify([interests]);

    try {
      await query(
        `INSERT INTO school_admin_profiles (id, user_id, school_name, designation, city, state, board, student_strength, interests) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [profileId, userId, schoolName.trim(), designation, city || null, state || null, board, studentStrength, interestsJson]
      );
    } catch (err) {
      // Fallback if extended schema columns not yet migrated
      await query(
        `INSERT INTO school_admin_profiles (id, user_id, school_name, designation) VALUES (?, ?, ?, ?)`,
        [profileId, userId, schoolName.trim(), designation]
      );
    }

    // Generate 6-Digit OTP
    const otpCode = generateOtp();
    const otpId = cryptoNativeUuid();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await query(
      `INSERT INTO user_otps (id, user_id, otp_code, type, expires_at) VALUES (?, ?, ?, 'REGISTER', ?)`,
      [otpId, userId, otpCode, expiresAt]
    );

    console.log(`🔑 DEV DISPATCH: OTP for School Admin (${email}): ${otpCode}`);

    return sendSuccess(
      res,
      {
        userId,
        email: email.toLowerCase().trim(),
        role: 'SCHOOL_ADMIN',
        status: 'PENDING_VERIFICATION',
        devOtp: otpCode,
      },
      'School partnership application registered successfully. Verification OTP dispatched.',
      201
    );
  } catch (error) {
    console.error('School Registration Error:', error);
    return sendError(res, 'Failed to register school application.', 500, 'INTERNAL_SERVER_ERROR');
  }
}

/**
 * Register / Apply as Certified Mentor
 */
export async function registerMentor(req, res) {
  try {
    const {
      fullName,
      email,
      phone,
      city,
      linkedin,
      domain = 'STEM & Technology',
      qualification = "Master's Degree",
      experience = '3-5 years',
      organization,
      availability = '3-5 hours / week',
      targetGrades = [],
      bio,
      password,
    } = req.body;

    const mentorName = fullName || req.body.name;
    const mentorPhone = phone || req.body.phoneNumber;

    if (!mentorName || !email || !password) {
      return sendError(res, 'Full Name, Email, and Password are required.', 400, 'VALIDATION_ERROR');
    }

    // Check existing email
    const existingUser = await query('SELECT id FROM users WHERE email = ?', [email.toLowerCase().trim()]);
    if (existingUser.length > 0) {
      return sendError(res, 'This email address is already registered.', 409, 'AUTH_001');
    }

    // Hash Password
    const passwordHash = await bcrypt.hash(password, 10);
    const userId = cryptoNativeUuid();

    // Insert User with MENTOR role
    await query(
      `INSERT INTO users (id, name, email, phone_number, password_hash, role, status) VALUES (?, ?, ?, ?, ?, 'MENTOR', 'PENDING_VERIFICATION')`,
      [userId, mentorName.trim(), email.toLowerCase().trim(), mentorPhone ? mentorPhone.trim() : null, passwordHash]
    );

    // Insert Mentor Profile with extended fields
    const profileId = cryptoNativeUuid();
    const gradesJson = Array.isArray(targetGrades) ? JSON.stringify(targetGrades) : JSON.stringify([targetGrades]);

    try {
      await query(
        `INSERT INTO mentor_profiles (id, user_id, bio, expertise, qualification, experience, organization, availability, target_grades, linkedin_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [profileId, userId, bio || null, domain, qualification, experience, organization || null, availability, gradesJson, linkedin || null]
      );
    } catch (err) {
      // Fallback if extended schema columns not yet migrated
      await query(
        `INSERT INTO mentor_profiles (id, user_id, bio, expertise) VALUES (?, ?, ?, ?)`,
        [profileId, userId, bio || null, domain]
      );
    }

    // Generate 6-Digit OTP
    const otpCode = generateOtp();
    const otpId = cryptoNativeUuid();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await query(
      `INSERT INTO user_otps (id, user_id, otp_code, type, expires_at) VALUES (?, ?, ?, 'REGISTER', ?)`,
      [otpId, userId, otpCode, expiresAt]
    );

    console.log(`🔑 DEV DISPATCH: OTP for Mentor (${email}): ${otpCode}`);

    return sendSuccess(
      res,
      {
        userId,
        email: email.toLowerCase().trim(),
        role: 'MENTOR',
        status: 'PENDING_VERIFICATION',
        devOtp: otpCode,
      },
      'Mentor application registered successfully. Verification OTP dispatched.',
      201
    );
  } catch (error) {
    console.error('Mentor Application Error:', error);
    return sendError(res, 'Failed to register mentor application.', 500, 'INTERNAL_SERVER_ERROR');
  }
}

/**
 * Verify OTP Code
 */
export async function verifyOtp(req, res) {
  try {
    const { userId, email, otpCode } = req.body;

    if (!otpCode || (!userId && !email)) {
      return sendError(res, 'OTP code and user identification (userId or email) are required.', 400, 'VALIDATION_ERROR');
    }

    // Find User
    let userRows;
    if (userId) {
      userRows = await query('SELECT * FROM users WHERE id = ?', [userId]);
    } else {
      userRows = await query('SELECT * FROM users WHERE email = ?', [email.toLowerCase().trim()]);
    }

    if (userRows.length === 0) {
      return sendError(res, 'User not found.', 404, 'AUTH_006');
    }

    const user = userRows[0];

    // Find OTP Record
    const otpRows = await query(
      `SELECT * FROM user_otps WHERE user_id = ? AND otp_code = ? AND is_used = 0 AND expires_at > NOW() ORDER BY created_at DESC LIMIT 1`,
      [user.id, otpCode.trim()]
    );

    if (otpRows.length === 0) {
      return sendError(res, 'Invalid or expired OTP code.', 400, 'AUTH_008');
    }

    const otpRecord = otpRows[0];

    // Mark OTP as used
    await query('UPDATE user_otps SET is_used = 1 WHERE id = ?', [otpRecord.id]);

    // Activate User Status
    await query("UPDATE users SET status = 'ACTIVE' WHERE id = ?", [user.id]);

    // Generate JWT Tokens
    const payload = { id: user.id, email: user.email, role: user.role };
    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET, { expiresIn: '7d' });

    // Store Session
    const sessionId = cryptoNativeUuid();
    const sessionExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await query(
      `INSERT INTO sessions (id, user_id, refresh_token, expires_at) VALUES (?, ?, ?, ?)`,
      [sessionId, user.id, refreshToken, sessionExpiresAt]
    );

    return sendSuccess(
      res,
      {
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          status: 'ACTIVE',
        },
      },
      'OTP verified successfully. Account is now active.'
    );
  } catch (error) {
    console.error('OTP Verification Error:', error);
    return sendError(res, 'Failed to verify OTP code.', 500, 'INTERNAL_SERVER_ERROR');
  }
}

/**
 * User Login
 */
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(res, 'Email and password are required.', 400, 'VALIDATION_ERROR');
    }

    // Find User
    const userRows = await query('SELECT * FROM users WHERE email = ? AND deleted_at IS NULL', [email.toLowerCase().trim()]);
    if (userRows.length === 0) {
      return sendError(res, 'Incorrect email or password.', 401, 'AUTH_003');
    }

    const user = userRows[0];

    if (user.status === 'SUSPENDED') {
      return sendError(res, 'Your account has been suspended. Please contact support.', 403, 'AUTH_004');
    }

    // Compare Password Hash
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return sendError(res, 'Incorrect email or password.', 401, 'AUTH_003');
    }

    // Generate Tokens
    const payload = { id: user.id, email: user.email, role: user.role };
    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET, { expiresIn: '7d' });

    // Store Session
    const sessionId = cryptoNativeUuid();
    const sessionExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await query(
      `INSERT INTO sessions (id, user_id, refresh_token, expires_at) VALUES (?, ?, ?, ?)`,
      [sessionId, user.id, refreshToken, sessionExpiresAt]
    );

    return sendSuccess(
      res,
      {
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phoneNumber: user.phone_number,
          role: user.role,
          status: user.status,
        },
      },
      'Log in successful.'
    );
  } catch (error) {
    console.error('Login Error:', error);
    return sendError(res, 'Failed to authenticate user.', 500, 'INTERNAL_SERVER_ERROR');
  }
}

/**
 * Get Authenticated User Details (/api/v1/auth/me)
 */
export async function me(req, res) {
  try {
    const userRows = await query('SELECT id, name, email, phone_number, role, status, created_at FROM users WHERE id = ?', [req.user.id]);
    if (userRows.length === 0) {
      return sendError(res, 'User profile not found.', 404, 'AUTH_006');
    }

    const user = userRows[0];

    // Fetch Role Profile
    let profile = null;
    if (user.role === 'STUDENT') {
      const p = await query('SELECT * FROM student_profiles WHERE user_id = ?', [user.id]);
      if (p.length > 0) profile = p[0];
    } else if (user.role === 'PARENT') {
      const p = await query('SELECT * FROM parent_profiles WHERE user_id = ?', [user.id]);
      if (p.length > 0) profile = p[0];
    } else if (user.role === 'TEACHER') {
      const p = await query('SELECT * FROM teacher_profiles WHERE user_id = ?', [user.id]);
      if (p.length > 0) profile = p[0];
    } else if (user.role === 'MENTOR') {
      const p = await query('SELECT * FROM mentor_profiles WHERE user_id = ?', [user.id]);
      if (p.length > 0) profile = p[0];
    } else if (user.role === 'SCHOOL_ADMIN') {
      const p = await query('SELECT * FROM school_admin_profiles WHERE user_id = ?', [user.id]);
      if (p.length > 0) profile = p[0];
    }

    return sendSuccess(res, {
      ...user,
      profile,
    });
  } catch (error) {
    console.error('Me Profile Error:', error);
    return sendError(res, 'Failed to fetch user profile.', 500, 'INTERNAL_SERVER_ERROR');
  }
}

/**
 * Refresh Access Token Rotation
 */
export async function refreshToken(req, res) {
  try {
    const { refreshToken: token } = req.body;
    if (!token) {
      return sendError(res, 'Refresh token missing.', 401, 'AUTH_005');
    }

    // Verify Refresh Token
    let decoded;
    try {
      decoded = jwt.verify(token, REFRESH_SECRET);
    } catch (e) {
      return sendError(res, 'Invalid or expired refresh token.', 401, 'AUTH_005');
    }

    // Check Session record
    const sessionRows = await query('SELECT * FROM sessions WHERE refresh_token = ? AND expires_at > NOW()', [token]);
    if (sessionRows.length === 0) {
      return sendError(res, 'Session terminated or invalid.', 401, 'AUTH_005');
    }

    // Generate new Access & Refresh tokens
    const payload = { id: decoded.id, email: decoded.email, role: decoded.role };
    const newAccessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });
    const newRefreshToken = jwt.sign(payload, REFRESH_SECRET, { expiresIn: '7d' });

    // Update Session
    const sessionExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await query('UPDATE sessions SET refresh_token = ?, expires_at = ? WHERE id = ?', [
      newRefreshToken,
      sessionExpiresAt,
      sessionRows[0].id,
    ]);

    return sendSuccess(res, {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    console.error('Refresh Token Error:', error);
    return sendError(res, 'Failed to refresh token.', 500, 'INTERNAL_SERVER_ERROR');
  }
}

/**
 * Request Password Reset OTP
 */
export async function forgotPassword(req, res) {
  try {
    const { email } = req.body;
    if (!email) {
      return sendError(res, 'Email address is required.', 400, 'VALIDATION_ERROR');
    }

    const userRows = await query('SELECT id FROM users WHERE email = ? AND deleted_at IS NULL', [email.toLowerCase().trim()]);
    if (userRows.length === 0) {
      // Return positive message to prevent user enumeration
      return sendSuccess(res, null, 'If that email is registered, a password reset OTP has been sent.');
    }

    const user = userRows[0];
    const otpCode = generateOtp();
    const otpId = cryptoNativeUuid();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await query(
      `INSERT INTO user_otps (id, user_id, otp_code, type, expires_at) VALUES (?, ?, ?, 'FORGOT_PASSWORD', ?)`,
      [otpId, user.id, otpCode, expiresAt]
    );

    console.log(`🔑 DEV DISPATCH: Password Reset OTP for ${email}: ${otpCode}`);

    return sendSuccess(res, { devOtp: otpCode }, 'Password reset OTP dispatched.');
  } catch (error) {
    console.error('Forgot Password Error:', error);
    return sendError(res, 'Failed to initiate password reset.', 500, 'INTERNAL_SERVER_ERROR');
  }
}

/**
 * Reset Password with Verified OTP
 */
export async function resetPassword(req, res) {
  try {
    const { email, otpCode, newPassword } = req.body;

    if (!email || !otpCode || !newPassword) {
      return sendError(res, 'Email, OTP code, and new password are required.', 400, 'VALIDATION_ERROR');
    }

    const userRows = await query('SELECT id FROM users WHERE email = ? AND deleted_at IS NULL', [email.toLowerCase().trim()]);
    if (userRows.length === 0) {
      return sendError(res, 'User not found.', 404, 'AUTH_006');
    }

    const user = userRows[0];

    // Find OTP
    const otpRows = await query(
      `SELECT * FROM user_otps WHERE user_id = ? AND otp_code = ? AND type = 'FORGOT_PASSWORD' AND is_used = 0 AND expires_at > NOW() ORDER BY created_at DESC LIMIT 1`,
      [user.id, otpCode.trim()]
    );

    if (otpRows.length === 0) {
      return sendError(res, 'Invalid or expired OTP code.', 400, 'AUTH_008');
    }

    // Mark OTP used
    await query('UPDATE user_otps SET is_used = 1 WHERE id = ?', [otpRows[0].id]);

    // Update password
    const newHash = await bcrypt.hash(newPassword, 10);
    await query('UPDATE users SET password_hash = ? WHERE id = ?', [newHash, user.id]);

    // Revoke old sessions
    await query('DELETE FROM sessions WHERE user_id = ?', [user.id]);

    return sendSuccess(res, null, 'Password reset successful. Please log in with your new password.');
  } catch (error) {
    console.error('Reset Password Error:', error);
    return sendError(res, 'Failed to reset password.', 500, 'INTERNAL_SERVER_ERROR');
  }
}

/**
 * Update User Profile (/api/v1/auth/profile)
 */
export async function updateProfile(req, res) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return sendError(res, 'User authentication required.', 401, 'AUTH_REQUIRED');
    }

    const {
      name,
      phone,
      phoneNumber,
      schoolName,
      board,
      grade,
      className,
      section,
      rollNumber,
      admissionNumber,
      fatherName,
      motherName,
      guardianName,
      parentPhone,
      parentEmail,
      emergencyPhone,
      academicYear,
      house,
      busRoute,
      subjectExpertise,
      bio,
    } = req.body;

    const updatedPhone = phone || phoneNumber;
    const updatedGrade = grade || className;

    // Update users table
    if (name || updatedPhone) {
      await query(
        `UPDATE users SET name = COALESCE(?, name), phone_number = COALESCE(?, phone_number) WHERE id = ?`,
        [name ? name.trim() : null, updatedPhone ? updatedPhone.trim() : null, userId]
      );
    }

    // Update role profile if provided
    const userRole = req.user.role;
    if (userRole === 'STUDENT') {
      const existingProfile = await query('SELECT id FROM student_profiles WHERE user_id = ?', [userId]);
      if (existingProfile.length > 0) {
        await query(
          `UPDATE student_profiles SET
            school_name = COALESCE(?, school_name),
            board = COALESCE(?, board),
            grade = COALESCE(?, grade),
            section = COALESCE(?, section),
            roll_number = COALESCE(?, roll_number),
            admission_number = COALESCE(?, admission_number),
            father_name = COALESCE(?, father_name),
            mother_name = COALESCE(?, mother_name),
            guardian_name = COALESCE(?, guardian_name),
            parent_phone = COALESCE(?, parent_phone),
            parent_email = COALESCE(?, parent_email),
            emergency_phone = COALESCE(?, emergency_phone),
            academic_year = COALESCE(?, academic_year),
            house = COALESCE(?, house),
            bus_route = COALESCE(?, bus_route)
           WHERE user_id = ?`,
          [
            schoolName || null,
            board || null,
            updatedGrade || null,
            section || null,
            rollNumber || null,
            admissionNumber || null,
            fatherName || null,
            motherName || null,
            guardianName || null,
            parentPhone || null,
            parentEmail || null,
            emergencyPhone || null,
            academicYear || null,
            house || null,
            busRoute || null,
            userId,
          ]
        );
      } else {
        const profileId = cryptoNativeUuid();
        await query(
          `INSERT INTO student_profiles
           (id, user_id, school_name, board, grade, section, roll_number, admission_number, father_name, mother_name, guardian_name, parent_phone, parent_email, emergency_phone, academic_year, house, bus_route)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            profileId,
            userId,
            schoolName || null,
            board || null,
            updatedGrade || null,
            section || null,
            rollNumber || null,
            admissionNumber || null,
            fatherName || null,
            motherName || null,
            guardianName || null,
            parentPhone || null,
            parentEmail || null,
            emergencyPhone || null,
            academicYear || '2026 - 2027',
            house || null,
            busRoute || null,
          ]
        );
      }
    } else if (userRole === 'TEACHER') {
      await query(
        `UPDATE teacher_profiles SET school_name = COALESCE(?, school_name), subject_expertise = COALESCE(?, subject_expertise) WHERE user_id = ?`,
        [schoolName || null, subjectExpertise || null, userId]
      );
    } else if (userRole === 'MENTOR') {
      await query(
        `UPDATE mentor_profiles SET bio = COALESCE(?, bio), expertise = COALESCE(?, expertise) WHERE user_id = ?`,
        [bio || null, subjectExpertise || null, userId]
      );
    }

    return sendSuccess(res, { userId }, 'Profile updated successfully.');
  } catch (error) {
    console.error('Update Profile Error:', error);
    return sendError(res, 'Failed to update profile.', 500, 'INTERNAL_SERVER_ERROR');
  }
}

/**
 * Complete Onboarding (/api/v1/auth/onboarding)
 * Saves user role, grade level, learning goals, or linked student account info
 */
export async function completeOnboarding(req, res) {
  try {
    const { userId, role, gradeLevel, learningGoal, childMobileOrEmail } = req.body;
    const targetUserId = userId || req.user?.id;

    if (!targetUserId) {
      return sendError(res, 'User ID is required for onboarding.', 400, 'VALIDATION_ERROR');
    }

    const formattedRole = (role || 'STUDENT').toUpperCase();

    // 1. Verify user exists in users table
    const userCheck = await query('SELECT id FROM users WHERE id = ?', [targetUserId]);
    if (userCheck.length > 0) {
      await query('UPDATE users SET role = ? WHERE id = ?', [formattedRole, targetUserId]);
    }

    // 2. Insert or Update Profile based on role
    if (formattedRole === 'STUDENT') {
      const existingProfile = await query('SELECT id FROM student_profiles WHERE user_id = ?', [targetUserId]);
      if (existingProfile.length > 0) {
        await query(
          'UPDATE student_profiles SET grade = ? WHERE user_id = ?',
          [gradeLevel || null, targetUserId]
        );
      } else if (userCheck.length > 0) {
        const profileId = cryptoNativeUuid();
        await query(
          'INSERT INTO student_profiles (id, user_id, grade) VALUES (?, ?, ?)',
          [profileId, targetUserId, gradeLevel || null]
        );
      }
    } else if (formattedRole === 'PARENT') {
      const existingProfile = await query('SELECT id FROM parent_profiles WHERE user_id = ?', [targetUserId]);
      if (existingProfile.length > 0) {
        await query(
          'UPDATE parent_profiles SET student_phone = ? WHERE user_id = ?',
          [childMobileOrEmail || null, targetUserId]
        );
      } else if (userCheck.length > 0) {
        const profileId = cryptoNativeUuid();
        await query(
          'INSERT INTO parent_profiles (id, user_id, student_phone) VALUES (?, ?, ?)',
          [profileId, targetUserId, childMobileOrEmail || null]
        );
      }
    }

    return sendSuccess(res, { userId: targetUserId, role: formattedRole }, 'Onboarding preferences saved successfully.');
  } catch (error) {
    console.error('Complete Onboarding Error:', error);
    return sendError(res, 'Failed to save onboarding preferences.', 500, 'INTERNAL_SERVER_ERROR');
  }
}



