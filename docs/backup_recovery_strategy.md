# Enterprise Backup & Disaster Recovery Strategy

This document outlines the backup procedures, recovery objectives, rollback plans, and disaster recovery checklists for the **Vedhkrit Learner Development Operating System**.

---

## 1. Recovery Objectives

- **Recovery Point Objective (RPO):** < 15 minutes (Database Point-In-Time Recovery)
- **Recovery Time Objective (RTO):** < 30 minutes (Automated Container Failover)

---

## 2. Database Backup Strategy (PostgreSQL & Redis)

### Automated Daily PostgreSQL Backups
- **Tool:** `pg_dump` with gzip compression & S3 upload.
- **Frequency:** Full daily backups at 01:00 UTC + WAL Archiving every 5 minutes.
- **Retention Policy:**
  - Hourly snapshots: Retained for 24 hours
  - Daily backups: Retained for 30 days
  - Monthly archives: Retained for 12 months (Encrypted AWS S3 Glacier)

### Redis Cache Persistence
- **Mode:** RDB Snapshots + AOF (Append-Only File) enabled.
- **Snapshot Frequency:** Every 15 minutes if at least 1 key changed.

---

## 3. Media & File Backup Strategy

- **Storage Target:** S3 / Cloudflare R2 Bucket (`vedhkrit-media-assets`).
- **Bucket Versioning:** Enabled.
- **Cross-Region Replication:** Asynchronous replication to secondary cloud region.

---

## 4. Rollback Plan

### Web Application Frontend (Vercel / Nginx Container)
1. **Vercel Deployment:** Instant one-click rollback to prior deployment hash via Vercel CLI or Dashboard (`vercel rollback`).
2. **Docker Container:** Update Nginx container image tag to previous stable image:
   ```bash
   docker compose -f docker-compose.prod.yml pull web
   docker compose -f docker-compose.prod.yml up -d web
   ```

### API Backend & Database Migrations
1. Revert API container to previous tagged image.
2. Rollback database schema migration using Prisma:
   ```bash
   npx prisma migrate resolve --rolled-back <migration_name>
   ```

---

## 5. Disaster Recovery Checklist

- [ ] **Step 1:** Confirm outage severity and declare DR state.
- [ ] **Step 2:** Redirect DNS traffic to secondary failover region (Cloudflare Traffic Steering / Route53).
- [ ] **Step 3:** Restore PostgreSQL database from latest S3 WAL archive.
- [ ] **Step 4:** Spin up Docker containers using `docker-compose.prod.yml`.
- [ ] **Step 5:** Verify HTTP healthcheck endpoints (`/healthz` returning `200 OK`).
- [ ] **Step 6:** Validate authentication & DB read/write operations.
- [ ] **Step 7:** Re-route production domain and issue DR Incident Report.
