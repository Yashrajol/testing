# VEDHKRIT Learner Development OS: API Specification

This document serves as the master API Contract for the **Vedhkrit Learner Development Operating System**. Designed API-first, this specification mirrors the structural patterns of enterprise platforms like Stripe and Microsoft Graph.

---

## 1. API Design Principles

### URI Conventions
All URIs must use kebab-case for resource collections, use lowercase paths, and remain resource-oriented:
* Collections: `/api/v1/students`
* Specific Resources: `/api/v1/students/:id`
* Sub-resources: `/api/v1/students/:id/goals`

### HTTP Methods
* **`GET`:** Retrieves a representation of a resource. Safe and idempotent.
* **`POST`:** Creates a new resource or triggers an action. Neither safe nor idempotent (except with an idempotency key).
* **`PUT`:** Replaces an existing resource or creates it if not present. Idempotent.
* **`PATCH`:** Applies partial modifications to a resource. Neither safe nor idempotent.
* **`DELETE`:** Removes a resource. Idempotent.

### Versioning
The version is explicitly defined in the URI path to prevent breaking changes: `/api/v1/...`.

### Pagination
All collection endpoints returning arrays support cursor-based pagination (Stripe-style) using the following parameters:
* `limit` (integer, default: 20, max: 100)
* `starting_after` (string UUID, cursor token pointing to the object ID that starts the list)
* `ending_before` (string UUID, cursor token pointing to the object ID that ends the list)

### Filtering, Sorting, & Searching
* **Filtering:** Direct key-value query parameters: `GET /api/v1/students?status=ACTIVE&grade=10`
* **Sorting:** Use the `sort` parameter with a direction indicator: `GET /api/v1/students?sort=-createdAt` (minus indicates DESC).
* **Searching:** Use the `q` query parameter for full-text searches: `GET /api/v1/students?q=Sarthak`

### Error Format
All errors return a standard JSON object accompanied by matching HTTP status codes:
* `400 Bad Request` - Invalid payload syntax or validation failed.
* `401 Unauthorized` - Token missing or expired.
* `403 Forbidden` - Insufficient privileges (RBAC/PBAC failed).
* `404 Not Found` - Resource does not exist.
* `409 Conflict` - Resource unique constraint violated.
* `429 Too Many Requests` - Rate limit exceeded.

### Success Format
* `200 OK` - Standard success code.
* `201 Created` - Resource created successfully.
* `204 No Content` - Operation completed, returning no body (e.g. deletion).

### Idempotency
POST endpoints modifying financial logs or orders require the `Idempotency-Key` header containing a unique UUID. The server stores requests in Redis for 24 hours, returning the cached response for duplicate requests.

### Rate Limiting
APIs return the following standard headers:
* `X-RateLimit-Limit` - Maximum requests allowed per window (e.g., 1000).
* `X-RateLimit-Remaining` - Requests remaining in the current window.
* `X-RateLimit-Reset` - Unix timestamp when the limit resets.

### Authentication & Authorization
* **Authentication:** Bearer token authorization header: `Authorization: Bearer <JWT_Token>`.
* **Authorization:** Verified on every request using Role-Based Access Control (RBAC) and relationship checking middleware.

---

## 2. Authentication APIs

### Register
* **Method & Path:** `POST /api/v1/auth/register`
* **Purpose:** Registers a new user account.
* **Headers:** None.
* **Request:**
  ```json
  {
    "name": "Sarthak Sonawane",
    "email": "sarthak@vedhkrit.com",
    "phoneNumber": "+919876543210",
    "password": "SecurePassword123!",
    "role": "STUDENT"
  }
  ```
* **Response (201):**
  ```json
  {
    "success": true,
    "message": "User registered successfully. OTP dispatched.",
    "data": {
      "userId": "usr-8a5f3d2e-4b6c-8d9e-1f2a-3b4c5d6e7f8a",
      "status": "PENDING_VERIFICATION"
    }
  }
  ```
* **Errors:** `AUTH_001` (Email already registered), `AUTH_002` (Password weak).
* **Permissions:** Public.

### Login
* **Method & Path:** `POST /api/v1/auth/login`
* **Purpose:** Authenticates credentials and returns a session.
* **Headers:** None.
* **Request:**
  ```json
  {
    "email": "sarthak@vedhkrit.com",
    "password": "SecurePassword123!"
  }
  ```
* **Response (200):**
  ```json
  {
    "success": true,
    "message": "Login successful.",
    "data": {
      "accessToken": "eyJhbGciOi...",
      "refreshToken": "eyJhbGciOi...",
      "user": {
        "id": "usr-8a5f3d2e-4b6c-8d9e-1f2a-3b4c5d6e7f8a",
        "name": "Sarthak Sonawane",
        "email": "sarthak@vedhkrit.com",
        "role": "STUDENT",
        "status": "ACTIVE"
      }
    }
  }
  ```
* **Errors:** `AUTH_003` (Invalid credentials), `AUTH_004` (Account suspended).
* **Permissions:** Public.

### Refresh Token
* **Method & Path:** `POST /api/v1/auth/refresh`
* **Purpose:** Refreshes an expired access token using a refresh token.
* **Headers:** None.
* **Request:**
  ```json
  {
    "refreshToken": "eyJhbGciOi..."
  }
  ```
* **Response (200):**
  ```json
  {
    "success": true,
    "message": "Tokens refreshed successfully.",
    "data": {
      "accessToken": "eyJhbGciOi...",
      "refreshToken": "eyJhbGciOi..."
    }
  }
  ```
* **Errors:** `AUTH_005` (Invalid refresh token).
* **Permissions:** Public.

### Logout
* **Method & Path:** `POST /api/v1/auth/logout`
* **Purpose:** Revokes the user's active session.
* **Headers:** `Authorization: Bearer <token>`
* **Request:** None.
* **Response (204):** No Content.
* **Errors:** None.
* **Permissions:** Authenticated User.

### Forgot Password
* **Method & Path:** `POST /api/v1/auth/forgot-password`
* **Purpose:** Dispatches a password reset link to the user's email.
* **Headers:** None.
* **Request:**
  ```json
  {
    "email": "sarthak@vedhkrit.com"
  }
  ```
* **Response (200):**
  ```json
  {
    "success": true,
    "message": "Password reset instructions sent to your email."
  }
  ```
* **Errors:** `AUTH_006` (User not found).
* **Permissions:** Public.

### Reset Password
* **Method & Path:** `POST /api/v1/auth/reset-password`
* **Purpose:** Resets the password using a reset token.
* **Headers:** None.
* **Request:**
  ```json
  {
    "token": "reset-token-xyz",
    "newPassword": "NewSecurePassword123!"
  }
  ```
* **Response (200):**
  ```json
  {
    "success": true,
    "message": "Password updated successfully."
  }
  ```
* **Errors:** `AUTH_007` (Invalid/expired token).
* **Permissions:** Public.

### Verify OTP
* **Method & Path:** `POST /api/v1/auth/verify-otp`
* **Purpose:** Verifies a registration OTP.
* **Headers:** None.
* **Request:**
  ```json
  {
    "userId": "usr-8a5f3d2e-4b6c-8d9e-1f2a-3b4c5d6e7f8a",
    "otpCode": "123456"
  }
  ```
* **Response (200):**
  ```json
  {
    "success": true,
    "message": "OTP verified successfully. Account activated.",
    "data": {
      "status": "ONBOARDING"
    }
  }
  ```
* **Errors:** `AUTH_008` (Invalid OTP), `AUTH_009` (OTP expired).
* **Permissions:** Public.

### Resend OTP
* **Method & Path:** `POST /api/v1/auth/resend-otp`
* **Purpose:** Dispatches a new OTP code.
* **Headers:** None.
* **Request:**
  ```json
  {
    "userId": "usr-8a5f3d2e-4b6c-8d9e-1f2a-3b4c5d6e7f8a"
  }
  ```
* **Response (200):**
  ```json
  {
    "success": true,
    "message": "New OTP code dispatched."
  }
  ```
* **Errors:** None.
* **Permissions:** Public.

---

## 3. Organization APIs

* **`GET /api/v1/orgs`** - List organizations. (*Permissions: Super Admin*)
* **`POST /api/v1/orgs`** - Create organization. (*Permissions: Super Admin*)
* **`GET /api/v1/orgs/:id/schools`** - List schools in an organization. (*Permissions: Org Admin, Super Admin*)
* **`POST /api/v1/orgs/:id/schools`** - Register a school. (*Permissions: Org Admin, Super Admin*)
* **`GET /api/v1/schools/:schoolId/campuses`** - List campuses. (*Permissions: School Admin*)
* **`POST /api/v1/schools/:schoolId/campuses`** - Create campus. (*Permissions: School Admin*)
* **`GET /api/v1/schools/:schoolId/academic-years`** - List academic years. (*Permissions: School Admin*)
* **`POST /api/v1/schools/:schoolId/academic-years`** - Create academic year. (*Permissions: School Admin*)
* **`GET /api/v1/campuses/:campusId/classes`** - List classes templates. (*Permissions: School Admin*)
* **`POST /api/v1/campuses/:campusId/classes`** - Add class template. (*Permissions: School Admin*)
* **`GET /api/v1/classes/:classId/sections`** - List sections. (*Permissions: School Admin*)
* **`POST /api/v1/classes/:classId/sections`** - Create section. (*Permissions: School Admin*)
* **`GET /api/v1/sections/:sectionId/batches`** - List batches in section. (*Permissions: School Admin*)
* **`POST /api/v1/sections/:sectionId/batches`** - Create batch. (*Permissions: School Admin*)
* **`POST /api/v1/batches/:batchId/assign-students`** - Add student roster to batch. (*Permissions: School Admin*)

---

## 4. Student APIs

* **`GET /api/v1/students/:id`** - Get student profile. (*Permissions: Student (self), Parent, School Admin*)
* **`PUT /api/v1/students/:id`** - Update student details. (*Permissions: Student (self), Parent, School Admin*)
* **`GET /api/v1/students/:id/dashboard`** - Get customized daily checklist and widgets. (*Permissions: Student (self)*)
* **`GET /api/v1/students/:id/dna`** - Retrieve Learning DNA. (*Permissions: Student (self), Parent, Mentor*)
* **`GET /api/v1/students/:id/index-history`** - Fetch Vedhkrit Index timeline. (*Permissions: Student (self), Parent, School Admin*)
* **`GET /api/v1/students/:id/goals`** - Retrieve goals. (*Permissions: Student (self), Mentor*)
* **`POST /api/v1/students/:id/goals`** - Create a personal goal. (*Permissions: Student (self), Mentor*)
* **`GET /api/v1/students/:id/portfolio`** - List student portfolio assets. (*Permissions: Student (self), Parent, Mentor*)
* **`GET /api/v1/students/:id/achievements`** - Retrieve earned badges and certificates. (*Permissions: Student (self), Parent*)
* **`GET /api/v1/students/:id/timeline`** - Fetch growth record milestones. (*Permissions: Student (self), Parent*)
* **`GET /api/v1/students/:id/recommendations`** - Retrieve AI-generated suggestions. (*Permissions: Student (self), Parent*)
* **`GET /api/v1/students/:id/careers`** - Get active career paths. (*Permissions: Student (self), Parent, Mentor*)
* **`GET /api/v1/students/:id/study-materials`** - Retrieve study guides. (*Permissions: Student (self)*)
* **`GET /api/v1/students/:id/homeworks`** - List homework assignments. (*Permissions: Student (self)*)
* **`POST /api/v1/students/:id/homeworks/:homeworkId/submit`** - Submit homework task. (*Permissions: Student (self)*)
* **`GET /api/v1/students/:id/attendance`** - Fetch attendance history. (*Permissions: Student (self), Parent*)
* **`GET /api/v1/students/:id/reports`** - Retrieve monthly PDF reports. (*Permissions: Student (self), Parent*)

---

## 5. Parent APIs

* **`GET /api/v1/parents/:id/children`** - List linked children profiles. (*Permissions: Parent (self)*)
* **`GET /api/v1/parents/:id/children/:childId/growth`** - Fetch growth indexes for child. (*Permissions: Parent (self)*)
* **`GET /api/v1/parents/:id/children/:childId/reports`** - Fetch reports for child. (*Permissions: Parent (self)*)
* **`GET /api/v1/parents/:id/children/:childId/attendance`** - Fetch attendance history for child. (*Permissions: Parent (self)*)
* **`GET /api/v1/parents/:id/children/:childId/mentor-notes`** - Fetch mentor session feedback. (*Permissions: Parent (self)*)
* **`GET /api/v1/parents/:id/messages`** - Retrieve messaging threads. (*Permissions: Parent (self)*)
* **`GET /api/v1/parents/:id/payments`** - Fetch billing invoice entries. (*Permissions: Parent (self)*)
* **`GET /api/v1/parents/:id/dashboard`** - Get parent portal alerts. (*Permissions: Parent (self)*)

---

## 6. Teacher APIs

* **`GET /api/v1/teachers/:id/subjects`** - List subjects taught by teacher. (*Permissions: Teacher (self)*)
* **`GET /api/v1/teachers/:id/batches/:batchId/lessons`** - Get curriculum lesson plans. (*Permissions: Teacher (self)*)
* **`POST /api/v1/teachers/:id/batches/:batchId/lessons`** - Create a new lesson plan. (*Permissions: Teacher (self)*)
* **`GET /api/v1/teachers/:id/homeworks`** - List homework tasks assigned. (*Permissions: Teacher (self)*)
* **`POST /api/v1/teachers/:id/homeworks`** - Assign homework to batch. (*Permissions: Teacher (self)*)
* **`POST /api/v1/teachers/:id/homeworks/:homeworkId/grade`** - Log homework evaluation grade. (*Permissions: Teacher (self)*)
* **`POST /api/v1/teachers/:id/batches/:batchId/attendance`** - Submit daily class attendance. (*Permissions: Teacher (self)*)
* **`GET /api/v1/teachers/:id/assessments`** - List assessments created. (*Permissions: Teacher (self)*)
* **`POST /api/v1/teachers/:id/assessments`** - Create new assessment. (*Permissions: Teacher (self)*)
* **`GET /api/v1/teachers/:id/question-banks`** - List question banks. (*Permissions: Teacher (self)*)
* **`POST /api/v1/teachers/:id/question-banks`** - Create question bank. (*Permissions: Teacher (self)*)
* **`GET /api/v1/teachers/:id/students`** - List students in taught batches. (*Permissions: Teacher (self)*)
* **`GET /api/v1/teachers/:id/dashboard`** - Fetch academic analytics. (*Permissions: Teacher (self)*)

---

## 7. Mentor APIs

* **`GET /api/v1/mentors/:id/students`** - List assigned students. (*Permissions: Mentor (self)*)
* **`GET /api/v1/mentors/:id/sessions`** - List scheduled 1:1 sessions. (*Permissions: Mentor (self)*)
* **`POST /api/v1/mentors/:id/sessions`** - Schedule a mentoring session. (*Permissions: Mentor (self)*)
* **`POST /api/v1/mentors/:id/sessions/:sessionId/complete`** - Log session notes and scores. (*Permissions: Mentor (self)*)
* **`POST /api/v1/mentors/:id/students/:studentId/recommendations`** - Add a goal recommendation. (*Permissions: Mentor (self)*)
* **`GET /api/v1/mentors/:id/calendar`** - Get mentor schedule. (*Permissions: Mentor (self)*)
* **`GET /api/v1/mentors/:id/dashboard`** - Get mentor portal metrics. (*Permissions: Mentor (self)*)

---

## 8. Assessment APIs

* **`GET /api/v1/assessments`** - List active tests. (*Permissions: Authenticated User*)
* **`POST /api/v1/assessments/:id/attempts/start`** - Start an assessment attempt. (*Permissions: Student (self)*)
* **`POST /api/v1/attempts/:attemptId/answers`** - Submit response for assessment item. (*Permissions: Student (self)*)
* **`POST /api/v1/attempts/:attemptId/submit`** - Complete assessment attempt. (*Permissions: Student (self)*)
* **`GET /api/v1/attempts/:attemptId/result`** - Fetch graded result and dimensions. (*Permissions: Student, Parent, Mentor*)

---

## 9. Growth APIs

* **`PATCH /api/v1/goals/:id/progress`** - Update goal progress percentage. (*Permissions: Student (self), Mentor*)
* **`POST /api/v1/goals/:id/complete`** - Verify goal completion. (*Permissions: Student (self), Mentor*)
* **`GET /api/v1/badges`** - List available gamification badges. (*Permissions: Authenticated User*)
* **`GET /api/v1/certificates/:id`** - Get certificate metadata. (*Permissions: Authenticated User*)
* **`POST /api/v1/portfolios`** - Create new portfolio listing block. (*Permissions: Student (self)*)
* **`PUT /api/v1/portfolios/:id/visibility`** - Update portfolio visibility settings. (*Permissions: Student (self)*)
* **`POST /api/v1/research-projects`** - Create research project. (*Permissions: Student (self)*)
* **`POST /api/v1/research-projects/:id/verify`** - Sign off on research project. (*Permissions: Mentor, Teacher*)
* **`GET /api/v1/innovation-challenges`** - List active hackathons. (*Permissions: Authenticated User*)
* **`POST /api/v1/innovation-challenges/:id/submit`** - Submit challenge entry. (*Permissions: Student (self)*)
* **`POST /api/v1/slec-activities`** - Log extra-curricular activity. (*Permissions: Student (self)*)
* **`POST /api/v1/slec-activities/:id/complete`** - Complete extra-curricular activity. (*Permissions: Student (self), Mentor*)

---

## 10. AI APIs

* **`POST /api/v1/ai/chat`** - Interact with the VedhAI Coach. (*Permissions: Student (self)*)
* **`POST /api/v1/ai/recommend`** - Generate capability study advice. (*Permissions: System*)
* **`POST /api/v1/ai/career-match`** - Generate career recommendation list. (*Permissions: System*)
* **`POST /api/v1/ai/planner`** - Create dynamic task lists. (*Permissions: Student (self)*)
* **`POST /api/v1/ai/portfolio-review`** - Generate feedback for project. (*Permissions: Student (self), Mentor*)
* **`GET /api/v1/ai/prompts`** - Retrieve interaction history. (*Permissions: Student (self)*)

---

## 11. Notification APIs

* **`POST /api/v1/notifications/send`** - Dispatches alerts (SMS, email, push). (*Permissions: System*)
* **`GET /api/v1/notifications`** - List inbox logs. (*Permissions: User (self)*)
* **`PUT /api/v1/notifications/:id/read`** - Mark notification as read. (*Permissions: User (self)*)
* **`GET /api/v1/notifications/preferences`** - Fetch channel options. (*Permissions: User (self)*)
* **`PUT /api/v1/notifications/preferences`** - Update notification channel preferences. (*Permissions: User (self)*)
* **`GET /api/v1/notifications/templates`** - Fetch templates list. (*Permissions: School Admin, Super Admin*)
* **`POST /api/v1/notifications/templates`** - Create a new message template. (*Permissions: Super Admin*)

---

## 12. Payment APIs

* **`GET /api/v1/payments/plans`** - List active membership pricing plans. (*Permissions: Public*)
* **`POST /api/v1/payments/subscribe`** - Start Razorpay checkout flow. (*Permissions: Parent*)
* **`POST /api/v1/payments/webhook`** - Razorpay payment completion event webhook. (*Permissions: Public / Signature verified*)
* **`GET /api/v1/payments/invoices`** - List invoices. (*Permissions: Parent, Super Admin*)
* **`GET /api/v1/payments/invoices/:id`** - Get invoice details. (*Permissions: Parent, Super Admin*)
* **`GET /api/v1/payments/transactions`** - List transaction logs. (*Permissions: Super Admin*)

---

## 13. Reporting APIs

* **`GET /api/v1/reports/student/:studentId`** - Retrieve monthly reports. (*Permissions: Student, Parent*)
* **`POST /api/v1/reports/student/:studentId/generate`** - Trigger monthly report generation. (*Permissions: System, School Admin*)
* **`GET /api/v1/reports/school/:schoolId`** - Retrieve school-wide performance reports. (*Permissions: School Admin*)
* **`GET /api/v1/reports/org/:orgId`** - Retrieve organization performance reports. (*Permissions: Org Admin, Super Admin*)
* **`GET /api/v1/reports/:id/download`** - Get temporary signed cloud download link. (*Permissions: Authorized Viewer*)

---

## 14. Administration APIs

* **`GET /api/v1/admin/audit-logs`** - List audit logs. (*Permissions: Super Admin*)
* **`GET /api/v1/admin/users`** - List user accounts. (*Permissions: Super Admin, School Admin*)
* **`PUT /api/v1/admin/users/:id/status`** - Activate/suspend user accounts. (*Permissions: Super Admin, School Admin*)
* **`PUT /api/v1/admin/users/:id/permissions`** - Update RBAC assignments. (*Permissions: Super Admin*)
* **`GET /api/v1/admin/settings`** - Get configuration variables. (*Permissions: Super Admin*)
* **`PUT /api/v1/admin/settings`** - Update configuration variables. (*Permissions: Super Admin*)
* **`GET /api/v1/admin/feature-flags`** - List feature flags. (*Permissions: Authenticated User*)
* **`POST /api/v1/admin/feature-flags`** - Add feature flag. (*Permissions: Super Admin*)
* **`PUT /api/v1/admin/feature-flags/:id`** - Toggle feature flag. (*Permissions: Super Admin*)
* **`POST /api/v1/admin/cms/pages`** - Create content layouts. (*Permissions: Super Admin*)
* **`PUT /api/v1/admin/cms/pages/:id`** - Update content layouts. (*Permissions: Super Admin*)

---

## 15. API Error Catalogue

Standardized system errors return a structured code and description:

| Error Code | HTTP Status | Description |
| :--- | :--- | :--- |
| **`AUTH_001`** | 409 Conflict | Email address is already registered. |
| **`AUTH_002`** | 400 Bad Request | Password strength requirements not met. |
| **`AUTH_003`** | 401 Unauthorized| Invalid credentials. |
| **`AUTH_004`** | 403 Forbidden | Account has been suspended. |
| **`AUTH_005`** | 401 Unauthorized| Refresh token is invalid or expired. |
| **`AUTH_006`** | 404 Not Found | Reset target user email not found. |
| **`AUTH_007`** | 400 Bad Request | Password reset token is invalid or expired. |
| **`AUTH_008`** | 400 Bad Request | OTP validation code is incorrect. |
| **`AUTH_009`** | 400 Bad Request | OTP validation code has expired. |
| **`USER_001`** | 404 Not Found | User profile record not found. |
| **`USER_002`** | 403 Forbidden | Profile edit permission denied. |
| **`ORG_001`** | 404 Not Found | Target organization record not found. |
| **`ORG_002`** | 409 Conflict | Campus license quota exceeded. |
| **`ACAD_001`** | 409 Conflict | Student is already assigned to a batch for this year. |
| **`ACAD_002`** | 400 Bad Request | Late homework submissions are disabled. |
| **`ASSESSMENT_001`** | 404 Not Found | Assessment does not exist. |
| **`ASSESSMENT_002`** | 400 Bad Request | Attempt is already completed and cannot be modified. |
| **`PAYMENT_001`** | 402 Payment Required| Membership is unpaid or expired. |
| **`PAYMENT_002`** | 400 Bad Request | Idempotency Key validation failed. |
| **`AI_001`** | 429 Too Many Requests| AI tokens rate limit exceeded. |
| **`AI_002`** | 400 Bad Request | Dynamic prompts generation context missing. |

---

## 16. API Response Standards

All API responses must follow a standardized JSON envelope structure:

```json
{
  "success": true,
  "message": "Operation completed successfully.",
  "data": {},
  "meta": {
    "cursor": {
      "hasMore": false,
      "nextCursor": null
    }
  },
  "errors": []
}
```

### Response Attributes
* **`success` (boolean):** Indicates if the request completed successfully.
* **`message` (string):** A brief message explaining the result.
* **`data` (object/array):** The request payload. Returns an empty object (`{}`) if the endpoint does not return data.
* **`meta` (object):** Pagination metadata.
* **`errors` (array):** A list of error objects for failed requests:
  ```json
  "errors": [
    {
      "code": "AUTH_002",
      "message": "Password must contain at least one uppercase letter.",
      "field": "password"
    }
  ]
  ```

---

## 17. OpenAPI & Swagger Recommendations

To maintain clean and standardized documentation, the development team must adhere to the following Swagger guidelines:

### Folder Structure (NestJS Monorepo)
```
apps/platform/src/
  ├── auth/
  │    ├── dto/
  │    │    ├── login.dto.ts
  │    │    └── register.dto.ts
  │    ├── auth.controller.ts
  │    └── auth.service.ts
  ├── student/
  │    ├── dto/
  │    ├── student.controller.ts
  │    └── student.service.ts
```

### Endpoint Grouping (Swagger Tags)
Group APIs into folders using Swagger tags:
* `Authentication` - Registration, log-ins, and key checks.
* `Organization Administration` - Tenant operations.
* `Academics Management` - Cohorts, lessons, homework, and attendance.
* `Assessment Engine` - Quizzes and results.
* `Growth & Gamification` - Portfolios, goals, badges, and certificates.
* `AI Engine` - VedhAI Coach logs.
* `Payments & Billing` - Checkout flows, transaction histories, and invoices.
* `Reporting` - Progress report compilers.

### DTO Naming Conventions
* Request bodies: `[Action][Entity]Dto` (e.g., `RegisterStudentDto`).
* Query parameters: `[Action][Entity]QueryDto` (e.g., `ListStudentsQueryDto`).
* Response payloads: `[Action][Entity]ResponseDto` (e.g., `GetStudentProfileResponseDto`).

### Validation Rules (class-validator)
Enforce validation rules in DTO properties:
* `@IsUUID()` - Enforces UUID formats.
* `@IsEmail()` - Validates email structures.
* `@IsMobilePhone()` - Validates international phone formats.
* `@MinLength()` & `@MaxLength()` - Sets bounds on text inputs.
* `@Sanitize()` - Sanitizes input fields to prevent XSS.

---

## 18. Backend Readiness & Complexity Estimates

### Complexity Metric Projections
* **Total Endpoints:** 76
* **Estimated Controllers:** 18
* **Estimated DTOs:** 95
* **Estimated Services:** 22
* **Estimated Repositories:** 18
* **Estimated Middleware:** 6 (Rate limiters, correlation ID injections, payload sanitizers, WebSockets authenticators).
* **Estimated Guards:** 4 (`JwtAuthGuard`, `RbacGuard`, `PbacRelationshipGuard`, `WebhookSignatureGuard`).
* **Estimated Interceptors:** 3 (`ResponseEnvelopeInterceptor`, `AuditLoggingInterceptor`, `TransactionTimeoutInterceptor`).
* **Estimated Event Handlers:** 14 (Consumes asynchronous events like `AssessmentCompleted`, `AttendanceMarked`).
* **Estimated Queues:** 4 (`notification-queue`, `pdf-report-queue`, `ai-analysis-queue`, `payment-processing-queue`).

### Implementation Complexity Analysis
* **Core Security & Auth (Identity):** *Low Complexity.* Standard JWT and OTP configurations.
* **School & Cohorts (Organization):** *Medium Complexity.* Requires mapping complex relationships between branches, classes, and sections.
* **Diagnostics (Assessment & Learning DNA):** *High Complexity.* Needs to dynamically calculate multi-dimensional soft-skill matrices from student response history.
* **Advisory (AI & Recommendations):** *High Complexity.* Requires prompt engineering, token limit controls, and integration with the Gemini LLM.
* **Billing (Payments):** *Medium Complexity.* Needs signature validation for payment webhooks, idempotency key checks, and invoice generation.
