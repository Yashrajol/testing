
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.TeacherProfileScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  firstName: 'firstName',
  middleName: 'middleName',
  lastName: 'lastName',
  gender: 'gender',
  dateOfBirth: 'dateOfBirth',
  profilePhoto: 'profilePhoto',
  address: 'address',
  emergencyContact: 'emergencyContact',
  bloodGroup: 'bloodGroup',
  nationality: 'nationality',
  language: 'language',
  timezone: 'timezone',
  metadata: 'metadata',
  employeeCode: 'employeeCode',
  designation: 'designation',
  specialization: 'specialization',
  subjects: 'subjects',
  approvalStatus: 'approvalStatus',
  approvedAt: 'approvedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.AcademicRecordScalarFieldEnum = {
  id: 'id',
  studentId: 'studentId',
  subject: 'subject',
  grade: 'grade',
  score: 'score',
  term: 'term',
  year: 'year',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SubjectScalarFieldEnum = {
  id: 'id',
  code: 'code',
  name: 'name',
  description: 'description',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.CourseScalarFieldEnum = {
  id: 'id',
  subjectId: 'subjectId',
  title: 'title',
  code: 'code',
  description: 'description',
  version: 'version',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.CurriculumScalarFieldEnum = {
  id: 'id',
  courseId: 'courseId',
  title: 'title',
  version: 'version',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.ChapterScalarFieldEnum = {
  id: 'id',
  subjectId: 'subjectId',
  curriculumId: 'curriculumId',
  title: 'title',
  sequence: 'sequence',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.TopicScalarFieldEnum = {
  id: 'id',
  chapterId: 'chapterId',
  title: 'title',
  sequence: 'sequence',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.LessonScalarFieldEnum = {
  id: 'id',
  chapterId: 'chapterId',
  topicId: 'topicId',
  title: 'title',
  content: 'content',
  sequence: 'sequence',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.LearningObjectiveScalarFieldEnum = {
  id: 'id',
  lessonId: 'lessonId',
  title: 'title',
  bloomsTaxonomy: 'bloomsTaxonomy',
  difficulty: 'difficulty',
  estimatedMinutes: 'estimatedMinutes',
  skills: 'skills',
  competencies: 'competencies',
  prerequisites: 'prerequisites',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.LearningResourceScalarFieldEnum = {
  id: 'id',
  lessonId: 'lessonId',
  title: 'title',
  type: 'type',
  url: 'url',
  metadata: 'metadata',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.HomeworkScalarFieldEnum = {
  id: 'id',
  batchId: 'batchId',
  title: 'title',
  dueDate: 'dueDate',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.DeadlineExtensionScalarFieldEnum = {
  id: 'id',
  assignmentId: 'assignmentId',
  studentId: 'studentId',
  extendedDueDate: 'extendedDueDate',
  reason: 'reason',
  grantedBy: 'grantedBy',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.AIRequestScalarFieldEnum = {
  id: 'id',
  organizationId: 'organizationId',
  tenantId: 'tenantId',
  provider: 'provider',
  model: 'model',
  promptType: 'promptType',
  inputTokens: 'inputTokens',
  estimatedCost: 'estimatedCost',
  userId: 'userId',
  createdAt: 'createdAt'
};

exports.Prisma.AIResponseScalarFieldEnum = {
  id: 'id',
  requestId: 'requestId',
  organizationId: 'organizationId',
  tenantId: 'tenantId',
  content: 'content',
  outputTokens: 'outputTokens',
  latencyMs: 'latencyMs',
  cost: 'cost',
  cachedHit: 'cachedHit',
  createdAt: 'createdAt'
};

exports.Prisma.StudyPlanScalarFieldEnum = {
  id: 'id',
  organizationId: 'organizationId',
  tenantId: 'tenantId',
  studentId: 'studentId',
  title: 'title',
  planData: 'planData',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.AIRecommendationScalarFieldEnum = {
  id: 'id',
  organizationId: 'organizationId',
  tenantId: 'tenantId',
  targetId: 'targetId',
  targetType: 'targetType',
  title: 'title',
  content: 'content',
  contextData: 'contextData',
  isApplied: 'isApplied',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.RiskAnalysisScalarFieldEnum = {
  id: 'id',
  organizationId: 'organizationId',
  tenantId: 'tenantId',
  studentId: 'studentId',
  riskLevel: 'riskLevel',
  summary: 'summary',
  riskFactors: 'riskFactors',
  interventions: 'interventions',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.CareerAdviceScalarFieldEnum = {
  id: 'id',
  organizationId: 'organizationId',
  tenantId: 'tenantId',
  studentId: 'studentId',
  industry: 'industry',
  recommendedRoles: 'recommendedRoles',
  skillGaps: 'skillGaps',
  adviceText: 'adviceText',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.LearningInsightScalarFieldEnum = {
  id: 'id',
  organizationId: 'organizationId',
  tenantId: 'tenantId',
  studentId: 'studentId',
  focusScore: 'focusScore',
  retentionRate: 'retentionRate',
  velocityIndex: 'velocityIndex',
  insights: 'insights',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.QuestionBankScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  category: 'category',
  subjectId: 'subjectId',
  chapterId: 'chapterId',
  topicId: 'topicId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.QuestionScalarFieldEnum = {
  id: 'id',
  bankId: 'bankId',
  type: 'type',
  text: 'text',
  options: 'options',
  correctAnswer: 'correctAnswer',
  difficulty: 'difficulty',
  bloomsTaxonomy: 'bloomsTaxonomy',
  learningObjectiveId: 'learningObjectiveId',
  estimatedSeconds: 'estimatedSeconds',
  marks: 'marks',
  negativeMarks: 'negativeMarks',
  tags: 'tags',
  hints: 'hints',
  explanation: 'explanation',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.AssessmentScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  type: 'type',
  timeLimitMins: 'timeLimitMins',
  totalMarks: 'totalMarks',
  passPercentage: 'passPercentage',
  startDate: 'startDate',
  endDate: 'endDate',
  instructions: 'instructions',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.AssessmentAttemptScalarFieldEnum = {
  id: 'id',
  assessmentId: 'assessmentId',
  studentId: 'studentId',
  startTime: 'startTime',
  endTime: 'endTime',
  durationSeconds: 'durationSeconds',
  totalScore: 'totalScore',
  percentage: 'percentage',
  status: 'status',
  competencyBreakdown: 'competencyBreakdown',
  questionAnalytics: 'questionAnalytics',
  learningOutcome: 'learningOutcome',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.AnswerScalarFieldEnum = {
  id: 'id',
  attemptId: 'attemptId',
  questionId: 'questionId',
  responseValue: 'responseValue',
  fileUrl: 'fileUrl',
  isCorrect: 'isCorrect',
  marksObtained: 'marksObtained',
  feedback: 'feedback',
  savedAt: 'savedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.RubricScalarFieldEnum = {
  id: 'id',
  assessmentId: 'assessmentId',
  criteriaName: 'criteriaName',
  maxPoints: 'maxPoints',
  description: 'description',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.GradingScalarFieldEnum = {
  id: 'id',
  attemptId: 'attemptId',
  evaluatorId: 'evaluatorId',
  evaluatorType: 'evaluatorType',
  scoreGranted: 'scoreGranted',
  comments: 'comments',
  evaluatedAt: 'evaluatedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.CompetencyScoreScalarFieldEnum = {
  id: 'id',
  attemptId: 'attemptId',
  competencyName: 'competencyName',
  score: 'score',
  maxScore: 'maxScore',
  percentage: 'percentage',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.StudentAnswerScalarFieldEnum = {
  id: 'id',
  studentId: 'studentId',
  questionId: 'questionId',
  selectedAnswer: 'selectedAnswer',
  isCorrect: 'isCorrect',
  answeredAt: 'answeredAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AssessmentResultScalarFieldEnum = {
  id: 'id',
  studentId: 'studentId',
  title: 'title',
  overallScore: 'overallScore',
  dimensions: 'dimensions',
  status: 'status',
  takenAt: 'takenAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AssignmentScalarFieldEnum = {
  id: 'id',
  organizationId: 'organizationId',
  tenantId: 'tenantId',
  title: 'title',
  description: 'description',
  category: 'category',
  status: 'status',
  batchId: 'batchId',
  classId: 'classId',
  subjectId: 'subjectId',
  teacherId: 'teacherId',
  totalPoints: 'totalPoints',
  passingPoints: 'passingPoints',
  gradingType: 'gradingType',
  isGroupAssignment: 'isGroupAssignment',
  maxGroupSize: 'maxGroupSize',
  allowLateSubmission: 'allowLateSubmission',
  latePenaltyPercentPerDay: 'latePenaltyPercentPerDay',
  maxSubmissions: 'maxSubmissions',
  dueDate: 'dueDate',
  publishedAt: 'publishedAt',
  archivedAt: 'archivedAt',
  gitRepoUrl: 'gitRepoUrl',
  metadata: 'metadata',
  createdById: 'createdById',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.SubmissionScalarFieldEnum = {
  id: 'id',
  assignmentId: 'assignmentId',
  studentId: 'studentId',
  attemptNumber: 'attemptNumber',
  richTextContent: 'richTextContent',
  externalUrl: 'externalUrl',
  gitRepositoryUrl: 'gitRepositoryUrl',
  gitCommitHash: 'gitCommitHash',
  status: 'status',
  isLate: 'isLate',
  score: 'score',
  isGraded: 'isGraded',
  gradedAt: 'gradedAt',
  gradedById: 'gradedById',
  metadata: 'metadata',
  submittedAt: 'submittedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.AssignmentRubricScalarFieldEnum = {
  id: 'id',
  assignmentId: 'assignmentId',
  title: 'title',
  description: 'description',
  totalMaxPoints: 'totalMaxPoints',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.RubricCriterionScalarFieldEnum = {
  id: 'id',
  rubricId: 'rubricId',
  title: 'title',
  description: 'description',
  maxPoints: 'maxPoints',
  weightage: 'weightage',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.FeedbackScalarFieldEnum = {
  id: 'id',
  submissionId: 'submissionId',
  authorId: 'authorId',
  authorType: 'authorType',
  comment: 'comment',
  criteriaScores: 'criteriaScores',
  audioFeedbackUrl: 'audioFeedbackUrl',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.AttachmentScalarFieldEnum = {
  id: 'id',
  assignmentId: 'assignmentId',
  submissionId: 'submissionId',
  fileName: 'fileName',
  fileUrl: 'fileUrl',
  fileType: 'fileType',
  fileSizeBytes: 'fileSizeBytes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.AssignmentAnalyticsScalarFieldEnum = {
  id: 'id',
  organizationId: 'organizationId',
  tenantId: 'tenantId',
  assignmentId: 'assignmentId',
  batchId: 'batchId',
  classId: 'classId',
  studentId: 'studentId',
  totalAssigned: 'totalAssigned',
  totalSubmitted: 'totalSubmitted',
  totalGraded: 'totalGraded',
  submissionRate: 'submissionRate',
  completionRate: 'completionRate',
  lateSubmissionRate: 'lateSubmissionRate',
  averageScore: 'averageScore',
  rubricAnalytics: 'rubricAnalytics',
  topicWeaknesses: 'topicWeaknesses',
  lastCalculatedAt: 'lastCalculatedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.AttendanceSessionScalarFieldEnum = {
  id: 'id',
  organizationId: 'organizationId',
  tenantId: 'tenantId',
  type: 'type',
  title: 'title',
  batchId: 'batchId',
  subjectId: 'subjectId',
  classId: 'classId',
  teacherId: 'teacherId',
  date: 'date',
  startTime: 'startTime',
  endTime: 'endTime',
  qrCode: 'qrCode',
  geofenceLat: 'geofenceLat',
  geofenceLng: 'geofenceLng',
  geofenceRadius: 'geofenceRadius',
  status: 'status',
  closedAt: 'closedAt',
  metadata: 'metadata',
  createdById: 'createdById',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.AttendanceRecordScalarFieldEnum = {
  id: 'id',
  sessionId: 'sessionId',
  organizationId: 'organizationId',
  tenantId: 'tenantId',
  studentId: 'studentId',
  teacherId: 'teacherId',
  batchId: 'batchId',
  subjectId: 'subjectId',
  classId: 'classId',
  type: 'type',
  status: 'status',
  mode: 'mode',
  date: 'date',
  markedAt: 'markedAt',
  markedById: 'markedById',
  remarks: 'remarks',
  locationLat: 'locationLat',
  locationLng: 'locationLng',
  deviceInfo: 'deviceInfo',
  biometricHash: 'biometricHash',
  verificationScore: 'verificationScore',
  isCorrected: 'isCorrected',
  correctedById: 'correctedById',
  correctionReason: 'correctionReason',
  metadata: 'metadata',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.LeaveRequestScalarFieldEnum = {
  id: 'id',
  organizationId: 'organizationId',
  tenantId: 'tenantId',
  applicantId: 'applicantId',
  studentId: 'studentId',
  applicantType: 'applicantType',
  leaveType: 'leaveType',
  startDate: 'startDate',
  endDate: 'endDate',
  totalDays: 'totalDays',
  reason: 'reason',
  attachmentUrls: 'attachmentUrls',
  status: 'status',
  approvedById: 'approvedById',
  rejectionReason: 'rejectionReason',
  appliedAt: 'appliedAt',
  reviewedAt: 'reviewedAt',
  metadata: 'metadata',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.HolidayScalarFieldEnum = {
  id: 'id',
  organizationId: 'organizationId',
  tenantId: 'tenantId',
  title: 'title',
  description: 'description',
  date: 'date',
  endDate: 'endDate',
  type: 'type',
  isRecurring: 'isRecurring',
  affectsClasses: 'affectsClasses',
  metadata: 'metadata',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.AttendancePolicyScalarFieldEnum = {
  id: 'id',
  organizationId: 'organizationId',
  tenantId: 'tenantId',
  name: 'name',
  minAttendancePercentage: 'minAttendancePercentage',
  lateThresholdMinutes: 'lateThresholdMinutes',
  halfDayThresholdMinutes: 'halfDayThresholdMinutes',
  autoMarkAbsentAfter: 'autoMarkAbsentAfter',
  allowSelfCheckIn: 'allowSelfCheckIn',
  enableGeofencing: 'enableGeofencing',
  defaultGeofenceRadius: 'defaultGeofenceRadius',
  enableQrCheckIn: 'enableQrCheckIn',
  enableBiometricCheckIn: 'enableBiometricCheckIn',
  metadata: 'metadata',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.AttendanceAnalyticsScalarFieldEnum = {
  id: 'id',
  organizationId: 'organizationId',
  tenantId: 'tenantId',
  studentId: 'studentId',
  teacherId: 'teacherId',
  classId: 'classId',
  batchId: 'batchId',
  subjectId: 'subjectId',
  period: 'period',
  totalDays: 'totalDays',
  presentDays: 'presentDays',
  absentDays: 'absentDays',
  lateDays: 'lateDays',
  halfDays: 'halfDays',
  leaveDays: 'leaveDays',
  attendancePercentage: 'attendancePercentage',
  consecutiveAbsences: 'consecutiveAbsences',
  isDefaulter: 'isDefaulter',
  riskScore: 'riskScore',
  trends: 'trends',
  heatmap: 'heatmap',
  lastCalculatedAt: 'lastCalculatedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  phoneNumber: 'phoneNumber',
  name: 'name',
  passwordHash: 'passwordHash',
  role: 'role',
  status: 'status',
  emailVerified: 'emailVerified',
  phoneVerified: 'phoneVerified',
  lastLoginAt: 'lastLoginAt',
  failedLoginAttempts: 'failedLoginAttempts',
  lockedUntil: 'lockedUntil',
  organizationId: 'organizationId',
  schoolId: 'schoolId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt',
  createdBy: 'createdBy',
  updatedBy: 'updatedBy'
};

exports.Prisma.RoleScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  type: 'type',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.PermissionScalarFieldEnum = {
  id: 'id',
  resource: 'resource',
  action: 'action',
  description: 'description',
  module: 'module',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.UserRoleScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  roleId: 'roleId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.RolePermissionScalarFieldEnum = {
  id: 'id',
  roleId: 'roleId',
  permissionId: 'permissionId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SessionScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  device: 'device',
  browser: 'browser',
  os: 'os',
  ip: 'ip',
  country: 'country',
  expiresAt: 'expiresAt',
  lastActivity: 'lastActivity',
  revoked: 'revoked',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.RefreshTokenScalarFieldEnum = {
  id: 'id',
  tokenHash: 'tokenHash',
  userId: 'userId',
  sessionId: 'sessionId',
  parentTokenHash: 'parentTokenHash',
  isRevoked: 'isRevoked',
  expiresAt: 'expiresAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.OTPScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  codeHash: 'codeHash',
  channel: 'channel',
  purpose: 'purpose',
  target: 'target',
  expiresAt: 'expiresAt',
  verifiedAt: 'verifiedAt',
  attempts: 'attempts',
  maxAttempts: 'maxAttempts',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AuditLogScalarFieldEnum = {
  id: 'id',
  actorId: 'actorId',
  entity: 'entity',
  entityId: 'entityId',
  action: 'action',
  before: 'before',
  after: 'after',
  ip: 'ip',
  userAgent: 'userAgent',
  correlationId: 'correlationId',
  timestamp: 'timestamp'
};

exports.Prisma.StudentProfileScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  firstName: 'firstName',
  middleName: 'middleName',
  lastName: 'lastName',
  gender: 'gender',
  dateOfBirth: 'dateOfBirth',
  profilePhoto: 'profilePhoto',
  address: 'address',
  emergencyContact: 'emergencyContact',
  bloodGroup: 'bloodGroup',
  nationality: 'nationality',
  language: 'language',
  timezone: 'timezone',
  metadata: 'metadata',
  admissionNumber: 'admissionNumber',
  rollNumber: 'rollNumber',
  organizationId: 'organizationId',
  schoolId: 'schoolId',
  grade: 'grade',
  schoolName: 'schoolName',
  parentLinkId: 'parentLinkId',
  membershipId: 'membershipId',
  batchId: 'batchId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.ParentProfileScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  firstName: 'firstName',
  middleName: 'middleName',
  lastName: 'lastName',
  gender: 'gender',
  dateOfBirth: 'dateOfBirth',
  profilePhoto: 'profilePhoto',
  address: 'address',
  emergencyContact: 'emergencyContact',
  bloodGroup: 'bloodGroup',
  nationality: 'nationality',
  language: 'language',
  timezone: 'timezone',
  metadata: 'metadata',
  occupation: 'occupation',
  relationToStudent: 'relationToStudent',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.MentorProfileScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  firstName: 'firstName',
  middleName: 'middleName',
  lastName: 'lastName',
  gender: 'gender',
  dateOfBirth: 'dateOfBirth',
  profilePhoto: 'profilePhoto',
  address: 'address',
  emergencyContact: 'emergencyContact',
  bloodGroup: 'bloodGroup',
  nationality: 'nationality',
  language: 'language',
  timezone: 'timezone',
  metadata: 'metadata',
  expertise: 'expertise',
  yearsOfExperience: 'yearsOfExperience',
  resumeUrl: 'resumeUrl',
  approvalStatus: 'approvalStatus',
  approvedAt: 'approvedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.StaffProfileScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  firstName: 'firstName',
  middleName: 'middleName',
  lastName: 'lastName',
  gender: 'gender',
  dateOfBirth: 'dateOfBirth',
  profilePhoto: 'profilePhoto',
  address: 'address',
  emergencyContact: 'emergencyContact',
  bloodGroup: 'bloodGroup',
  nationality: 'nationality',
  language: 'language',
  timezone: 'timezone',
  metadata: 'metadata',
  department: 'department',
  employeeId: 'employeeId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.LearningDNAScalarFieldEnum = {
  id: 'id',
  studentProfileId: 'studentProfileId',
  softSkillMatrix: 'softSkillMatrix',
  primaryLearningStyle: 'primaryLearningStyle',
  preferredMode: 'preferredMode',
  masteryScore: 'masteryScore',
  growthScore: 'growthScore',
  confidenceScore: 'confidenceScore',
  retentionScore: 'retentionScore',
  riskScore: 'riskScore',
  knowledgeGraph: 'knowledgeGraph',
  skillProfile: 'skillProfile',
  competencyProfile: 'competencyProfile',
  recommendations: 'recommendations',
  lastCalculatedAt: 'lastCalculatedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.VedhkritIndexScalarFieldEnum = {
  id: 'id',
  studentProfileId: 'studentProfileId',
  score: 'score',
  growthRate: 'growthRate',
  readinessLevel: 'readinessLevel',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CareerProfileScalarFieldEnum = {
  id: 'id',
  studentId: 'studentId',
  topMatches: 'topMatches',
  skillRadar: 'skillRadar',
  competencyRadar: 'competencyRadar',
  careerReadiness: 'careerReadiness',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MilestoneScalarFieldEnum = {
  id: 'id',
  studentId: 'studentId',
  title: 'title',
  targetDate: 'targetDate',
  achievedAt: 'achievedAt',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.GoalScalarFieldEnum = {
  id: 'id',
  studentId: 'studentId',
  title: 'title',
  description: 'description',
  targetDate: 'targetDate',
  progress: 'progress',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.BadgeScalarFieldEnum = {
  id: 'id',
  studentId: 'studentId',
  title: 'title',
  imageUrl: 'imageUrl',
  earnedAt: 'earnedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MentorSessionScalarFieldEnum = {
  id: 'id',
  studentId: 'studentId',
  mentorId: 'mentorId',
  topic: 'topic',
  scheduledAt: 'scheduledAt',
  status: 'status',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ConsentRecordScalarFieldEnum = {
  id: 'id',
  studentId: 'studentId',
  type: 'type',
  granted: 'granted',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PricingPlanScalarFieldEnum = {
  id: 'id',
  name: 'name',
  priceINR: 'priceINR',
  billingCycle: 'billingCycle',
  features: 'features',
  isActive: 'isActive'
};

exports.Prisma.MembershipScalarFieldEnum = {
  id: 'id',
  planId: 'planId',
  status: 'status',
  startedAt: 'startedAt',
  expiresAt: 'expiresAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TransactionScalarFieldEnum = {
  id: 'id',
  orderId: 'orderId',
  paymentId: 'paymentId',
  planId: 'planId',
  amount: 'amount',
  currency: 'currency',
  status: 'status',
  rawPayload: 'rawPayload',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CmsPageScalarFieldEnum = {
  id: 'id',
  slug: 'slug',
  title: 'title',
  metaTitle: 'metaTitle',
  metaDesc: 'metaDesc',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CmsSectionScalarFieldEnum = {
  id: 'id',
  pageId: 'pageId',
  sectionName: 'sectionName',
  layoutIndex: 'layoutIndex',
  title: 'title',
  subtitle: 'subtitle',
  desc: 'desc',
  ctaLabel: 'ctaLabel',
  ctaLink: 'ctaLink',
  cards: 'cards',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ContactQueryScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  phone: 'phone',
  subject: 'subject',
  message: 'message',
  isResolved: 'isResolved',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.LearningVelocityLogScalarFieldEnum = {
  id: 'id',
  studentId: 'studentId',
  topicId: 'topicId',
  velocityScore: 'velocityScore',
  timeSpentMins: 'timeSpentMins',
  loggedAt: 'loggedAt'
};

exports.Prisma.AdaptivePathNodeScalarFieldEnum = {
  id: 'id',
  studentId: 'studentId',
  topicId: 'topicId',
  recommendedAction: 'recommendedAction',
  priority: 'priority',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.KnowledgeProfileScalarFieldEnum = {
  id: 'id',
  learningDnaId: 'learningDnaId',
  topicId: 'topicId',
  topicName: 'topicName',
  masteryLevel: 'masteryLevel',
  strongTopics: 'strongTopics',
  weakTopics: 'weakTopics',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.CompetencyProfileScalarFieldEnum = {
  id: 'id',
  learningDnaId: 'learningDnaId',
  competencyName: 'competencyName',
  level: 'level',
  score: 'score',
  gapAnalysis: 'gapAnalysis',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.MasteryProfileScalarFieldEnum = {
  id: 'id',
  learningDnaId: 'learningDnaId',
  subjectId: 'subjectId',
  masteryScore: 'masteryScore',
  retentionScore: 'retentionScore',
  velocityScore: 'velocityScore',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.RiskProfileScalarFieldEnum = {
  id: 'id',
  learningDnaId: 'learningDnaId',
  riskScore: 'riskScore',
  riskLevel: 'riskLevel',
  reasons: 'reasons',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.RecommendationScalarFieldEnum = {
  id: 'id',
  learningDnaId: 'learningDnaId',
  title: 'title',
  description: 'description',
  actionType: 'actionType',
  priority: 'priority',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.LearningPatternScalarFieldEnum = {
  id: 'id',
  learningDnaId: 'learningDnaId',
  preferredTimeOfDay: 'preferredTimeOfDay',
  preferredContentType: 'preferredContentType',
  consistencyScore: 'consistencyScore',
  engagementScore: 'engagementScore',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.LearningMetricsScalarFieldEnum = {
  id: 'id',
  learningDnaId: 'learningDnaId',
  confidenceScore: 'confidenceScore',
  adaptiveDifficulty: 'adaptiveDifficulty',
  totalStudyMins: 'totalStudyMins',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.ConnectorScalarFieldEnum = {
  id: 'id',
  name: 'name',
  type: 'type',
  category: 'category',
  description: 'description',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.IntegrationScalarFieldEnum = {
  id: 'id',
  organizationId: 'organizationId',
  tenantId: 'tenantId',
  connectorId: 'connectorId',
  config: 'config',
  status: 'status',
  lastSyncedAt: 'lastSyncedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.WebhookScalarFieldEnum = {
  id: 'id',
  organizationId: 'organizationId',
  tenantId: 'tenantId',
  url: 'url',
  events: 'events',
  secret: 'secret',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.SyncJobScalarFieldEnum = {
  id: 'id',
  integrationId: 'integrationId',
  status: 'status',
  recordsSynced: 'recordsSynced',
  errorMessage: 'errorMessage',
  startedAt: 'startedAt',
  completedAt: 'completedAt',
  createdAt: 'createdAt'
};

exports.Prisma.ApiKeyScalarFieldEnum = {
  id: 'id',
  organizationId: 'organizationId',
  tenantId: 'tenantId',
  name: 'name',
  keyHash: 'keyHash',
  scopes: 'scopes',
  expiresAt: 'expiresAt',
  isActive: 'isActive',
  lastUsedAt: 'lastUsedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.NotificationScalarFieldEnum = {
  id: 'id',
  organizationId: 'organizationId',
  tenantId: 'tenantId',
  recipientId: 'recipientId',
  recipientRole: 'recipientRole',
  type: 'type',
  title: 'title',
  body: 'body',
  actionUrl: 'actionUrl',
  channel: 'channel',
  priority: 'priority',
  status: 'status',
  isRead: 'isRead',
  readAt: 'readAt',
  scheduledFor: 'scheduledFor',
  metadata: 'metadata',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.NotificationTemplateScalarFieldEnum = {
  id: 'id',
  code: 'code',
  name: 'name',
  type: 'type',
  channel: 'channel',
  subject: 'subject',
  htmlBody: 'htmlBody',
  textBody: 'textBody',
  pushTitle: 'pushTitle',
  whatsappBody: 'whatsappBody',
  smsBody: 'smsBody',
  variables: 'variables',
  language: 'language',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.NotificationPreferenceScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  enabledChannels: 'enabledChannels',
  categoryPreferences: 'categoryPreferences',
  quietHoursStart: 'quietHoursStart',
  quietHoursEnd: 'quietHoursEnd',
  minPriority: 'minPriority',
  preferredLanguage: 'preferredLanguage',
  frequency: 'frequency',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.AnnouncementScalarFieldEnum = {
  id: 'id',
  organizationId: 'organizationId',
  schoolId: 'schoolId',
  classId: 'classId',
  batchId: 'batchId',
  courseId: 'courseId',
  targetRole: 'targetRole',
  targetUserId: 'targetUserId',
  title: 'title',
  content: 'content',
  authorId: 'authorId',
  isPublished: 'isPublished',
  publishedAt: 'publishedAt',
  expiresAt: 'expiresAt',
  attachments: 'attachments',
  metadata: 'metadata',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.DeliveryLogScalarFieldEnum = {
  id: 'id',
  notificationId: 'notificationId',
  channel: 'channel',
  status: 'status',
  provider: 'provider',
  providerMsgId: 'providerMsgId',
  errorMessage: 'errorMessage',
  attemptCount: 'attemptCount',
  nextAttemptAt: 'nextAttemptAt',
  sentAt: 'sentAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SchoolProfileScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  board: 'board',
  address: 'address',
  licenseDocUrl: 'licenseDocUrl',
  approvalStatus: 'approvalStatus',
  approvedAt: 'approvedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.OrganizationScalarFieldEnum = {
  id: 'id',
  name: 'name',
  slug: 'slug',
  legalName: 'legalName',
  registrationNumber: 'registrationNumber',
  taxNumber: 'taxNumber',
  logoUrl: 'logoUrl',
  website: 'website',
  email: 'email',
  phone: 'phone',
  address: 'address',
  timezone: 'timezone',
  locale: 'locale',
  currency: 'currency',
  status: 'status',
  subscriptionPlan: 'subscriptionPlan',
  subscriptionStatus: 'subscriptionStatus',
  featureFlags: 'featureFlags',
  metadata: 'metadata',
  licenseStatus: 'licenseStatus',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.SchoolScalarFieldEnum = {
  id: 'id',
  organizationId: 'organizationId',
  name: 'name',
  board: 'board',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.CampusScalarFieldEnum = {
  id: 'id',
  schoolId: 'schoolId',
  name: 'name',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.AcademicYearScalarFieldEnum = {
  id: 'id',
  schoolId: 'schoolId',
  startDate: 'startDate',
  endDate: 'endDate',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.AcademicTermScalarFieldEnum = {
  id: 'id',
  academicYearId: 'academicYearId',
  name: 'name',
  startDate: 'startDate',
  endDate: 'endDate',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.ClassScalarFieldEnum = {
  id: 'id',
  name: 'name',
  code: 'code',
  description: 'description',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.SectionScalarFieldEnum = {
  id: 'id',
  classId: 'classId',
  name: 'name',
  capacity: 'capacity',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.BatchScalarFieldEnum = {
  id: 'id',
  campusId: 'campusId',
  academicYearId: 'academicYearId',
  sectionId: 'sectionId',
  name: 'name',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.EnrollmentScalarFieldEnum = {
  id: 'id',
  studentId: 'studentId',
  classId: 'classId',
  sectionId: 'sectionId',
  batchId: 'batchId',
  academicYearId: 'academicYearId',
  rollNumber: 'rollNumber',
  admissionDate: 'admissionDate',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.ReportScalarFieldEnum = {
  id: 'id',
  organizationId: 'organizationId',
  tenantId: 'tenantId',
  type: 'type',
  title: 'title',
  description: 'description',
  config: 'config',
  filters: 'filters',
  isScheduled: 'isScheduled',
  frequency: 'frequency',
  cronExpression: 'cronExpression',
  recipients: 'recipients',
  authorId: 'authorId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.DashboardScalarFieldEnum = {
  id: 'id',
  organizationId: 'organizationId',
  tenantId: 'tenantId',
  schoolId: 'schoolId',
  role: 'role',
  title: 'title',
  layoutConfig: 'layoutConfig',
  isDefault: 'isDefault',
  ownerId: 'ownerId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.WidgetScalarFieldEnum = {
  id: 'id',
  dashboardId: 'dashboardId',
  title: 'title',
  type: 'type',
  metricKey: 'metricKey',
  chartType: 'chartType',
  gridPosition: 'gridPosition',
  config: 'config',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AnalyticsSnapshotScalarFieldEnum = {
  id: 'id',
  organizationId: 'organizationId',
  tenantId: 'tenantId',
  schoolId: 'schoolId',
  studentId: 'studentId',
  teacherId: 'teacherId',
  entityType: 'entityType',
  overallMasteryScore: 'overallMasteryScore',
  attendancePercentage: 'attendancePercentage',
  assignmentCompletion: 'assignmentCompletion',
  learningVelocity: 'learningVelocity',
  retentionScore: 'retentionScore',
  studyTimeMins: 'studyTimeMins',
  riskLevel: 'riskLevel',
  weakTopics: 'weakTopics',
  strongTopics: 'strongTopics',
  kpiMetrics: 'kpiMetrics',
  heatmapData: 'heatmapData',
  snapshotDate: 'snapshotDate',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ExportJobScalarFieldEnum = {
  id: 'id',
  organizationId: 'organizationId',
  tenantId: 'tenantId',
  reportId: 'reportId',
  reportType: 'reportType',
  format: 'format',
  status: 'status',
  fileUrl: 'fileUrl',
  fileSize: 'fileSize',
  errorMessage: 'errorMessage',
  requestedBy: 'requestedBy',
  completedAt: 'completedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.ApprovalStatus = exports.$Enums.ApprovalStatus = {
  PENDING_REVIEW: 'PENDING_REVIEW',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

exports.AssignmentCategory = exports.$Enums.AssignmentCategory = {
  HOMEWORK: 'HOMEWORK',
  CLASSWORK: 'CLASSWORK',
  PROJECT: 'PROJECT',
  PRACTICAL: 'PRACTICAL',
  LAB_ASSIGNMENT: 'LAB_ASSIGNMENT',
  GROUP_ASSIGNMENT: 'GROUP_ASSIGNMENT',
  INDIVIDUAL_ASSIGNMENT: 'INDIVIDUAL_ASSIGNMENT',
  CAPSTONE_PROJECT: 'CAPSTONE_PROJECT'
};

exports.AssignmentStatus = exports.$Enums.AssignmentStatus = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
  ARCHIVED: 'ARCHIVED',
  CLOSED: 'CLOSED'
};

exports.GradingType = exports.$Enums.GradingType = {
  MANUAL: 'MANUAL',
  RUBRIC_BASED: 'RUBRIC_BASED',
  AUTO_GRADED: 'AUTO_GRADED'
};

exports.SubmissionStatus = exports.$Enums.SubmissionStatus = {
  DRAFT: 'DRAFT',
  SUBMITTED: 'SUBMITTED',
  GRADED: 'GRADED',
  RETURNED: 'RETURNED',
  REOPENED: 'REOPENED',
  OVERDUE: 'OVERDUE'
};

exports.AttendanceType = exports.$Enums.AttendanceType = {
  DAILY: 'DAILY',
  SUBJECT_WISE: 'SUBJECT_WISE',
  LECTURE: 'LECTURE',
  BATCH: 'BATCH',
  CLASS: 'CLASS',
  TEACHER: 'TEACHER'
};

exports.AttendanceStatus = exports.$Enums.AttendanceStatus = {
  PRESENT: 'PRESENT',
  ABSENT: 'ABSENT',
  LATE: 'LATE',
  HALF_DAY: 'HALF_DAY',
  MEDICAL_LEAVE: 'MEDICAL_LEAVE',
  APPROVED_LEAVE: 'APPROVED_LEAVE',
  HOLIDAY: 'HOLIDAY',
  EXCUSED: 'EXCUSED'
};

exports.AttendanceMode = exports.$Enums.AttendanceMode = {
  MANUAL: 'MANUAL',
  QR_CODE: 'QR_CODE',
  GEOFENCE: 'GEOFENCE',
  FACE_RECOGNITION: 'FACE_RECOGNITION',
  BIOMETRIC: 'BIOMETRIC'
};

exports.LeaveType = exports.$Enums.LeaveType = {
  STUDENT_LEAVE: 'STUDENT_LEAVE',
  TEACHER_LEAVE: 'TEACHER_LEAVE',
  MEDICAL: 'MEDICAL',
  CASUAL: 'CASUAL',
  SICK: 'SICK',
  SPECIAL: 'SPECIAL'
};

exports.LeaveStatus = exports.$Enums.LeaveStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  CANCELLED: 'CANCELLED'
};

exports.HolidayType = exports.$Enums.HolidayType = {
  NATIONAL: 'NATIONAL',
  SCHOOL: 'SCHOOL',
  ACADEMIC_CALENDAR: 'ACADEMIC_CALENDAR',
  ORGANIZATION: 'ORGANIZATION',
  EXAM: 'EXAM'
};

exports.RoleName = exports.$Enums.RoleName = {
  STUDENT: 'STUDENT',
  PARENT: 'PARENT',
  TEACHER: 'TEACHER',
  MENTOR: 'MENTOR',
  SCHOOL_ADMIN: 'SCHOOL_ADMIN',
  ORGANIZATION_ADMIN: 'ORGANIZATION_ADMIN',
  ADMIN: 'ADMIN',
  SUPERADMIN: 'SUPERADMIN'
};

exports.AccountStatus = exports.$Enums.AccountStatus = {
  PENDING_VERIFICATION: 'PENDING_VERIFICATION',
  ONBOARDING: 'ONBOARDING',
  PENDING_APPROVAL: 'PENDING_APPROVAL',
  ACTIVE: 'ACTIVE',
  SUSPENDED: 'SUSPENDED'
};

exports.RoleType = exports.$Enums.RoleType = {
  STUDENT: 'STUDENT',
  PARENT: 'PARENT',
  SCHOOL_ADMIN: 'SCHOOL_ADMIN',
  MENTOR: 'MENTOR',
  TEACHER: 'TEACHER',
  ADMIN: 'ADMIN',
  SUPERADMIN: 'SUPERADMIN'
};

exports.PermissionAction = exports.$Enums.PermissionAction = {
  CREATE: 'CREATE',
  READ: 'READ',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  MANAGE: 'MANAGE'
};

exports.SessionStatus = exports.$Enums.SessionStatus = {
  ACTIVE: 'ACTIVE',
  EXPIRED: 'EXPIRED',
  REVOKED: 'REVOKED'
};

exports.OtpChannel = exports.$Enums.OtpChannel = {
  SMS: 'SMS',
  EMAIL: 'EMAIL',
  WHATSAPP: 'WHATSAPP'
};

exports.OtpPurpose = exports.$Enums.OtpPurpose = {
  REGISTRATION: 'REGISTRATION',
  LOGIN: 'LOGIN',
  PASSWORD_RESET: 'PASSWORD_RESET',
  PHONE_CHANGE: 'PHONE_CHANGE',
  EMAIL_CHANGE: 'EMAIL_CHANGE'
};

exports.AuditAction = exports.$Enums.AuditAction = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  REGISTER: 'REGISTER',
  VERIFY_OTP: 'VERIFY_OTP',
  PASSWORD_RESET: 'PASSWORD_RESET',
  CREATE_RECORD: 'CREATE_RECORD',
  UPDATE_RECORD: 'UPDATE_RECORD',
  DELETE_RECORD: 'DELETE_RECORD'
};

exports.SubscriptionStatus = exports.$Enums.SubscriptionStatus = {
  INACTIVE: 'INACTIVE',
  ACTIVE: 'ACTIVE',
  PAST_DUE: 'PAST_DUE',
  CANCELLED: 'CANCELLED'
};

exports.ConnectorType = exports.$Enums.ConnectorType = {
  GOOGLE_CLASSROOM: 'GOOGLE_CLASSROOM',
  MOODLE: 'MOODLE',
  STRIPE: 'STRIPE',
  TWILIO: 'TWILIO',
  S3: 'S3',
  OAUTH: 'OAUTH'
};

exports.SyncStatus = exports.$Enums.SyncStatus = {
  PENDING: 'PENDING',
  RUNNING: 'RUNNING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED'
};

exports.TargetAudienceRole = exports.$Enums.TargetAudienceRole = {
  ALL: 'ALL',
  STUDENT: 'STUDENT',
  TEACHER: 'TEACHER',
  PARENT: 'PARENT',
  MENTOR: 'MENTOR',
  ADMIN: 'ADMIN'
};

exports.NotificationType = exports.$Enums.NotificationType = {
  ASSESSMENT_PUBLISHED: 'ASSESSMENT_PUBLISHED',
  ASSESSMENT_REMINDER: 'ASSESSMENT_REMINDER',
  ASSIGNMENT_CREATED: 'ASSIGNMENT_CREATED',
  ASSIGNMENT_DUE: 'ASSIGNMENT_DUE',
  ASSIGNMENT_GRADED: 'ASSIGNMENT_GRADED',
  ATTENDANCE_ALERT: 'ATTENDANCE_ALERT',
  LOW_ATTENDANCE_WARNING: 'LOW_ATTENDANCE_WARNING',
  LEAVE_APPROVED: 'LEAVE_APPROVED',
  LEAVE_REJECTED: 'LEAVE_REJECTED',
  LEARNING_DNA_UPDATED: 'LEARNING_DNA_UPDATED',
  VEDHKRIT_INDEX_UPDATED: 'VEDHKRIT_INDEX_UPDATED',
  CAREER_RECOMMENDATION_UPDATED: 'CAREER_RECOMMENDATION_UPDATED',
  GOAL_ACHIEVED: 'GOAL_ACHIEVED',
  CERTIFICATE_ISSUED: 'CERTIFICATE_ISSUED',
  PAYMENT_REMINDER: 'PAYMENT_REMINDER',
  FEE_DUE: 'FEE_DUE',
  SCHOOL_ANNOUNCEMENT: 'SCHOOL_ANNOUNCEMENT',
  ORGANIZATION_ANNOUNCEMENT: 'ORGANIZATION_ANNOUNCEMENT',
  SYSTEM_ANNOUNCEMENT: 'SYSTEM_ANNOUNCEMENT'
};

exports.NotificationChannel = exports.$Enums.NotificationChannel = {
  IN_APP: 'IN_APP',
  EMAIL: 'EMAIL',
  SMS: 'SMS',
  WHATSAPP: 'WHATSAPP',
  PUSH: 'PUSH',
  WEBSOCKET: 'WEBSOCKET'
};

exports.NotificationPriority = exports.$Enums.NotificationPriority = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  URGENT: 'URGENT'
};

exports.DeliveryStatus = exports.$Enums.DeliveryStatus = {
  PENDING: 'PENDING',
  SENT: 'SENT',
  DELIVERED: 'DELIVERED',
  READ: 'READ',
  FAILED: 'FAILED',
  RETRYING: 'RETRYING',
  DEAD_LETTER: 'DEAD_LETTER'
};

exports.ReportType = exports.$Enums.ReportType = {
  STUDENT_PROGRESS: 'STUDENT_PROGRESS',
  ATTENDANCE: 'ATTENDANCE',
  ASSESSMENT: 'ASSESSMENT',
  ASSIGNMENT: 'ASSIGNMENT',
  LEARNING_DNA: 'LEARNING_DNA',
  VEDHKRIT_INDEX: 'VEDHKRIT_INDEX',
  CAREER_READINESS: 'CAREER_READINESS',
  TEACHER_PERFORMANCE: 'TEACHER_PERFORMANCE',
  SCHOOL_PERFORMANCE: 'SCHOOL_PERFORMANCE',
  ORGANIZATION_PERFORMANCE: 'ORGANIZATION_PERFORMANCE',
  CUSTOM: 'CUSTOM'
};

exports.ScheduleFrequency = exports.$Enums.ScheduleFrequency = {
  ONE_TIME: 'ONE_TIME',
  DAILY: 'DAILY',
  WEEKLY: 'WEEKLY',
  MONTHLY: 'MONTHLY'
};

exports.DashboardRole = exports.$Enums.DashboardRole = {
  STUDENT: 'STUDENT',
  TEACHER: 'TEACHER',
  PARENT: 'PARENT',
  SCHOOL_ADMIN: 'SCHOOL_ADMIN',
  ORGANIZATION_ADMIN: 'ORGANIZATION_ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN'
};

exports.ExportFormat = exports.$Enums.ExportFormat = {
  PDF: 'PDF',
  EXCEL: 'EXCEL',
  CSV: 'CSV',
  JSON: 'JSON'
};

exports.ExportStatus = exports.$Enums.ExportStatus = {
  QUEUED: 'QUEUED',
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED'
};

exports.Prisma.ModelName = {
  TeacherProfile: 'TeacherProfile',
  AcademicRecord: 'AcademicRecord',
  Subject: 'Subject',
  Course: 'Course',
  Curriculum: 'Curriculum',
  Chapter: 'Chapter',
  Topic: 'Topic',
  Lesson: 'Lesson',
  LearningObjective: 'LearningObjective',
  LearningResource: 'LearningResource',
  Homework: 'Homework',
  DeadlineExtension: 'DeadlineExtension',
  AIRequest: 'AIRequest',
  AIResponse: 'AIResponse',
  StudyPlan: 'StudyPlan',
  AIRecommendation: 'AIRecommendation',
  RiskAnalysis: 'RiskAnalysis',
  CareerAdvice: 'CareerAdvice',
  LearningInsight: 'LearningInsight',
  QuestionBank: 'QuestionBank',
  Question: 'Question',
  Assessment: 'Assessment',
  AssessmentAttempt: 'AssessmentAttempt',
  Answer: 'Answer',
  Rubric: 'Rubric',
  Grading: 'Grading',
  CompetencyScore: 'CompetencyScore',
  StudentAnswer: 'StudentAnswer',
  AssessmentResult: 'AssessmentResult',
  Assignment: 'Assignment',
  Submission: 'Submission',
  AssignmentRubric: 'AssignmentRubric',
  RubricCriterion: 'RubricCriterion',
  Feedback: 'Feedback',
  Attachment: 'Attachment',
  AssignmentAnalytics: 'AssignmentAnalytics',
  AttendanceSession: 'AttendanceSession',
  AttendanceRecord: 'AttendanceRecord',
  LeaveRequest: 'LeaveRequest',
  Holiday: 'Holiday',
  AttendancePolicy: 'AttendancePolicy',
  AttendanceAnalytics: 'AttendanceAnalytics',
  User: 'User',
  Role: 'Role',
  Permission: 'Permission',
  UserRole: 'UserRole',
  RolePermission: 'RolePermission',
  Session: 'Session',
  RefreshToken: 'RefreshToken',
  OTP: 'OTP',
  AuditLog: 'AuditLog',
  StudentProfile: 'StudentProfile',
  ParentProfile: 'ParentProfile',
  MentorProfile: 'MentorProfile',
  StaffProfile: 'StaffProfile',
  LearningDNA: 'LearningDNA',
  VedhkritIndex: 'VedhkritIndex',
  CareerProfile: 'CareerProfile',
  Milestone: 'Milestone',
  Goal: 'Goal',
  Badge: 'Badge',
  MentorSession: 'MentorSession',
  ConsentRecord: 'ConsentRecord',
  PricingPlan: 'PricingPlan',
  Membership: 'Membership',
  Transaction: 'Transaction',
  CmsPage: 'CmsPage',
  CmsSection: 'CmsSection',
  ContactQuery: 'ContactQuery',
  LearningVelocityLog: 'LearningVelocityLog',
  AdaptivePathNode: 'AdaptivePathNode',
  KnowledgeProfile: 'KnowledgeProfile',
  CompetencyProfile: 'CompetencyProfile',
  MasteryProfile: 'MasteryProfile',
  RiskProfile: 'RiskProfile',
  Recommendation: 'Recommendation',
  LearningPattern: 'LearningPattern',
  LearningMetrics: 'LearningMetrics',
  Connector: 'Connector',
  Integration: 'Integration',
  Webhook: 'Webhook',
  SyncJob: 'SyncJob',
  ApiKey: 'ApiKey',
  Notification: 'Notification',
  NotificationTemplate: 'NotificationTemplate',
  NotificationPreference: 'NotificationPreference',
  Announcement: 'Announcement',
  DeliveryLog: 'DeliveryLog',
  SchoolProfile: 'SchoolProfile',
  Organization: 'Organization',
  School: 'School',
  Campus: 'Campus',
  AcademicYear: 'AcademicYear',
  AcademicTerm: 'AcademicTerm',
  Class: 'Class',
  Section: 'Section',
  Batch: 'Batch',
  Enrollment: 'Enrollment',
  Report: 'Report',
  Dashboard: 'Dashboard',
  Widget: 'Widget',
  AnalyticsSnapshot: 'AnalyticsSnapshot',
  ExportJob: 'ExportJob'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
