# System Architecture & Scaling Projections

This document details the software architecture, design principles, database configurations, and performance metrics targeting load thresholds of **5,000+ Requests Per Second (RPS)**.

---

## 1. Technical Stack Architecture

The monorepo splits concerns into highly specialized layers:

```
+--------------------------------------------------------------+
|                     1. CLIENT ENVIRONMENT                    |
|  - TanStack Start (React 19 + Vite 8 + Tailwind CSS v4)      |
|  - Charts: Recharts Engine                                   |
+--------------------------------------------------------------+
                               |
                               | (HTTPS / Wildcard Cookies)
                               v
+--------------------------------------------------------------+
|                     2. API GATEWAY ROUTER                    |
|  - AWS Application Load Balancer (Routing by Host Domain)    |
+--------------------------------------------------------------+
                               |
                               | (Internal Subnet VPC)
                               v
+--------------------------------------------------------------+
|                     3. PLATFORM CORE SERVER                  |
|  - NestJS REST Framework (TypeScript, stateless, clustering) |
|  - Background Workers: BullMQ (Redis-backed Queue)           |
+--------------------------------------------------------------+
             |                                    |
             | (Prisma ORM Client)                | (Redis Client)
             v                                    v
+------------------------+              +----------------------+
|  4. RELATIONAL DATABASE |              |    5. CACHE LAYER    |
| - PostgreSQL (RDS v15) |              | - Redis ElastiCache  |
| - Connection: PgBouncer|              | - TTL: 1 hr (CMS)    |
+------------------------+              +----------------------+
```

---

## 2. Load Projections & Scaling Calculations (5,000+ RPS Target)

To robustly support 5,000 Requests Per Second (RPS) under peak concurrent loads (e.g. bulk diagnostic assessment releases across school boards), the infrastructure is engineered with the following thresholds:

### 2.1 Traffic Mathematics
* **Peak Requests Per Second (RPS):** 5,000
* **Peak Requests Per Minute (RPM):** 300,000
* **Estimated Concurrent Users:** ~35,000 active sessions (assuming average click-depth of 1 request every 7 seconds).

### 2.2 Response Time Budgets
* **Cached Reads (CMS/Pricing lists):** `< 30ms` (served from Redis Cache).
* **Authenticated Reads (Dashboard view):** `< 75ms` (indexed database reads).
* **Write transactions (Auth registrations/Payments):** `< 150ms` (transactional commits).

### 2.3 Database Sizing & Connection Pooling
* A single PostgreSQL instance cannot easily handle 5,000 direct socket connections due to thread overhead.
* **PgBouncer Proxy Deployment:** Deployed between the NestJS app servers and RDS to handle connection pooling. It caps database server sockets to a pool size of **250 active connections**, multiplexing thousands of incoming client requests.
* **Database Indexing:** Composite indexes are placed on:
  * `User(email, role)`
  * `Session(refreshToken)`
  * `StudentProfile(parentLinkId)`
  * `Transaction(orderId, paymentId)`
  These indices keep index scan times to `< 5ms`.

### 2.4 Redis Caching Rules & TTLs
To protect the database, read queries are aggressively cached:
* **CMS Sections (`/api/v1/cms/*`):** Cached in Redis with a TTL of **1 Hour**. Landing page hits generate **0 database queries**.
* **Pricing Plans Info:** Cached with a TTL of **12 Hours** (updates are pushed to Redis on Admin plan modifications).
* **Target Cache Hit Ratio:** **`> 82%`**.

### 2.5 Horizontal Container Autoscaling (ECS Fargate)
* **Instance Sizing:** Each NestJS server container runs on ECS Fargate allocated with **1 vCPU and 2GB RAM**.
* **Autoscaling Triggers:**
  * **Scale-Out Trigger:** Spawns new containers when average CPU utilization exceeds **65%** or memory exceeds **75%** for more than 2 consecutive minutes.
  * **Autoscaling Capacity Range:**
    * **Minimum Instance Count:** 3 instances (across different Availability Zones for high availability).
    * **Maximum Peak Capacity:** 25 instances (handling peak load of 5,000+ RPS).

---

## 3. Background Message Queuing: BullMQ & Redis

Asynchronous workflows are offloaded from the main HTTP thread to background workers using **BullMQ**:

1. **OTP & Verification Mail Delivery:** Offloaded to a background queue. On registration, NestJS emits a job payload to Redis, returning `201 Created` instantly to the user while the worker delivers the email asynchronously via Amazon SES.
2. **Payment Validation Webhooks:** Offloaded to check signature parameters, record transactions, activate memberships, and mail invoices without blocking HTTP request threads.
3. **Audit Log Flushing:** High-volume user actions write logs to a memory queue, which flushes to PostgreSQL in batches of 50 records, keeping I/O write operations low.
