// packages/database/prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

// Passwords are hashed at seed time from env vars so no real credential is
// committed. Set these in any environment reachable from the internet.
const DEMO_PASSWORD = process.env.SEED_DEMO_PASSWORD || 'password123';
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD || DEMO_PASSWORD;

// A remote database is anything not on this machine — including a hosted DB you
// seed from a laptop, where NODE_ENV says nothing useful. Keying the guard off the
// target rather than NODE_ENV is what stops a public database from silently getting
// the well-known default password.
function targetsRemoteDatabase() {
  const url = process.env.DATABASE_URL || '';
  const host = (url.match(/@([^/:?]+)/) || [])[1] || '';
  return host !== '' && !['localhost', '127.0.0.1', '::1', 'postgres', 'db'].includes(host);
}

async function main() {
  console.log('🌱 Starting database seeding...');

  if (targetsRemoteDatabase() && !process.env.SEED_ADMIN_PASSWORD) {
    throw new Error(
      'Refusing to seed a remote database without SEED_ADMIN_PASSWORD.\n' +
        'Without it the ADMIN/SUPERADMIN accounts get the well-known default password.\n' +
        "Re-run with: SEED_DEMO_PASSWORD='...' SEED_ADMIN_PASSWORD='...' npm run db:seed --workspace=@vedhkrit/database",
    );
  }

  const demoHash = await bcrypt.hash(DEMO_PASSWORD, 12);
  const adminHash = await bcrypt.hash(ADMIN_PASSWORD, 12);

  // 1. Clear existing data in correct dependency order
  console.log('🧹 Clearing old tables...');
  await prisma.studentAnswer.deleteMany();
  await prisma.question.deleteMany();
  await prisma.questionBank.deleteMany();
  await prisma.consentRecord.deleteMany();
  await prisma.academicRecord.deleteMany();
  await prisma.mentorSession.deleteMany();
  await prisma.badge.deleteMany();
  await prisma.goal.deleteMany();
  await prisma.assessmentResult.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.contactQuery.deleteMany();
  await prisma.cmsSection.deleteMany();
  await prisma.cmsPage.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.studentProfile.deleteMany();
  await prisma.parentProfile.deleteMany();
  await prisma.mentorProfile.deleteMany();
  await prisma.schoolProfile.deleteMany();
  await prisma.teacherProfile.deleteMany();
  await prisma.session.deleteMany();
  await prisma.oTP.deleteMany();
  await prisma.userRole.deleteMany();
  await prisma.rolePermission.deleteMany();
  await prisma.role.deleteMany();
  await prisma.permission.deleteMany();
  await prisma.membership.deleteMany();
  await prisma.pricingPlan.deleteMany();
  await prisma.user.deleteMany();

  // 2. Create Pricing Plans
  console.log('💳 Creating pricing plans...');
  const planStarter = await prisma.pricingPlan.create({
    data: {
      name: 'Starter',
      priceINR: 999.00,
      billingCycle: 'ANNUALLY',
      features: ['Cognitive Diagnostics', 'Basic Study Guide', '1 General Mentor Session'],
      isActive: true,
    },
  });

  const planGrowth = await prisma.pricingPlan.create({
    data: {
      name: 'Growth',
      priceINR: 2499.00,
      billingCycle: 'ANNUALLY',
      features: ['All Diagnostics', 'Short-Term goals tracking', 'Unlimited Mentor webinars', 'Digital CV Builder'],
      isActive: true,
    },
  });

  const planEnterprise = await prisma.pricingPlan.create({
    data: {
      name: 'Enterprise',
      priceINR: 4999.00,
      billingCycle: 'ANNUALLY',
      features: ['All Features', 'Custom Study Track', 'Weekly 1-on-1 Mentorship', 'Priority Center access'],
      isActive: true,
    },
  });

  // 3. Create a Membership
  const membership = await prisma.membership.create({
    data: {
      planId: planGrowth.id,
      status: 'ACTIVE',
      startedAt: new Date(),
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
    },
  });

  // 4. Create Users & Profiles
  console.log('👤 Creating users and profiles...');

  // Student User: Yash Rajole
  const userStudent = await prisma.user.create({
    data: {
      email: 'student@vedhkrit.com',
      phoneNumber: '9876543210',
      name: 'Yash Rajole',
      passwordHash: demoHash,
      role: 'STUDENT',
      status: 'ACTIVE',
    },
  });

  const parentUser = await prisma.user.create({
    data: {
      email: 'parent@vedhkrit.com',
      phoneNumber: '9876543211',
      name: 'Priya Sharma',
      passwordHash: demoHash,
      role: 'PARENT',
      status: 'ACTIVE',
    },
  });

  const parentProfile = await prisma.parentProfile.create({
    data: {
      userId: parentUser.id,
    },
  });

  const studentProfile = await prisma.studentProfile.create({
    data: {
      id: 'student-123', // hardcoded to match client-side queries
      userId: userStudent.id,
      grade: '10th Grade',
      schoolName: 'DPS Bangalore',
      parentLinkId: parentProfile.id,
      membershipId: membership.id,
    },
  });

  // Mentor User: Neha Mehta
  const userMentor = await prisma.user.create({
    data: {
      email: 'mentor@vedhkrit.com',
      phoneNumber: '9876543212',
      name: 'Neha Mehta',
      passwordHash: demoHash,
      role: 'MENTOR',
      status: 'ACTIVE',
    },
  });

  const mentorProfile = await prisma.mentorProfile.create({
    data: {
      userId: userMentor.id,
      expertise: ['Career Guidance', 'Aptitude Analysis', 'PCM Track Planning'],
      approvalStatus: 'APPROVED',
      approvedAt: new Date(),
    },
  });

  // School Admin User: DPS Bangalore
  const userSchool = await prisma.user.create({
    data: {
      email: 'school@vedhkrit.com',
      phoneNumber: '9876543213',
      name: 'DPS Bangalore Admin',
      passwordHash: demoHash,
      role: 'SCHOOL_ADMIN',
      status: 'ACTIVE',
    },
  });

  await prisma.schoolProfile.create({
    data: {
      userId: userSchool.id,
      board: 'CBSE',
      address: 'DPS North campus, Yelahanka, Bangalore',
      approvalStatus: 'APPROVED',
      approvedAt: new Date(),
    },
  });

  // Teacher User: Sunita Rao
  const userTeacher = await prisma.user.create({
    data: {
      email: 'teacher@vedhkrit.com',
      phoneNumber: '9876543214',
      name: 'Sunita Rao',
      passwordHash: demoHash,
      role: 'TEACHER',
      status: 'ACTIVE',
    },
  });

  await prisma.teacherProfile.create({
    data: {
      userId: userTeacher.id,
      subjects: ['Mathematics', 'Computer Science'],
      approvalStatus: 'APPROVED',
      approvedAt: new Date(),
    },
  });

  // Admin User: Ops Console
  await prisma.user.create({
    data: {
      email: 'admin@vedhkrit.com',
      phoneNumber: '9876543215',
      name: 'Vedhkrit Ops Admin',
      passwordHash: adminHash,
      role: 'ADMIN',
      status: 'ACTIVE',
    },
  });

  // SuperAdmin User: Platform Owner
  await prisma.user.create({
    data: {
      email: 'super@vedhkrit.com',
      phoneNumber: '9876543216',
      name: 'Vedhkrit Super Admin',
      passwordHash: adminHash,
      role: 'SUPERADMIN',
      status: 'ACTIVE',
    },
  });

  // 5. Create Consent Records (Compliance)
  console.log('🔒 Creating consent records...');
  await prisma.consentRecord.createMany({
    data: [
      { studentId: studentProfile.id, type: 'AUDIO_RECORDING', granted: true },
      { studentId: studentProfile.id, type: 'VIDEO_TELEMETRY', granted: true },
      { studentId: studentProfile.id, type: 'EYE_GAZE_TRACKING', granted: false },
    ],
  });

  // 6. Create Student Assessment Results
  console.log('📊 Creating assessment results...');
  await prisma.assessmentResult.create({
    data: {
      studentId: studentProfile.id,
      title: 'Cognitive Aptitude Diagnostic',
      overallScore: 82.0,
      dimensions: {
        Academic: 88,
        Communication: 82,
        Consistency: 78,
        Innovation: 85,
        Leadership: 80,
      },
      status: 'COMPLETED',
    },
  });

  // 7. Create Student Goals
  console.log('🎯 Creating goals...');
  await prisma.goal.createMany({
    data: [
      { studentId: studentProfile.id, title: 'Math Practice', description: 'Solve 20 quadratic equations', progress: 0, status: 'ON_TRACK' },
      { studentId: studentProfile.id, title: 'Science Assignment', description: 'Read chapter 5 (Electricity)', progress: 0, status: 'ON_TRACK' },
      { studentId: studentProfile.id, title: 'English Reading', description: 'Read 15 minutes of non-fiction', progress: 0, status: 'ON_TRACK' },
      { studentId: studentProfile.id, title: 'Growth Studio Activity', description: 'Logical Thinking Lab task', progress: 100, status: 'COMPLETED' },
    ],
  });

  // 8. Create Badges
  console.log('🏅 Creating badges...');
  await prisma.badge.createMany({
    data: [
      { studentId: studentProfile.id, title: 'Visual Learner', imageUrl: '/assets/badges/visual-learner.png' },
      { studentId: studentProfile.id, title: 'Consistency Champ', imageUrl: '/assets/badges/consistency.png' },
    ],
  });

  // 9. Create Mentor Sessions
  console.log('📅 Creating mentor sessions...');
  await prisma.mentorSession.create({
    data: {
      studentId: studentProfile.id,
      mentorId: mentorProfile.id,
      topic: 'Career Pathways (PCM vs Arts)',
      scheduledAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // In 2 days
      status: 'SCHEDULED',
      notes: 'Please review the aptitude results beforehand.',
    },
  });

  // 10. Create Academic Records
  console.log('📚 Creating academic records...');
  await prisma.academicRecord.createMany({
    data: [
      { studentId: studentProfile.id, subject: 'Mathematics', score: 88.0, grade: 'A', year: 2026, term: 'Quarter 1' },
      { studentId: studentProfile.id, subject: 'Science', score: 85.0, grade: 'A', year: 2026, term: 'Quarter 1' },
      { studentId: studentProfile.id, subject: 'English', score: 92.0, grade: 'A+', year: 2026, term: 'Quarter 1' },
    ],
  });

  // 11. Create Question Banks & Questions
  console.log('📝 Creating question banks and answers...');
  const qb = await prisma.questionBank.create({
    data: {
      title: 'Mathematics Level 1',
      description: 'Algebra and equations diagnostic test',
    },
  });

  const question = await prisma.question.create({
    data: {
      bankId: qb.id,
      text: 'What is the sum of angles in a triangle?',
      options: ['90 degrees', '180 degrees', '270 degrees', '360 degrees'],
      correctAnswer: '180 degrees',
      difficulty: 'EASY',
    },
  });

  await prisma.studentAnswer.create({
    data: {
      studentId: studentProfile.id,
      questionId: question.id,
      selectedAnswer: '180 degrees',
      isCorrect: true,
    },
  });

  // 12. Create CMS Pages & Sections
  console.log('🖥️ Seeding CMS contents...');
  const pageHome = await prisma.cmsPage.create({
    data: {
      slug: 'homepage',
      title: 'Vedhkrit Platform Homepage',
      metaTitle: 'Vedhkrit - AI Student Counselors & SLEC Labs',
      metaDesc: 'A premium platform mapping learner DNA to future careers.',
    },
  });

  await prisma.cmsSection.create({
    data: {
      pageId: pageHome.id,
      sectionName: 'hero',
      layoutIndex: 0,
      title: 'From Potential to Purpose',
      subtitle: 'Discover, Align & Prepare for Future Careers',
      desc: 'An integrated learner development platform combining AI-powered diagnostics, expert human mentoring, and physical Centre of Excellence laboratories.',
      ctaLabel: 'Begin Exploration',
      ctaLink: '/assessment',
      cards: { badge: 'AI-Powered Counseling Platform' },
    },
  });

  await prisma.cmsSection.create({
    data: {
      pageId: pageHome.id,
      sectionName: 'journey',
      layoutIndex: 1,
      title: 'The 7-Step Development Journey',
      subtitle: 'Maturity phases to chart career readiness',
      desc: 'Our sequential roadmap guides students through self-awareness and aptitude mapping, ensuring stream selection matches capabilities.',
      ctaLabel: 'Explore Path',
      ctaLink: '/framework',
      cards: { badge: 'Structure Program' },
    },
  });

  const pageAbout = await prisma.cmsPage.create({
    data: {
      slug: 'about',
      title: 'About Vedhkrit',
      metaTitle: 'Why Vedhkrit - Our Philosophy',
      metaDesc: 'Bridging the gap between theoretical classroom learning and practical execution.',
    },
  });

  await prisma.cmsSection.create({
    data: {
      pageId: pageAbout.id,
      sectionName: 'hero',
      layoutIndex: 0,
      title: 'Empowering Next-Gen Minds',
      subtitle: 'Why Vedhkrit Exists',
      desc: 'We bridge the gap between classroom theory and real-world execution through diagnostic insights and structured physical lab environments.',
      ctaLabel: 'Read Our Story',
      ctaLink: '/about',
      cards: { badge: 'Our Philosophy' },
    },
  });

  console.log('✅ Database seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
