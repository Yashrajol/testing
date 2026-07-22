# VEDHKRIT

Integrated learner development platform — assessment, mentoring, career guidance, and
portals for students, parents, mentors, teachers, schools, and admins.

**New to the project? → [docs/development-setup.md](docs/development-setup.md)** — full
setup for a new machine (database, backend, frontend), team workflow, and known gotchas.

---

## Quick start

Requires **Docker Desktop**. You do not need to install PostgreSQL or Node.

```bash
git clone https://github.com/SARTHAKSONAWANE01/VEDHKRIT.git
cd VEDHKRIT

# 1. Create your env file — docker compose FAILS without this
cp apps/api/.env.example apps/api/.env

# 2. Start Postgres + API + web
docker compose up -d --build

# 3. Create the tables (the database starts empty)
docker exec vedhkrit-api npm run db:push --workspace=@vedhkrit/database

# 4. Seed demo data + accounts
docker exec vedhkrit-api npm run db:seed --workspace=@vedhkrit/database
```

Open **http://localhost:8080** and sign in as `student@vedhkrit.com` / `password123`.

| | URL |
| :--- | :--- |
| Frontend | http://localhost:8080 |
| API | http://localhost:5000 |
| Postgres | `localhost:5432` |

All seeded accounts (`student@`, `parent@`, `mentor@`, `teacher@`, `school@`, `admin@`,
`super@` — all `@vedhkrit.com`) use `password123` **locally only**. Deployed environments
set real passwords via env vars.

---

## Repository layout

```
apps/
  web/                TanStack Start (React 19, Vite, Tailwind v4) — site + all dashboards
  api/                NestJS REST API — auth, RBAC, portals, CMS
packages/
  database/           Prisma schema, shared client, seed script
  eslint/             Shared ESLint config
  tsconfig/           Shared tsconfig
```

npm workspaces + Turborepo. One `npm install` at the root covers everything.

---

## Documentation

| Doc | What's in it |
| :--- | :--- |
| **[development-setup.md](docs/development-setup.md)** | **Start here.** Local setup, daily commands, team workflow, troubleshooting. |
| [deployment.md](docs/deployment.md) | Deploying to Vercel + Render, env vars, seeding a remote database. |
| [database_er_diagram.md](docs/database_er_diagram.md) | ER diagram. *Predates the newer learning models — partially stale.* |
| [user_flows.md](docs/user_flows.md) | Intended journeys per role. |
| [architecture_scale.md](docs/architecture_scale.md), [subdomains_routing.md](docs/subdomains_routing.md), [security_performance.md](docs/security_performance.md) | **Aspirational target architecture** (AWS ECS, subdomains, Redis, BullMQ, 5,000 RPS). **Not built.** Read as a destination, not a description. |

---

## Deployments

`main` auto-deploys on push.

| | |
| :--- | :--- |
| Frontend | https://vedhkrit-web.vercel.app *(Vercel)* |
| API | https://vedhkrit-api.onrender.com *(Render)* |

> The API runs on a free tier that sleeps when idle — the first request after a quiet
> period takes 30–60s to wake up.

---

## Contributing

Branch off `main`, open a PR. **Do not force-push, rebase, or amend pushed commits** —
this repo syncs with Lovable and history rewrites can lose project history.
