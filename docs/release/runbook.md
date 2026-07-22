# Operations & Disaster Recovery Runbook - Version 1.0

This runbook covers system management operations for maintaining, migrating, and recovering Vedhkrit in production.

---

## 1. Database Migrations & Rollback

### Running Migrations
Always perform migrations in off-peak hours:
```bash
npx prisma migrate deploy --schema ./prisma/schema/schema.prisma
```

### Rollback Strategy
If a migration fails mid-deployment:
1. Restore database from pre-deployment snapshot (AWS RDS / GCP Cloud SQL backup).
2. Revert the repository main code tag:
   ```bash
   git checkout <previous-release-tag>
   ```
3. Restart containers.

---

## 2. Backup & Restore Routine
- **Database Backup**: Automated daily snapshot at 02:00 UTC with 30-day retention policies.
- **S3 User Assets**: Cross-region replication enabled on AWS S3 buckets.

---

## 3. Incident Management & Scaling
- **High CPU Load**: Auto-scale API pods when CPU usage exceeds 75% for 3 consecutive minutes.
- **Out of Memory (OOM)**: Validate Node memory heap configurations (`--max-old-space-size=2048`).
- **Redis Cache Flush**: To clear all application caches:
  ```bash
  redis-cli FLUSHALL
  ```
