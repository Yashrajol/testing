# VEDHKRIT — Project Summary
*(Prepared for patent counsel review — not a legal document; a technical project brief)*

## 1. What it is

VEDHKRIT is an integrated learner-development platform that connects **six distinct actor
types** — students, parents, mentors, teachers, schools, and platform administrators — into
one system built around a single core loop: **diagnostic assessment → multi-dimensional
strength profiling → personalized guidance (courses, mentors, goals) → progress tracking**.

Rather than being a single-user app (like a typical LMS or test-prep tool), it is structured
as a **federation of role-specific portals** that all read/write a shared student record, so a
student's assessment data, goals, and mentor sessions are simultaneously visible (in
role-appropriate views) to their parent, their school, and any mentor assigned to them.

## 2. The problem it addresses

Existing ed-tech tools typically serve one actor in isolation — an assessment tool for
students, a separate SIS for schools, a separate scheduling tool for tutors/mentors, and no
shared view for parents. VEDHKRIT's stated aim is to unify assessment, mentoring, career
guidance, and academic tracking into one platform where every stakeholder in a student's
development sees a consistent, synchronized picture, gated by role-based access.

## 3. Core system architecture

- **Wildcard-subdomain, single-session multi-portal routing.** Each actor type gets its own
  subdomain (`student.`, `parent.`, `mentor.`, `school.`, `admin.vedhkrit.com`), but
  authentication is unified: a dual-token JWT scheme issues a short-lived access token
  (memory-only, 15 min) plus an HttpOnly refresh cookie scoped to the wildcard domain
  `.vedhkrit.com` (7 days). This lets a single login silently re-authenticate across every
  subdomain without re-prompting the user, while each subdomain's frontend router and the
  backend's `RolesGuard` both independently enforce that the logged-in role matches the
  portal being accessed.
- **Unified account-state machine covering heterogeneous onboarding paths.** A single
  `AccountStatus` enum (`PENDING_VERIFICATION → ONBOARDING → ACTIVE`, or
  `PENDING_APPROVAL → ACTIVE`) drives onboarding for every role, but the *path* to `ACTIVE`
  differs structurally per actor:
  - Students: email/OTP verification → grade/school self-declaration.
  - Parents: email/OTP verification → child linkage by student ID/email (1:N parent→children).
  - Schools: institutional registration with board type (CBSE/ICSE/IB/State), address, and
    license document upload → manual admin approval → bulk CSV cohort import that
    auto-provisions student logins.
  - Mentors: expertise-tag selection + CV/resume URL submission → manual admin approval →
    entry into a student-matching interface filtered by expertise.
- **Diagnostic assessment → dimensional profiling pipeline.** Students answer bank-sourced
  questions (tiered by difficulty); results are aggregated per student into an
  `AssessmentResult` carrying both an overall score and a JSON map of named competency
  dimensions (e.g., analytical, communication, problem-solving). This dimensional data drives
  a visual "Growth Radar" on the student/parent dashboards and feeds a course-recommendation
  surface.
- **Consent-gated multi-modal telemetry model.** The data model includes a per-student,
  per-type `ConsentRecord` (types observed: audio recording, video telemetry, eye-gaze
  tracking) that must be explicitly granted before that data channel is used — i.e., assessment
  integrity/engagement signals are designed to be opt-in and independently revocable per
  modality, rather than a single blanket consent flag. (This is currently a schema-level
  provision; the capture/analysis pipeline itself is not yet implemented — flag this to
  counsel as forward-looking architecture, not a shipped feature.)
- **Goal tracking with derived status.** Students/mentors set goals with target dates and a
  0–100 progress value; status (`ON_TRACK` / `AT_RISK` / `COMPLETED`) is tracked per goal and
  surfaced identically to the student and their linked parent.
- **CMS-driven marketing layer with cache-first delivery.** Non-portal pages (homepage, about,
  pricing) are built from admin-editable `CmsPage`/`CmsSection` records, designed to be served
  from a Redis cache layer so anonymous traffic generates near-zero database load.
- **Subscription & payment.** Parents purchase plans (`PricingPlan` → `Membership`) via
  Razorpay; webhook-driven payment validation activates the membership and links it to the
  child's `StudentProfile`.
- **Audit logging.** Sensitive actions (approvals, payments, auth events) are recorded to an
  `AuditLog` tied to the acting user, with IP address and payload capture, intended to be
  batch-flushed from an in-memory queue for write efficiency.

## 4. Technology stack

- **Frontend:** TanStack Start (React 19, Vite, Tailwind CSS v4), Recharts for the growth
  visualizations.
- **Backend:** NestJS (TypeScript) REST API, Prisma ORM, PostgreSQL.
- **Monorepo tooling:** npm workspaces + Turborepo (`apps/web`, `apps/platform`,
  `packages/database`, shared lint/tsconfig packages).
- **Target (not yet built) scale architecture:** AWS ECS Fargate autoscaling, PgBouncer
  connection pooling, Redis ElastiCache caching, BullMQ background workers (OTP/email
  delivery, payment webhook processing, audit-log batching), sized for a 5,000+ RPS /
  ~35,000 concurrent-session target. This is documented as an explicit target design, not
  current production infrastructure.

## 5. Current build status

- **Live today:** Core web app + API deployed (Vercel frontend, Render API), Postgres-backed,
  with working auth, role-based portals, CMS, and the onboarding/approval flows described
  above.
- **Not yet built:** the Redis/BullMQ/ECS scaling layer, and the telemetry capture pipeline
  behind `ConsentRecord`. The assessment/goals services currently expose simple CRUD reads;
  scoring/aggregation logic (the "Growth Radar" computation) is represented in the data model
  but its computation logic should be verified directly with the engineering team before
  describing it to counsel as an implemented algorithm.

## 6. Elements worth flagging to a patent attorney for novelty assessment

1. Single dual-token session shared transparently across role-partitioned wildcard
   subdomains, each independently enforcing role-route matching client- and server-side.
2. A unified account-status state machine that accommodates structurally different
   multi-step onboarding/approval workflows per actor type (self-service OTP vs.
   document-upload-plus-manual-review vs. bulk-CSV cohort provisioning) without branching
   into separate systems.
3. Per-modality, independently revocable consent architecture for assessment telemetry
   (audio / video / eye-gaze) as a first-class data model, ahead of the capture pipeline
   itself.
4. The dimensional-scoring-to-recommendation pipeline (assessment answers → named competency
   dimensions → radar visualization → course/mentor recommendation), once its actual
   computation logic is implemented and confirmed — currently the strongest *candidate* for a
   method claim, but needs verification of the real algorithm before drafting.

---
*Note: I'm not a patent attorney and this summary is not legal advice. It's a factual
technical description of the system as it exists in the repository today, intended to give
counsel an accurate starting point — actual claims and patentability should be assessed by a
qualified patent professional, and any "novel" items above should be checked against prior
art independently.*
