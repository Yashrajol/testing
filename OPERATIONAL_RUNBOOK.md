# Vedhkrit Learner Development OS — Operational Runbook & Production Guide

**Document Version:** 1.0.0  
**Target Environment:** Production (AWS / Vercel / Docker / Managed Kubernetes)  
**Maintained By:** Vedhkrit Site Reliability & DevOps Engineering Team

---

## 1. Production Deployment Checklist

Before triggering a production release, complete every step in sequence:

- [x] **TypeScript Verification:** Execute `npx tsc --noEmit` across all workspace packages with zero errors.
- [x] **Unit & Integration Tests:** Run `npm run test` with statement coverage ≥90%.
- [x] **End-to-End Testing:** Execute Playwright E2E suites (`npx playwright test`) for all user flows.
- [x] **Environment Validation:** Verify `.env` production variables (`VITE_API_URL`, `DATABASE_URL`, `REDIS_URL`, `JWT_SECRET`, `JWT_REFRESH_SECRET`).
- [x] **Database Migration:** Confirm all Prisma schema migrations are applied (`npx prisma migrate status`).
- [x] **Redis Connectivity:** Verify Redis connection ping and password authorization.
- [x] **Multi-Stage Docker Build:** Build production container image using `Dockerfile`.
- [x] **Nginx Health Check:** Verify Nginx status returning `200 OK` on `/healthz`.
- [x] **Security Headers & CSP:** Verify HTTP security headers via `curl -I http://localhost`.
- [x] **PWA Manifest & Service Worker:** Confirm `/manifest.json` and `/sw.js` are reachable with `200 OK`.

---

## 2. Go-Live Checklist

- [x] **DNS Setup:** Map `app.vedhkrit.com` CNAME / A records to cloud load balancer.
- [x] **SSL Certificate:** Provision wildcard SSL certificate (TLS 1.3 / SHA256) via AWS ACM or Let's Encrypt.
- [x] **API Gateway & CORS:** Configure backend CORS whitelist to accept `https://app.vedhkrit.com`.
- [x] **RBAC Enforcement:** Test student, parent, mentor, admin, and super admin login roles.
- [x] **PWA Installation:** Verify App Install Banner and offline Service Worker fallback page (`/offline.html`).
- [x] **Report Exports:** Confirm PDF, Excel, CSV, and Print export generation.
- [x] **Structured Logging & Telemetry:** Confirm logs contain Request IDs and Correlation IDs.
- [x] **Disaster Recovery Backup:** Trigger initial manual database backup (`pg_dump`) to AWS S3 Glacier.

---

## 3. Administrator & User Guides Overview

### Student User Guide
1. **Login & Dashboard:** Log in with student credentials to view daily streak, focus timer, and upcoming assignments.
2. **Diagnostic Self-Assessment:** Complete academic diagnostic survey to unlock full portal features.
3. **Daily Planner & Veda AI:** Schedule study sessions and consult Veda AI Mentor for career guidance.

### Parent User Guide
1. **Child Progress:** Monitor child academic average, homework completion percentage, and attendance graphs.
2. **Diagnostic Reports:** View diagnostic scores and area improvement feedback.
3. **Mentor Communication:** Communicate with assigned student advisor.

### Mentor User Guide
1. **Cohort Progress:** Review weekly cohort performance indices and attendance trends.
2. **Action Plans:** Create and assign personalized growth plans for mentees.
3. **Risk Alerts:** Log intervention alerts for students needing academic or cognitive support.

### School Admin Guide
1. **Institution Telemetry:** Audit baseline cognitive dimensions, ILDF stage spread, and overall growth metrics.
2. **User Management:** Manage teacher, mentor, and student directories.
3. **Basic CMS:** Update school profile details and broadcast announcements.

### Super Admin Guide
1. **Platform Control Center:** Track overall system health, total organizations, active students, and MRR.
2. **Organization Onboarding:** Provision new institute accounts and configure student slot limits.
3. **Subscriptions & Feature Flags:** Adjust pricing tier rates and toggle feature availability.
4. **Global Notifications:** Broadcast platform notifications to targeted user segments.

---

## 4. Incident Response & Troubleshooting Guide

### Issue 1: High Latency / Slow Response Times
- **Symptom:** API latency exceeds 500ms.
- **Diagnostic:** Inspect Redis cache hit rate (`redis-cli info stats`).
- **Resolution:** Restart Redis container or flush stale key caches (`redis-cli FLUSHALL`).

### Issue 2: 401 Unauthorized / Infinite Refresh Loop
- **Symptom:** User redirected to `/login` repeatedly.
- **Diagnostic:** Inspect AuthStore JWT refresh token expiration in LocalStorage.
- **Resolution:** Verify system clock synchronization across API nodes and check `JWT_REFRESH_SECRET`.

### Issue 3: PWA Offline Fallback Triggers Online
- **Symptom:** Offline indicator displayed while user is connected.
- **Diagnostic:** Check Service Worker state in browser DevTools -> Application -> Service Workers.
- **Resolution:** Trigger Service Worker update reload banner (`useSwUpdate.reloadApp()`).
