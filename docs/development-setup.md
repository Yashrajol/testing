# Developer Setup Guide

Everything you need to get VEDHKRIT running on a new machine — database, backend,
and frontend. Start here.

---

## 1. What you're working on

Three moving parts. They run together, but they're separate programs:

```
   Browser
      │
      ▼
┌──────────────────┐   HTTP (JSON)   ┌────────────────────┐   SQL    ┌──────────────┐
│  apps/web        │ ──────────────► │  apps/platform     │ ───────► │  PostgreSQL  │
│  TanStack Start  │                 │  NestJS REST API   │          │              │
│  React 19 + Vite │ ◄────────────── │  JWT auth, RBAC    │ ◄─────── │  (Docker)    │
│  :8080           │                 │  :5000             │          │  :5432       │
└──────────────────┘                 └────────────────────┘          └──────────────┘
                                              │
                                              │ Prisma ORM
                                              ▼
                                     packages/database
                                     (schema.prisma + seed)
```

| Path | What it is |
| :--- | :--- |
| `apps/web` | The website + all dashboards. TanStack Start (React 19, Vite, Tailwind v4). |
| `apps/platform` | The API. NestJS + Prisma. Auth, portals, CMS. |
| `packages/database` | The Prisma schema, the shared client, and the seed script. **Both apps depend on this.** |
| `packages/eslint-config`, `packages/typescript-config` | Shared configs. |

It's an **npm workspaces monorepo** driven by **Turborepo**. One `npm install` at the
root installs everything.

---

## 2. Access you'll need from the team

Everything in this guide runs **fully locally** — you can build features without any of
the below. You only need these for the things listed:

| Access | Needed for | Ask for |
| :--- | :--- | :--- |
| **GitHub repo** | Anything. Pushing branches, opening PRs. | Collaborator invite. |
| **Live demo logins** | Signing in to the deployed demo at vedhkrit-web.vercel.app. | The demo password (shared privately — it is deliberately **not** in this repo). |
| **Render dashboard** | Seeing API logs, env vars, restarting the deployed API. | Team invite on Render. |
| **Vercel dashboard** | Frontend deploys and build logs. | Team invite on Vercel. |

**Secrets are never committed to this repo** — no production passwords, database URLs,
or JWT secrets are in git, and they must not be added. If you need one, ask for it
directly. Local development uses throwaway defaults (see `apps/platform/.env.example`).

---

## 3. Prerequisites

| Tool | Version | Notes |
| :--- | :--- | :--- |
| **Docker Desktop** | any current | The only *required* way to run Postgres. |
| **Node.js** | 22 LTS | Only needed if you run things outside Docker. |
| **Git** | any | |

You do **not** need to install PostgreSQL. Docker provides it.

---

## 4. First-time setup

```bash
git clone https://github.com/SARTHAKSONAWANE01/VEDHKRIT.git
cd VEDHKRIT
```

### Step 1 — Create your `.env` (do this first)

`apps/platform/.env` is **gitignored**, so it is not in your clone. Docker Compose
reads it, and **`docker compose up` fails outright if it's missing.** Copy the
template:

```bash
cp apps/platform/.env.example apps/platform/.env
```

The defaults work as-is for local development. Nothing to edit.

### Step 2 — Start everything

```bash
docker compose up -d --build
```

This builds one shared image and starts three containers:

| Container | URL | What |
| :--- | :--- | :--- |
| `vedhkrit-web` | http://localhost:8080 | Frontend (hot reload) |
| `vedhkrit-api` | http://localhost:5000 | API (hot reload) |
| `vedhkrit-db` | `localhost:5432` | PostgreSQL |

First build takes a few minutes. Later starts are seconds.

### Step 3 — Create the database tables

**The database is empty on a fresh machine.** There are no Prisma migrations in this
repo (see [Known gaps](#8-known-gaps--gotchas)), so the schema is applied directly
from `schema.prisma`:

```bash
docker exec vedhkrit-api npm run db:push --workspace=@vedhkrit/database
```

### Step 4 — Seed the demo data

```bash
docker exec vedhkrit-api npm run db:seed --workspace=@vedhkrit/database
```

This creates 7 user accounts, pricing plans, assessments, goals, mentor sessions,
and CMS content.

> ⚠️ **The seed script wipes every table before inserting.** It is not additive.
> Don't run it once you have local data you care about.

### Step 5 — Check it works

Open **http://localhost:8080** and sign in.

**Local login — every account uses the password `password123`:**

| Email | Role |
| :--- | :--- |
| `student@vedhkrit.com` | STUDENT |
| `parent@vedhkrit.com` | PARENT |
| `mentor@vedhkrit.com` | MENTOR |
| `teacher@vedhkrit.com` | TEACHER |
| `school@vedhkrit.com` | SCHOOL_ADMIN |
| `admin@vedhkrit.com` | ADMIN |
| `super@vedhkrit.com` | SUPERADMIN |

`password123` is a **local-only** default. Deployed environments set real passwords
via `SEED_DEMO_PASSWORD` / `SEED_ADMIN_PASSWORD`, and the seed script refuses to run
against a non-local database without them.

---

## 5. Day-to-day commands

All of these run against the containers, so you don't need Node locally.

```bash
# Start / stop
docker compose up -d
docker compose down

# Watch logs (this is where API errors and OTP codes appear)
docker compose logs -f api
docker compose logs -f web

# Rebuild after changing package.json / adding a dependency
docker compose up -d --build

# Database
docker exec vedhkrit-api npm run db:push     --workspace=@vedhkrit/database  # apply schema changes
docker exec vedhkrit-api npm run db:seed     --workspace=@vedhkrit/database  # reset + reseed (WIPES DATA)
docker exec vedhkrit-api npm run db:generate --workspace=@vedhkrit/database  # regenerate Prisma client

# Open a SQL shell
docker exec -it vedhkrit-db psql -U postgres -d vedhkrit
```

**Hot reload works in both containers.** Edit a file on your machine and the running
container picks it up — no restart needed. (Bind-mount file watching on Windows needs
polling; that's already configured in `docker-compose.yml`.)

**When you change `schema.prisma`**, run `db:push` and then `db:generate`, or the
TypeScript types won't match the database.

---

## 6. Running without Docker (optional)

Only Postgres genuinely needs Docker. If you prefer running the apps natively:

```bash
docker compose up -d postgres     # database only
npm install                       # root — installs all workspaces
npm run db:generate --workspace=@vedhkrit/database
npm run dev                       # turbo runs web + api together
```

Requires Node 22 LTS. The `.env` you created in Step 1 already points at
`localhost:5432`, which is what a natively-run API needs.

---

## 7. Environment variables

| Variable | Where | What it does |
| :--- | :--- | :--- |
| `DATABASE_URL` | API | Postgres connection. Compose overrides it to the `postgres` service; the `.env` value is for native runs. |
| `JWT_SECRET` | API | Signs auth tokens. **The API refuses to issue tokens without it.** |
| `PORT` | API | Defaults to 5000. |
| `WEB_ORIGIN` | API | Allowed CORS origin. Only needed in deployed environments. |
| `DEMO_MODE` | API | `true` = new signups skip OTP and activate instantly. Keep `false` locally. |
| `VITE_API_URL` | Web | Where the frontend sends API calls. Defaults to `http://localhost:5000`. |

`.env` files are gitignored. **Never commit real secrets.** If you add a new variable,
add it to `apps/platform/.env.example` too so the rest of the team knows it exists.

---

## 8. Team workflow

`main` is the deployed branch — **pushing to it redeploys production** (Vercel + Render
auto-deploy on push).

```bash
git checkout main
git pull
git checkout -b your-feature-branch
# ... work ...
git push -u origin your-feature-branch
```

Then open a Pull Request into `main`.

> ⚠️ This repo is connected to **Lovable**. Do not force-push, rebase, amend, or squash
> commits that are already pushed — it rewrites history on Lovable's side and can lose
> project history.

**Before you push:** run a typecheck, because `vite build` does *not* typecheck and a
broken type will pass locally but can still be wrong:

```bash
cd apps/web && npx tsc --noEmit
```

---

## 9. Known gaps & gotchas

Things that will confuse you if nobody tells you:

- **No Prisma migrations.** Schema changes are applied with `db:push`, which has no
  version history and no rollback. Before real users, this needs a proper migration
  baseline (`prisma migrate dev` / `migrate deploy`).
- **Lots of the frontend is still mock data.** Several dashboard pages read from
  `apps/web/src/lib/mock-data.ts` instead of the API. Login, the student overview,
  assessments and goals *are* database-backed; much of the rest isn't yet.
- **No email/SMS provider.** Registration generates a real OTP but only prints it to the
  API logs (`docker compose logs -f api`). Locally the response also includes a `devOtp`
  field so you can test the flow. `DEMO_MODE=true` skips verification entirely.
- **Rate limiting is in-memory.** Correct on one instance; if the API is ever scaled to
  two, each keeps its own counters and the limits effectively double. Moving the
  throttler to Redis is the fix — that's the first thing that genuinely *needs* Redis.
- **You will hit HTTP 429 while testing auth.** Login is capped at 5/min per IP, OTP at
  3/15min. That's the rate limiter doing its job. Restart the API to clear the counters:
  `docker compose restart api`.
- **`packages/database/.env` is committed** (it only contains a localhost URL, so it's
  harmless today). It's a trap: because it's already tracked, `.gitignore` won't protect
  it, so never paste a real database URL into it.
- **The `docs/` folder describes an aspirational architecture.** `architecture_scale.md`,
  `subdomains_routing.md` etc. describe AWS ECS, per-role subdomains, Redis, BullMQ and
  5,000 RPS. **None of that is built.** Read them as a destination, not a description of
  the current system. This file and `deployment.md` describe what actually exists.

---

## 10. Deploying

`main` auto-deploys. The full deployment setup (Vercel + Render + Postgres, env vars,
seeding a remote database) is in **[deployment.md](./deployment.md)**.

| Piece | Host | URL |
| :--- | :--- | :--- |
| Frontend | Vercel | https://vedhkrit-web.vercel.app |
| API | Render | https://vedhkrit-api.onrender.com |
| Database | Render Postgres | — |

> Render's free tier sleeps when idle — the first request after a quiet period takes
> 30–60s to wake up. It isn't broken.

---

## 11. Troubleshooting

**`docker compose up` fails with "env file ... not found"**
You skipped Step 1. Run `cp apps/platform/.env.example apps/platform/.env`.

**Frontend loads but every API call fails**
The API container probably isn't running or didn't compile. Check `docker compose logs api`.

**"Cannot reach the server" on the login page**
The API is down or still starting. Check `docker compose ps` and the API logs.

**Login returns 401 for a seeded account**
The database probably wasn't seeded — or was seeded with different passwords. Re-run
Step 4.

**Any API request returns 500, and the logs mention a table not existing**
You skipped Step 3. Run `db:push`.

**Prisma type errors after pulling someone's schema change**
Run `docker exec vedhkrit-api npm run db:push --workspace=@vedhkrit/database` then
`... db:generate ...`.

**Everything is broken and you want a clean slate**
```bash
docker compose down -v          # -v also deletes the database volume
docker compose up -d --build
docker exec vedhkrit-api npm run db:push --workspace=@vedhkrit/database
docker exec vedhkrit-api npm run db:seed --workspace=@vedhkrit/database
```
