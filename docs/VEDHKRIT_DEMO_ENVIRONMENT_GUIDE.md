# Vedhkrit Learner Development OS — Demo Environment Guide
**Version:** v1.0.0  
**Classification:** Evaluator & Product Demonstration Master Guide  

---

## 1. Overview & Demo Environment URLs

This guide enables solution architects, sales engineers, product managers, and technical evaluators to perform end-to-end demonstrations of the **Vedhkrit Learner Development Operating System (v1.0.0)**.

- **Production Application URL:** `https://app.vedhkrit.com`
- **Staging / QA Application URL:** `https://staging.vedhkrit.com`
- **Local Sandbox URL:** `http://localhost:8080` (or `http://localhost:5173`)

---

## 2. Pre-Configured Demo Credentials

Evaluators can log in using the following role-based demo accounts:

| Portal | Role | Email | Password | Access Path |
| :--- | :--- | :--- | :--- | :--- |
| **Student Portal** | `student` | `student@vedhkrit.com` | `DemoPass123!` | `/dashboard/student` |
| **Parent Dashboard** | `parent` | `parent@vedhkrit.com` | `DemoPass123!` | `/dashboard/parent` |
| **Mentor Dashboard** | `mentor` | `mentor@vedhkrit.com` | `DemoPass123!` | `/dashboard/mentor` |
| **School Admin** | `admin` | `admin@dps.edu.in` | `DemoPass123!` | `/dashboard/admin` |
| **Super Admin** | `super` | `superadmin@vedhkrit.com` | `DemoPass123!` | `/dashboard/super` |

---

## 3. Pre-Populated Sample Datasets

### Sample Partner Institution
- **School Name:** Delhi Public School (Veda Partner Campus)
- **Location:** New Delhi, India
- **Plan Tier:** Enterprise Platform License (2,500 Student Capacity)
- **Active Students:** 1,250 | **Active Mentors:** 42 | **Overall Development Index:** `84.2 / 100`

### Sample Student Persona
- **Name:** Aarav Sharma (Grade 10 - Section A)
- **Academic Average:** `88.5%` | **Attendance Rate:** `96.0%` | **Streak Days:** `14 Days`
- **Cognitive Aptitude:** Logical-Mathematical & Spatial Reasoning (Stage 3 ILDF)

---

## 4. Step-by-Step Presentation Script

### Demo 1: Student Platform Walkthrough (5 Minutes)
1. **Login & Home:** Log in as `student@vedhkrit.com`. Point out the streak counter (`14 Days`), daily focus timer, and academic progress summary.
2. **Diagnostic Self-Assessment:** Click "Complete Self-Assessment" to open the interactive modal. Complete the questions to demonstrate real-time diagnostic score generation.
3. **Daily Planner & Veda AI:** Navigate to `/dashboard/student/planner`. Add a new study task ("Review Physics Formulas"). Click the Veda AI Assistant icon to ask career guidance questions.

### Demo 2: Parent Portal Walkthrough (3 Minutes)
1. **Login & Overview:** Log in as `parent@vedhkrit.com`. Highlight the child summary card for Aarav Sharma.
2. **Child Progress & Attendance:** Navigate to `/dashboard/parent/progress`. Show the academic trend chart, attendance graph, and teacher remarks.

### Demo 3: Mentor Dashboard Walkthrough (4 Minutes)
1. **Login & Cohort View:** Log in as `mentor@vedhkrit.com`. Point out the mentee cohort size (`24 Students`) and active risk alerts (`2 Urgent`).
2. **Action Plan Assignment:** Select a student card needing intervention and assign a personalized "Mathematics Foundations Plan".

### Demo 4: School Admin Portal Walkthrough (4 Minutes)
1. **Login & Analytics:** Log in as `admin@dps.edu.in`. Review the institution-wide development index (`84.2`), ILDF stage spread, and cognitive radar chart.
2. **Faculty Directory:** View the list of active teachers and assigned mentors.

### Demo 5: Super Admin Control Center Walkthrough (4 Minutes)
1. **Platform Telemetry:** Log in as `superadmin@vedhkrit.com`. Point out real-time stats (`15 Organizations`, `12,500 Students`, `4.28M Revenue`, `356K MRR`).
2. **Organization Provisioning:** Click "+ Add Organization". Fill out sample institute details ("Springdales School", Capacity 1,500) and click Create.
3. **Feature Flags & Global Broadcast:** Toggle physical lab access and broadcast a system-wide announcement message.

### Demo 6: Universal Report Export Demo (2 Minutes)
1. In any dashboard view, click the **"Export Data / Reports"** button.
2. Select **PDF**, **Excel**, **CSV**, or **Print** format in the `ExportModal`.
3. Click "Generate Report" to trigger downloadable report file creation.

### Demo 7: PWA & Offline Mode Demo (3 Minutes)
1. Open browser DevTools -> Network tab -> Check **"Offline"**.
2. Notice the yellow **Offline Status Banner** appearing at the top of the screen:  
   *"Working Offline Mode — Local cache enabled for assignments, notes & study resources."*
3. Create a new study note or assignment draft offline. Uncheck "Offline" in DevTools and watch automatic background synchronization trigger seamlessly.

### Demo 8: Security & RBAC Demo (2 Minutes)
1. While logged in as `student@vedhkrit.com`, attempt to navigate directly to `/dashboard/super`.
2. Demonstrate the **403 Access Forbidden Screen** preventing unauthorized role escalation.

---

## 5. Troubleshooting & Demo Reset

- **Reset Local Storage Cache:** If demo state becomes cluttered, open browser console and execute:
  ```javascript
  localStorage.clear();
  window.location.reload();
  ```
- **Force Service Worker Reload:** Click the `Update Now` toast banner or perform `Ctrl + Shift + R` (Hard Reload).

---

## 6. Frequently Asked Questions (FAQ)

- **Q: Does Vedhkrit require an internet connection at all times?**  
  *A: No. Vedhkrit is a Progressive Web App (PWA). Students can complete homework, take notes, and view study materials offline.*
- **Q: How does Vedhkrit handle data privacy?**  
  *A: Vedhkrit enforces zero-trust RBAC, TLS 1.3 encryption, automatic 15-minute idle logout, and CSP security headers.*

---

*End of Vedhkrit v1.0.0 Demo Environment Guide*
