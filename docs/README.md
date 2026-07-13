# VEDHKRIT Platform Technical Documentation Hub

Central technical documentation for the **Vedhkrit Learner Development Platform**.

> ⚠️ **Read this first.** These documents fall into two very different categories:
>
> **What actually exists** — describes the system as it is built today:
> * **[Developer Setup Guide](./development-setup.md)** — start here on a new machine.
> * **[Deployment Guide](./deployment.md)** — how the live demo is hosted.
>
> **Target architecture (not built)** — `architecture_scale.md`, `subdomains_routing.md`,
> and `security_performance.md` describe AWS ECS, per-role subdomains, Redis, BullMQ,
> PgBouncer and a 5,000 RPS design. **None of that infrastructure exists.** Treat them as
> a destination to aim at, not a description of the current system. The platform today is
> a single NestJS API + one PostgreSQL database + a TanStack Start frontend.

---

## Start Here

### 0. [Developer Setup Guide](./development-setup.md)
* Complete local setup for a new machine: database, backend, frontend.
* Daily commands, team/branch workflow, and troubleshooting.
* An honest list of what's built vs. what's still mock data.

### 0b. [Deployment Guide](./deployment.md)
* How the live demo is deployed (Vercel + Render + managed Postgres).
* Environment variables, and how to seed a remote database safely.

---

## Documentation Directory Map

### 1. [Subdomain & Routing Architecture](./subdomains_routing.md)
* Details how the public landing site, backend APIs, and individual portals (Student, Parent, School, Mentor, Admin) are mapped to subdomains.
* Describes Nginx reverse proxy mappings, DNS (AWS Route 53) configurations, and SSL certificates handling.

### 2. [System Architecture & Scaling (RPS)](./architecture_scale.md)
* Outlines the tech stack details (TanStack Start frontend, NestJS backend, Prisma client, and PostgreSQL database).
* Specifies the load capacity calculations, peak Requests Per Second (RPS) metrics (designed for 5,000+ RPS), connection pooling, Redis caching, and horizontal ECS Fargate autoscaling guidelines.

### 3. [User & Actor Workflows](./user_flows.md)
* Documents the step-by-step onboarding, interaction, dashboard widgets, and transactional flows for all roles:
  * **Students:** Assessment, insights, learning pathways, and milestones tracker.
  * **Parents:** Child linking, progress overview notifications, and billing checkout.
  * **Schools:** Bulk registration, institution dashboard analytics, and cohort statistics.
  * **Mentors:** Profile review, expertise fields, and verification triggers.
  * **Admins/SuperAdmins:** Onboarding approval logs, CMS pages manager, and payment audits.

### 4. [Database Schema & ER Diagrams](./database_er_diagram.md)
* Contains the relational Entity-Relationship (ER) diagrams written in Mermaid formatting.
* Details the cardinality (1:1, 1:N, N:M), foreign keys, and indexes for authentication, profile schemas, payments, and page CMS tables.

### 5. [Security, Authentication & Load Balancing](./security_performance.md)
* Specifies authentication token lifecycles, wildcard cookie sharing policies, RBAC guards, rate limits, and stateless load balancing structures.

### 6. [Platform Walkthrough & Interactive Demo Guide](./platform_demo_guide.md)
* Provides a step-by-step walkthrough script for showing a demo of the website.
* Explains visual blocks, custom animations, transitions, and user portals section by section.

### 7. [Project Directory Map & File Architecture](./project_directory_map.md)
* Provides a complete directory tree of the monorepo workspace.
* Explains in detail what each and every file in the project folder does across all subdirectories.
