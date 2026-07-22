# Security, Authentication, & Load Balancing Specification

This document details the security layers, Role-Based Access Control (RBAC) mechanisms, stateless load balancing structures, and authentication protocols implemented across the Vedhkrit platform.

---

## 1. Authentication & Session Security

To prevent session interception and guarantee standard compliance, Vedhkrit implements a dual-token JWT lifecycle.

```
+------------------+                   +------------------+
|  CLIENT ROUTER   |                   |    NESTJS API    |
+------------------+                   +------------------+
         |                                       |
         | --- 1. POST /auth/login ------------> | (Verifies bcrypt hash)
         |                                       |
         | <--- 2. Returns AccessToken (JSON) -- | (Sets RefreshToken Cookie)
         |         - Exp: 15 minutes             |  - Exp: 7 days
         |                                       |  - Domain: .vedhkrit.com
         |                                       |  - HttpOnly, Secure, Lax
         |                                       |
         | --- 3. Requests Portal Resource ----> | (Validates AccessToken)
         |                                       |
```

### 1.1 Token Transport Parameters
* **Access Tokens (Memory Only):** Transported via the HTTP `Authorization: Bearer <token>` header. Never stored in local storage to prevent Cross-Site Scripting (XSS) extraction. Expires in **15 minutes**.
* **Refresh Tokens (Secure Cookie):** Transported via HTTP-only, secure, SameSite=Lax cookies, scoped to the wildcard domain `Domain=.vedhkrit.com`. This allows subdomains (`student.vedhkrit.com`, `parent.vedhkrit.com`, etc.) to automatically exchange the cookie for a fresh access token without user prompt. Expires in **7 days**.

### 1.2 Brute-Force Rate Limiting
To prevent brute-force attacks on identity verification routes, NestJS employs a rate-limiter:
* **Authentication Routes (`/api/v1/auth/*`):** Capped at 5 login attempts per IP address every 60 seconds.
* **OTP Request Route (`/api/v1/auth/otp/*`):** Capped at 3 code generations per phone/email every 15 minutes.

---

## 2. Role-Based Access Control (RBAC) & Route Protection

RBAC is enforced programmatically at both the backend gateway (NestJS) and frontend router (TanStack Start).

### 2.1 Backend Guard Interceptors
In NestJS (`apps/api`), we define a custom `@Roles()` metadata decorator paired with a global `RolesGuard` processor:

```typescript
// Example NestJS Roles Guard (Conceptual Implementation)
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user; // Set by JwtAuthStrategy after parsing Bearer Token
    
    return requiredRoles.includes(user.role);
  }
}
```

* **Guard Assignment:** Endpoints are protected via decorators, preventing cross-tenant request forgery:
  ```typescript
  @Controller('admin/approvals')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  export class ApprovalsController { ... }
  ```

### 2.2 Frontend Route Shields
The TanStack Start router in `apps/web/src/routes/` uses route guards inside page loaders:
* If a client requests `/dashboard/student` but their active session token decodes as `role: PARENT`, the routing guard performs a client-side redirect to `parent.vedhkrit.com` or triggers an error alert.

---

## 3. Load Balancing & Performance Topologies

To guarantee responsive availability under high concurrences (5,000+ RPS), the server topology remains entirely **stateless**.

### 3.1 stateless nodes
* **Zero Session Sticky Dependency:** All Application Load Balancer (ALB) target groups are configured with sticky sessions disabled. Client requests can land on any container instance in the ECS cluster.
* **Shared Storage State:** Session invalidations and background task coordination (BullMQ) run against the shared **Redis ElastiCache Cluster**. No local file cache is used for user state.

### 3.2 Network Load Balancer (NLB) & Application Load Balancer (ALB) Sizing
* **DNS Routing:** AWS Route 53 routes wildcard requests (`*.vedhkrit.com`) to the ALB.
* **Connection Draining:** ALB targets use a **15-second connection draining timeout**, allowing active HTTP transactions to complete during horizontal autoscaling scale-in cycles.
* **Keep-Alive Configuration:** Keep-alive timeout is set to 65 seconds on both the ALB and NestJS server Express adapters to minimize socket handshake overhead.
