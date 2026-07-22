# Production Release Checklist - Version 1.0

This formal checklist lists the pass/fail requirements before deploying Vedhkrit to production.

---

## 1. Security Checklist
- [ ] **JWT Verification**: Tokens sign using asymmetric RS256/ES256 algorithms. Secret keys managed inside AWS Secrets Manager / Vault.
- [ ] **RBAC Audits**: Verify route guards reject unauthorized actions.
- [ ] **Rate Limiting**: Throttler limits requests per IP/org on APIs.
- [ ] **Security Scans**: Run dependency scans (`npm audit`).

---

## 2. Performance & Reliability Checklist
- [ ] **Database Indices**: Verify foreign keys have indexing mapped to prevent slow queries.
- [ ] **N+1 Detections**: Inspect Prisma includes to ensure batch queries.
- [ ] **Redis Connection**: Check connection timeout parameters and pool sizes.
- [ ] **RabbitMQ Queue**: Verify dead-letter-exchange (DLX) queues are configured.

---

## 3. Deployment & Testing Checklist
- [ ] **Test Coverage**: Validate unit and integration test coverage.
- [ ] **Build Validation**: Verify Docker builds succeed.
- [ ] **OpenAPI Spec**: Verify Swagger endpoints load cleanly.
