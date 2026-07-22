# Deploying the Demo

The platform is three pieces and they deploy to different places:

| Piece | Host | Why |
| :--- | :--- | :--- |
| `apps/web` (TanStack Start) | **Vercel** | What it's built for. |
| `apps/api` (NestJS) | **Render** | Needs a long-running server, not a serverless function. Ships as a Docker container. |
| PostgreSQL | **Render** (managed) | Provisioned by `render.yaml` alongside the API. |

The backend is deliberately *not* on Vercel. Vercel is serverless, and two things in
this app depend on a persistent process: the rate limiter keeps its counters in
memory (cold starts would reset them, silently defeating the brute-force limits),
and Prisma holds a connection pool.

---

## Step 1 — Deploy the API + database (Render)

1. Push this repo to GitHub.
2. Go to <https://dashboard.render.com/blueprints> → **New Blueprint Instance** →
   pick the repo. Render reads [`render.yaml`](../render.yaml) and creates:
   - `vedhkrit-api` (Docker web service, built from [`Dockerfile`](../Dockerfile))
   - `vedhkrit-db` (managed Postgres)

   `DATABASE_URL` is wired automatically, and `JWT_SECRET` is generated for you.
3. Leave `WEB_ORIGIN` blank for now — you don't have a frontend URL yet.
4. Deploy. Note the API URL, e.g. `https://vedhkrit-api.onrender.com`.
5. Confirm it's alive: `curl https://vedhkrit-api.onrender.com/api/health`

### Create the tables and seed them

**The new database has no tables.** This repo has no Prisma migrations, so nothing
creates the schema automatically — the API will deploy and start happily, then fail
on every query until you do this.

Render's Shell is not available on free instances, so run both steps **from your own
machine** against the database's public URL.

1. Render dashboard → **vedhkrit-db** → **Connections** → copy the
   **External Database URL** (the long one ending in `.render.com`, not the internal
   one you set as `DATABASE_URL` on the service).

2. From the repo root (PowerShell):

```powershell
$env:DATABASE_URL = "<external database url>"

# 1. Create the tables from schema.prisma
npm run db:push --workspace=@vedhkrit/database

# 2. Seed them — pick your own passwords
$env:SEED_DEMO_PASSWORD  = "<demo password — this is the one you share>"
$env:SEED_ADMIN_PASSWORD = "<admin password — keep this private>"
npm run db:seed --workspace=@vedhkrit/database

# 3. Clear these so you don't accidentally point later commands at production
Remove-Item Env:\DATABASE_URL, Env:\SEED_DEMO_PASSWORD, Env:\SEED_ADMIN_PASSWORD
```

`SEED_ADMIN_PASSWORD` is **mandatory for any non-local database** — the seed script
refuses to run without it, so a public database can never end up with the well-known
default password.

> Re-running the seed **wipes every table first**. It is not additive. Seeding again
> with different passwords invalidates the old ones.

---

## Step 2 — Deploy the frontend (Vercel)

1. <https://vercel.com/new> → import the same repo.
2. Configure:
   - **Root Directory:** `apps/web`
   - Framework preset: Vite (or "Other" — the Nitro `vercel` preset in
     [`vite.config.ts`](../apps/web/vite.config.ts) handles the build output)
3. Add an environment variable:
   - `VITE_API_URL` = your Render API URL (e.g. `https://vedhkrit-api.onrender.com`)
4. Deploy. You'll get a URL like `https://vedhkrit.vercel.app` — **this is the link you share.**

---

## Step 3 — Close the CORS loop

The API currently trusts no browser origin. Back in Render, set:

- `WEB_ORIGIN` = your Vercel URL (e.g. `https://vedhkrit.vercel.app`)

Render redeploys automatically. Without this, every request from the deployed
frontend is blocked by the browser.

---

## Environment variables

### Render (API)

| Variable | Notes |
| :--- | :--- |
| `DATABASE_URL` | Auto-wired from the managed Postgres. |
| `JWT_SECRET` | Auto-generated. The API refuses to sign tokens without it. |
| `WEB_ORIGIN` | Your Vercel URL. Set in Step 3. |
| `DEMO_MODE` | `true` for the demo. See below. |

### Vercel (web)

| Variable | Notes |
| :--- | :--- |
| `VITE_API_URL` | Your Render API URL. |

---

## What `DEMO_MODE=true` does — and why it exists

There is **no email/SMS provider wired up**. Registration generates a real OTP,
but it is only written to the server log, so a real visitor could sign up and then
be permanently stuck at a verification screen they can never pass.

With `DEMO_MODE=true`, new signups are marked `ACTIVE` immediately and skip OTP
entirely, so anyone you share the link with can register and get straight in.

**This is a demo-only compromise.** Before real users touch this, set
`DEMO_MODE=false` and wire an actual email provider (Resend, SES, Postmark) into
`AuthService.register` in [`auth.service.ts`](../apps/api/src/auth/auth.service.ts).

---

## Known limits of this setup

- **Render's free tier spins down when idle.** The first request after a quiet
  period takes ~30–60s to wake the container. Fine for a demo; surprising if you
  don't expect it.
- **Rate limiting is in-memory.** It's correct on a single instance. The moment you
  scale to two, each instance keeps its own counters and the limits effectively
  double. Moving the throttler to Redis is the fix, and is the first thing that
  genuinely requires Redis — not general "scale".
- **The frontend still renders a lot of mock data.** Several dashboard pages read
  from `src/lib/mock-data.ts` rather than the API, so parts of the demo are not
  actually backed by the database yet.
- **There are no Prisma migrations.** Schema changes are applied with `db:push`,
  which is fine for a demo but has no history and no rollback. Before real users,
  generate a proper migration baseline (`prisma migrate dev`) and deploy with
  `prisma migrate deploy`.
- **Render's free Postgres is deleted after 30 days.** Back up anything you care
  about, or upgrade the database before it expires.
