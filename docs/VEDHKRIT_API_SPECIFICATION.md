# Vedhkrit Learner Development OS — Production API Specification
**Version:** v1.0.0  
**Base URL:** `https://app.vedhkrit.com/api/v1` (Production) / `http://localhost:5000/api/v1` (Development)  
**Format:** OpenAPI 3.0 / Swagger Specification Style  

---

## 1. Authentication & Security Architecture

### 1.1 JWT Authentication Flow
Vedhkrit uses stateless JSON Web Tokens (JWT) for API request authentication and stateful Refresh Token Rotation stored in Redis.

```
Client App                           Nginx Gateway / NestJS API                   Redis Cache Store
    |                                            |                                        |
    |---- 1. POST /auth/login ------------------>|                                        |
    |                                            |--- 2. Validate Credentials ----------->|
    |                                            |--- 3. Generate Access + Refresh Token ->|
    |<--- 4. Return Access JWT + Cookie ---------|                                        |
    |                                            |                                        |
    |---- 5. Request with Bearer Header -------->|                                        |
    |                                            |--- 6. Verify Signature & RBAC Role --->|
    |<--- 7. 200 OK + JSON Payload --------------|                                        |
    |                                            |                                        |
    |---- 8. Access Token Expired (401) -------->|                                        |
    |---- 9. POST /auth/refresh ---------------->|                                        |
    |                                            |--- 10. Rotate Refresh Token ---------->|
    |<--- 11. New Access JWT + Refresh Token ----|                                        |
```

### 1.2 RBAC Permissions Matrix

| Endpoint Prefix | Student | Parent | Mentor | School Admin | Super Admin |
| :--- | :---: | :---: | :---: | :---: | :---: |
| `/auth/*` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/student/*` | ✅ | ❌ | ❌ | ✅ | ✅ |
| `/parent/*` | ❌ | ✅ | ❌ | ✅ | ✅ |
| `/mentor/*` | ❌ | ❌ | ✅ | ✅ | ✅ |
| `/admin/*` | ❌ | ❌ | ❌ | ✅ | ✅ |
| `/super-admin/*` | ❌ | ❌ | ❌ | ❌ | ✅ |
| `/analytics/*` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/reports/*` | ✅ | ✅ | ✅ | ✅ | ✅ |

### 1.3 Standard Response Format & Pagination

#### Standard Success Envelope
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Operation completed successfully",
  "data": {},
  "meta": {
    "timestamp": "2026-07-22T22:18:04.000Z",
    "requestId": "req-98f24a1b"
  }
}
```

#### Paginated Response Envelope
```json
{
  "success": true,
  "statusCode": 200,
  "data": [],
  "meta": {
    "page": 1,
    "limit": 20,
    "totalItems": 150,
    "totalPages": 8,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

#### Standard Error Envelope
```json
{
  "success": false,
  "statusCode": 400,
  "error": "Bad Request",
  "message": "Validation failed on fields: email",
  "details": [
    { "field": "email", "issue": "Invalid email address format" }
  ],
  "timestamp": "2026-07-22T22:18:04.000Z",
  "requestId": "req-err-44a1b"
}
```

---

## 2. API Endpoint Reference

---

### Module 1: Authentication (`/auth`)

#### `POST /auth/login`
- **Description:** Authenticates user credentials and returns JWT Access Token + Refresh Token.
- **Auth Required:** `No`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "email": "student@vedhkrit.com",
    "password": "SecurePassword123!"
  }
  ```
- **Validation Rules:**
  - `email`: Required, valid email string.
  - `password`: Required, minimum 8 characters.
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "data": {
      "accessToken": "eyJhbGciOiJIUzI1Ni...",
      "refreshToken": "def456789...",
      "expiresIn": 900,
      "user": {
        "id": "usr-123",
        "email": "student@vedhkrit.com",
        "name": "Aarav Sharma",
        "role": "student",
        "organizationId": "org-456"
      }
    }
  }
  ```
- **Error Responses:** `401 Unauthorized` (Invalid email/password), `429 Too Many Requests` (Rate limit exceeded).

#### `POST /auth/refresh`
- **Description:** Rotates expired access token using valid refresh token.
- **Auth Required:** `No` (Requires Refresh Token Body)
- **Request Body:**
  ```json
  {
    "refreshToken": "def456789..."
  }
  ```
- **Success Response (200 OK):** Returns new `accessToken` and `refreshToken`.

#### `POST /auth/logout`
- **Description:** Revokes current refresh token and invalidates active session in Redis.
- **Auth Required:** `Yes` (`Bearer Token`)

---

### Module 2: Student Platform (`/student`)

#### `GET /student/dashboard`
- **Description:** Retrieves real-time student dashboard telemetry, streak count, daily goals, and upcoming sessions.
- **Auth Required:** `Yes` | **Roles Allowed:** `student`, `admin`, `super`
- **Query Parameters:** `studentId` (string, optional)
- **Headers:** `Authorization: Bearer <JWT>`
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "studentId": "student-123",
      "name": "Aarav Sharma",
      "grade": 10,
      "academicAverage": 88.5,
      "attendanceRate": 96.0,
      "streakDays": 14,
      "completedAssessment": true,
      "recentAssignments": [
        { "id": "asgn-1", "title": "Calculus Worksheet", "dueDate": "2026-07-25", "status": "pending" }
      ]
    }
  }
  ```

#### `POST /student/assessment`
- **Description:** Submits student self-assessment diagnostic survey responses.
- **Auth Required:** `Yes` | **Roles Allowed:** `student`
- **Request Body:**
  ```json
  {
    "answers": {
      "q1": "logical-analytical",
      "q2": "visual-spatial",
      "q3": "high-focus"
    }
  }
  ```

---

### Module 3: Parent Portal (`/parent`)

#### `GET /parent/overview`
- **Description:** Retrieves parent overview for linked children, including academic averages and attendance graphs.
- **Auth Required:** `Yes` | **Roles Allowed:** `parent`, `admin`, `super`
- **Query Parameters:** `parentId` (string, required)
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "parentId": "parent-123",
      "children": [
        { "studentId": "student-123", "name": "Aarav Sharma", "grade": 10, "overallProgress": "Excellent" }
      ]
    }
  }
  ```

---

### Module 4: Mentor Portal (`/mentor`)

#### `GET /mentor/dashboard`
- **Description:** Retrieves mentor cohort telemetry, mentee risk alerts, and weekly maturity index spread.
- **Auth Required:** `Yes` | **Roles Allowed:** `mentor`, `admin`, `super`
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "mentorId": "mentor-101",
      "totalMentees": 24,
      "activeRiskAlerts": 2,
      "upcomingSessions": 4,
      "cohortMaturityIndex": 84.2
    }
  }
  ```

---

### Module 5: School Admin Portal (`/admin`)

#### `GET /admin/dashboard`
- **Description:** Retrieves school-wide institution analytics, teacher count, student count, and ILDF stage spread.
- **Auth Required:** `Yes` | **Roles Allowed:** `admin`, `super`
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "organizationId": "org-456",
      "schoolName": "Veda International Academy",
      "totalStudents": 1250,
      "totalTeachers": 45,
      "averageDevelopmentIndex": 82.4
    }
  }
  ```

---

### Module 6: Super Admin Control Center (`/super-admin`)

#### `GET /super-admin/dashboard`
- **Description:** Retrieves platform-wide telemetry, total active organizations, total MRR, system uptime, and server health.
- **Auth Required:** `Yes` | **Roles Allowed:** `super`
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "stats": {
        "totalOrganizations": 15,
        "activeInstitutions": 14,
        "totalStudents": 12500,
        "platformRevenue": 4280000,
        "mrr": 356000,
        "apiHealth": "healthy"
      }
    }
  }
  ```

#### `POST /super-admin/organizations`
- **Description:** Provisions a new partner school organization account.
- **Auth Required:** `Yes` | **Roles Allowed:** `super`
- **Request Body:**
  ```json
  {
    "name": "Delhi Public School",
    "city": "New Delhi",
    "plan": "enterprise",
    "studentCapacity": 2500,
    "adminEmail": "admin@dps.edu.in"
  }
  ```

---

### Module 7: Enterprise Analytics & Reports (`/analytics` & `/reports`)

#### `GET /analytics/student/:studentId`
- **Description:** Retrieves deep analytical metrics and developmental indices for a student.
- **Auth Required:** `Yes` | **Roles Allowed:** `student`, `parent`, `mentor`, `admin`, `super`

#### `POST /reports/export`
- **Description:** Generates and returns a downloadable report file in specified format.
- **Auth Required:** `Yes` | **Roles Allowed:** `student`, `parent`, `mentor`, `admin`, `super`
- **Request Body:**
  ```json
  {
    "reportType": "student-progress",
    "format": "pdf",
    "targetId": "student-123",
    "dateRange": { "start": "2026-01-01", "end": "2026-07-22" }
  }
  ```
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "fileUrl": "https://app.vedhkrit.com/exports/student_progress_123.pdf",
      "fileName": "student_progress_123.pdf",
      "format": "pdf",
      "exportedAt": "2026-07-22T22:18:04.000Z"
    }
  }
  ```

---

*End of OpenAPI Production API Specification — Vedhkrit v1.0.0*
