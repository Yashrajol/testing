# Subdomain & Routing Architecture

This document specifies the routing infrastructure, DNS configurations, and multi-tenant portal subdomain mapping for Vedhkrit.

---

## 1. Subdomain Mappings

To provide a tailored workspace for each role, the platform isolates components into role-specific subdomains while maintaining a unified backend API gateway.

| Domain Name | Target Component | Description / Function |
| :--- | :--- | :--- |
| `vedhkrit.com` / `www.` | **Public Landing Site & CMS** | Marketing homepage, about pages, pathway details, contact forms. Runs on TanStack Start server. |
| `student.vedhkrit.com` | **Student Portal Dashboard** | Student progress trackers, growth radar charts, learning modules, strengths lists. |
| `parent.vedhkrit.com` | **Parent Portal Dashboard** | Child performance metrics, invoice billing logs, and linked account settings. |
| `school.vedhkrit.com` | **School Admin Console** | Cohort management, bulk student uploads, institution analytics, licensing. |
| `mentor.vedhkrit.com` | **Mentor Workspace** | Expert profile settings, expertise selections, student matches, session management. |
| `admin.vedhkrit.com` | **Ops Administration Console** | Approvals review queue (for Mentors/Schools), plan editors, transaction logs, lead exports. |
| `api.vedhkrit.com` | **NestJS Core REST Engine** | REST Endpoints servicing JWT auth, database mutations, checkout processing. |

---

## 2. Infrastructure Routing Topology

The architecture uses **AWS Route 53** for DNS resolution, forwarding queries to an **Application Load Balancer (ALB)**, which distributes traffic to **ECS Fargate Containers** based on host routing header rules.

```
                    [ USER BROWSER ]
                           |
                           v  (DNS Query)
                   [ AWS Route 53 ]
                           |
                           v  (wildcard SSL: *.vedhkrit.com)
             [ AWS Application Load Balancer ]
                           |
            +--------------+--------------+
            | (Host: api.*)               | (Host: student.*, parent.*, etc.)
            v                             v
  [ NestJS ECS Cluster ]        [ TanStack Start ECS Cluster ]
  - Container Port: 5000        - Container Port: 3000
  - Autoscale: CPU > 70%        - Autoscale: CPU > 70%
```

---

## 3. Session Sharing & JWT Cookie Scopes

Because all user portals share the root domain `vedhkrit.com`, we use a **wildcard cookie strategy** to implement single-sign-on (SSO) and permit roles to transition between subdomains cleanly.

### Wildcard Token Setups
1. **Cookie Configuration:** On login (`POST api.vedhkrit.com/api/v1/auth/login`), the backend sets the `refresh_token` HTTP-Only cookie with a wildcard domain:
   ```http
   Set-Cookie: refresh_token=jwt_value_here; Domain=.vedhkrit.com; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=604800
   ```
2. **Access Token Sharing:** Since `Domain=.vedhkrit.com` is configured, when a parent switches subdomains from `parent.vedhkrit.com` to `student.vedhkrit.com` (to review their child's profile), the browser automatically transmits the cookie token to the new host.
3. **Subdomain Redirection Logic:** The frontend root routing check evaluates the decoded token's `role` property:
   - If a Student logs in on `vedhkrit.com/login`, they are redirected to `student.vedhkrit.com`.
   - If an Administrator attempts to load `student.vedhkrit.com`, the routing guard redirects them back to `admin.vedhkrit.com` to prevent permission cross-talk.

---

## 4. Nginx Reverse Proxy Profile (Local Docker Development)

For local development, we mirror this subdomain structure using an Nginx reverse proxy routing profiles setup inside a docker configuration.

```nginx
# devops/nginx.conf

# 1. API Route Gateway Routing
server {
    listen 80;
    server_name api.vedhkrit.local;

    location / {
        proxy_pass http://platform:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

# 2. Public Frontend and Dynamic Portals Routing
server {
    listen 80;
    server_name vedhkrit.local *.vedhkrit.local;

    location / {
        proxy_pass http://web:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-Host $host;
    }
}
```

To run this locally, the development team appends wildcard domains mapping to `127.0.0.1` inside their local HOSTS file:
```hosts
127.0.0.1 vedhkrit.local
127.0.0.1 api.vedhkrit.local
127.0.0.1 student.vedhkrit.local
127.0.0.1 parent.vedhkrit.local
127.0.0.1 school.vedhkrit.local
127.0.0.1 mentor.vedhkrit.local
127.0.0.1 admin.vedhkrit.local
```
