# User & Actor Workflows

This document details the step-by-step user journeys and portal page flows for each distinct actor on the Vedhkrit platform.

---

## 1. Student Workflow

The student is the primary learner. Their flow focuses on discovery, assessment, and metric tracking.

```
[Register] -> [OTP Check] -> [Grade Setup] -> [Dashboard Hub] -> [Start Assessment] -> [Track Growth]
```

1. **Registration:**
   * Student visits `vedhkrit.com` and registers via email, password, and name.
   * Redirected to `/verify-otp` where they submit the code delivered via email.
2. **Onboarding Profile:**
   * After verification, the account status changes from `PENDING_VERIFICATION` to `ONBOARDING`.
   * Prompted to submit their **Academic Grade** (e.g., 9th, 10th grade) and school name.
   * Upon submission, status shifts to `ACTIVE` and they are redirected to `student.vedhkrit.com`.
3. **Dashboard Experience:**
   * Displays the **Interactive Growth Radar Chart** representing strengths (Analytical, Communication, Problem Solving).
   * Renders **Recommended Courses** based on strengths.
   * Displays the **8-step process timeline node** tracking their path.

---

## 2. Parent Workflow

Parents act as sponsors and progress reviewers.

```
[Register] -> [OTP Check] -> [Link Child ID] -> [Payment Checkout] -> [View Child Growth Radar]
```

1. **Linking Child:**
   * Registers on `parent.vedhkrit.com`.
   * Enters the unique email address or Student ID of their child.
   * The system links the `ParentProfile` to the child's `StudentProfile` (1:N relationship).
2. **Subscription & Payment Flow:**
   * Parent navigates to the **Subscription Plan** page.
   * Selects a plan (Verve Path) and clicks "Checkout".
   * Initiates the **Razorpay Payment Gateway Overlay**.
   * On webhook payment validation, access is granted.
3. **Monitoring:**
   * Renders a synchronized dashboard duplicating the child's growth line charts, radar grids, and advisor recommendations.

---

## 3. School Admin Workflow

Schools onboarding cohorts of students require manual identity verification.

```
[Register] -> [Board/Address Form] -> [Upload License File] -> [PENDING APPROVAL State] -> [Approved] -> [Bulk Upload CSV]
```

1. **Institution Registration:**
   * Admin registers on `school.vedhkrit.com`.
   * Enters board details (CBSE, ICSE, IB), school address, and uploads their licensing document.
   * Account status remains `PENDING_APPROVAL`, restricting access to analytics dashboard.
2. **Approval Step:**
   * Administrator evaluates the documents and changes the status to `APPROVED`.
3. **Cohort Management:**
   * Once active, the school admin can bulk-upload students using a standard `.csv` file.
   * Generates login credentials automatically for students.
   * Accesses dashboard metrics detailing average class scores and cohort progress.

---

## 4. Mentor Workflow

Mentors deliver expert guidance and review aptitude roadmaps.

```
[Register] -> [Expertise Tags] -> [Upload CV URL] -> [PENDING APPROVAL State] -> [Approved] -> [Student Match Lounge]
```

1. **Mentor Onboarding:**
   * Mentor registers on `mentor.vedhkrit.com`.
   * Selects expertise tags (e.g., "Math", "Science", "Career counseling") and submits their CV link.
   * Enters `PENDING_APPROVAL` status.
2. **Admin Review:**
   * System administrator reviews the CV and approves the profile.
3. **Mentoring Lounge:**
   * Accesses matching interface displaying students seeking help in their expertise area.

---

## 5. Operations Administrator Workflow

Admins manage platform parameters and onboarding reviews.

```
[Admin Login] -> [Approvals Review Queue] -> [CMS Page Editor] -> [View Transaction Logs]
```

1. **Approvals Console:**
   * Logs in at `admin.vedhkrit.com`.
   * Accesses the **Approvals Queue** showing pending registrations for schools and mentors.
   * Clicks "Approve" or "Reject" (triggering email notifications to users).
2. **CMS Block Manager:**
   * Reviews all page layouts (`CmsPage`) and sections.
   * Modifies text, lists, logos, and process cards, which update the frontend database cache.
3. **Financial Auditing:**
   * Monitors `Transaction` tables in real time to resolve failed Razorpay checkouts.
