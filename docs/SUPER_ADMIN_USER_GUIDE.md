# Vedhkrit Learner Development OS — Super Administrator Guide
**Version:** v1.0.0  
**Target Audience:** Platform Operations, Executive SREs & Super Admin Operators  
**Access Portal:** `https://app.vedhkrit.com/dashboard/super`  

---

## Welcome to the Platform Control Center

As a Super Admin Operator, you possess top-level operational authority over the **Vedhkrit Learner Development Operating System**. This guide provides complete operational procedures for managing partner institutions, subscription monetization, global broadcasts, security audits, and system health.

---

## 1. Platform Telemetry Overview (`/dashboard/super`)

Your control center dashboard provides real-time multi-tenant telemetry:
- **Total Organizations:** Active partner school campuses (`15 Institutions`).
- **Total Platform Students:** Enrolled student learners (`12,500 Students`).
- **Platform Financials:** Total gross revenue (`₹4.28M`) and Monthly Recurring Revenue (`₹356K MRR`).
- **System Infrastructure Status:** Database connection, Redis queue, and API server uptime status (`healthy`).

---

## 2. Organization Provisioning (`/dashboard/super/schools`)

1. Navigate to **Organizations & Schools**.
2. Click **"+ Add Organization"**.
3. Enter institution details:
   - School Name (e.g., *Springdales Public School*)
   - City & Campus Location
   - Subscription Plan Tier (*Basic*, *Standard*, *Enterprise*)
   - Allocated Student Capacity (e.g., *1,500 slots*)
   - Designated Administrator Email
4. Click **"Provision Organization"**.

---

## 3. Administrator Management & RBAC Control (`/dashboard/super/users`)

1. Click **User & Admin Directory** in the sidebar.
2. View, filter, or revoke access for School Administrators, Mentors, and Teachers across partner campuses.
3. Manage role assignments (`super`, `admin`, `mentor`, `teacher`, `student`, `parent`).

---

## 4. Subscriptions, Billing & Rate Adjustments (`/dashboard/super/subscriptions` & `/revenue`)

1. Select **Subscriptions & Revenue** from the menu.
2. Adjust plan pricing tiers, billing cycles (Monthly vs. Annual), and custom enterprise rates.
3. Track active institution renewal dates, overdue invoices, and MRR growth trends.

---

## 5. Feature Flags & White-Label Controls

1. Navigate to **Feature Flags & Settings**.
2. Toggle platform capabilities per institution:
   - **Veda AI Guidance Assistant** (On/Off)
   - **Physical Lab Integration** (On/Off)
   - **Custom White-Label Branding** (On/Off)

---

## 6. Global Broadcast Center

1. Click **Global Notifications** in the sidebar.
2. Dispatch system-wide announcements to target user segments (**All Users**, **School Admins Only**, **Mentors Only**, **Students Only**).
3. Set alert priority level (*Informational*, *Warning*, *Maintenance Downtime*).

---

## 7. Audit Logging & Security Operations (`/dashboard/super/activity`)

1. Select **Audit Logs & Security Activity**.
2. Filter interaction records by timestamp, user ID, IP address, or action type (e.g., *Role Escalation*, *Organization Provisioned*, *Report Exported*).
3. Export audit logs for compliance reviews.

---

## 8. System Health, Infrastructure & Monitoring

View live telemetry metrics:
- **API Response Latency:** Target < 50ms (Current: `42ms`).
- **PWA Service Worker Cache Hit Rate:** Current `94.1%`.
- **Database Connection Pool:** `99.98% OK`.
- **Redis Cache & Queue Health:** `Active`.

---

## 9. Backup & Disaster Recovery Procedures

- **Automated PostgreSQL Snapshots:** Full daily backups at 01:00 UTC + 5-minute WAL archiving to S3 Glacier.
- **RPO Target:** < 15 minutes | **RTO Target:** < 30 minutes.
- **Manual DR Failover Command:**
  ```bash
  docker compose -f docker-compose.prod.yml up -d --force-recreate
  ```

---

## 10. Troubleshooting & Security Incident Escalation

- **High Memory Alarm:** Inspect Redis key expiration policies or execute cache cleanup.
- **Unauthorized Escalation Attempt:** Revoke target JWT token immediately via Super Admin User Control.

---
*End of Vedhkrit Super Administrator Guide — Version 1.0.0*
