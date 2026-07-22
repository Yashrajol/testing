# VEDHKRIT Project Directory Map & File Architecture Guide

This document provides a detailed breakdown of the **Vedhkrit Learner Development Platform** repository architecture. It outlines the monorepo workspaces, directory hierarchies, and the explicit purpose of every file and subfolder in the project.

---

## 🏗️ Repository Workspace Hierarchy

The project is configured as a monorepo workspace managed via **Turborepo**. The visual layout below mapping the folders and main configurations:

```
VEDHKRIT (Root)
├── .agents/                    # Agent directives and workspace guidelines
│   ├── docs/                   # Workspace blueprints read by agents on init
│   └── AGENTS.md               # Mandatory initial coding rules and styling tokens
├── docs/                       # Central technical documentation hub
│   ├── README.md               # Main index map for documents
│   ├── subdomains_routing.md   # Subdomain configurations & proxy setups
│   ├── architecture_scale.md   # RPS and scaling benchmarks
│   ├── user_flows.md           # Onboarding workflows for all actors
│   ├── database_er_diagram.md  # Entity-Relationship diagram in Mermaid format
│   ├── security_performance.md  # Auth policies and load-balancing rules
│   ├── platform_demo_guide.md  # [NEW] Interactive demo guide and script
│   └── project_directory_map.md # [NEW] Detailed project file explanations
├── apps/                       # Applications workspace folder
│   ├── api/                    # NestJS backend REST API
│   │   ├── src/                # NestJS source code modules
│   │   ├── dist/               # Compiled backend bundles
│   │   ├── nest-cli.json       # NestJS CLI parameters
│   │   └── package.json        # Backend dependencies
│   └── web/                    # Client-facing React 19 + TanStack router web application
│       ├── src/                # Front-end React code, routes, and styles
│       ├── public/             # Static assets, logos, and hero pictures
│       ├── package.json        # Front-end dependencies
│       └── vite.config.ts      # Vite configuration schema
├── packages/                   # Shared dependency libraries
│   ├── database/               # Relational Prisma ORM models and client mappings
│   │   ├── prisma/             # Schema configuration folder
│   │   │   └── schema.prisma   # PostgreSQL relational data schema
│   │   └── package.json        # Prisma dependencies
│   ├── eslint/                 # Standardized ESLint rule packages
│   └── tsconfig/               # Standardized TypeScript compiler files
├── package.json                # Monorepo workspaces definition
├── turbo.json                  # Turborepo task pipeline rules
└── setup-vps.sh                # Shell script to configure production VPS
```

---

## 🛠️ Root Directory Configurations

These files control task execution, dependency scopes, and deployment sequences across all sub-workspaces:

*   **`package.json` (Root):** Defines workspace locations (`apps/*`, `packages/*`), package managers, and global scripts to run tasks (e.g. `npm run dev` running parallel start commands).
*   **`turbo.json`:** Coordinates task caching and pipeline constraints for Turborepo. Ensures that `build` tasks in applications wait for the `database` packages to compile client models.
*   **`setup-vps.sh`:** Automates server setups on virtual private servers (VPS). Configures Node.js environments, installs PM2 process controllers, maps SSL certificates, and sets up Nginx configurations.
*   **`commit_history.ps1`:** A PowerShell helper utility to log git histories, tracking structural changes between iterations.

---

## 📁 Workspace Packages (`packages/`)

Shared components and configuration settings utilized by applications:

### 1. Database Package (`packages/database/`)
*   **`prisma/schema.prisma`:** Defines the main PostgreSQL database schema. Outlines roles (`STUDENT`, `PARENT`, `MENTOR`, `SCHOOL_ADMIN`), account verification statuses (`PENDING_VERIFICATION`, `ONBOARDING`), user profiles, payment tracking models, dynamic CMS page inputs, and relation tables.
*   **`index.js`:** Exports the instantiated Prisma client and models for easy import in backend and API services.
*   **`package.json`:** Declares dependencies on `@prisma/client` and developer tools.

### 2. ESLint Configuration (`packages/eslint/`)
*   **`index.js`:** Contains common ESLint syntax validation checks, styling limits, and import guidelines shared across the frontend and backend.

### 3. TypeScript Configurations (`packages/tsconfig/`)
*   **`base.json`:** Contains standard TypeScript compiler variables (such as target specifications, DOM libraries, and strict module flags) to ensure consistent builds.

---

## 📁 Core Backend REST API (`apps/api/`)

A **NestJS** REST API server managing administration queues and cohorts:

*   **`src/main.ts`:** Entrypoint file setting up Express server attachments, middleware pipes, standard response intercepts, and CORS configurations.
*   **`src/app.module.ts`:** Root module registering all secondary endpoints, services, and core models.
*   **`src/app.controller.ts`:** Configures basic health checker routes.
*   **`src/prisma/`:** Shared database providers injecting database instances.
*   **`src/assessments/`:** Controllers managing diagnostic tests, question pools, and score validations.
*   **`src/goals/`:** Endpoints tracking daily goals, checks, and student achievements.
*   **`src/sessions/`:** Scheduling logic for student-mentor sessions.
*   **`src/student-portal/`:** Handlers retrieving student metric cards and radar statistics.

---

## 📁 Client Web App (`apps/web/`)

A React 19 application utilizing **Vite**, **TanStack Router**, and **Tailwind CSS v4**:

### 1. Src Configuration Files
*   **`src/start.ts`:** Handles entrypoint scripts for TanStack Start SSR hydration.
*   **`src/server.ts`:** Connects frontend endpoints to server routing and handles static file requests.
*   **`src/router.tsx`:** Creates the router instance, registers routes generated by TanStack CLI, and configures context parameters.
*   **`src/routeTree.gen.ts`:** A compiler-generated file mapping file paths inside the `routes` directory to active URL segments.
*   **`src/styles.css`:** Imports Tailwind v4 CSS, declares customized OKLCH color variables (the 60-30-10 palette), specifies fonts (Inter/Outfit), and configures custom gradients, animations, and transitions.

### 2. Custom Hooks (`src/hooks/`)
*   **`use-lenis.ts`:** Initializes Lenis smooth-scrolling configurations.
*   **`use-mobile.tsx`:** Hook evaluating window sizes to toggle mobile layouts.

### 3. Utilities & Data (`src/lib/`)
*   **`api.ts`:** Lightweight fetch wrapper configuration handling API calls.
*   **`utils.ts`:** Contains helper functions (e.g. `cn` wrapper combining Tailwind classes using `clsx` and `tailwind-merge`).
*   **`mock-data.ts`:** Contains fallback datasets used during offline development to test dashboard items, student profiles, and progress charts.
*   **`error-capture.ts` & `lovable-error-reporting.ts`:** Integrations capturing script errors, warnings, and system logs to prevent page crashes.
*   **`error-page.ts`:** Component layouts displayed to the user when a page fails to render.

### 4. Layout & UI Components (`src/components/`)
*   **`logo.tsx`:** Renders the responsive SVG brand monogram logo.
*   **`fade-in.tsx`:** Custom wrapper animating inner content as it enters the viewport.
*   **`glass-card.tsx`:** Frosted glass panel utility styled with backdrop filters.
*   **`stat-card.tsx`:** Dashboard container card designed to display numbers, badges, and trends.
*   **`auth-shell.tsx`:** Common background shell layout for signup, login, and verification routes.
*   **`dashboard-shell.tsx`:** Master sidebar framework layout wrapping all student, parent, and admin portals. Handles sidebars, notification headers, and profile menus.
*   **`floating-widgets.tsx`:** Implements the debounced scroll-stop "Go To Top" button and the pinned "Ask Veda" pushpin tab that slides out a clipboard-themed chatbot.
*   **`marketing-layout.tsx`:** Layout header and footer wrapping all public routes. Standardizes transparent top-bar glassmorphism, responsive navigation links, and footer links.
*   **`theme-provider.tsx`:** Light/dark color toggles.
*   **`ui/`:** Folder containing 46 atomic UI components styled with Shadcn UI paradigms:
    *   *Includes components like:* `button.tsx`, `card.tsx`, `dialog.tsx`, `sheet.tsx`, `slider.tsx`, `calendar.tsx`, `progress.tsx`, etc.

### 5. Routing Infrastructure (`src/routes/`)

TanStack Router uses directory hierarchies and file prefixes to structure routing logic:

#### Public Marketing Subpages:
*   **`_marketing.tsx`:** Layout wrapper injection linking public navigation bars to subroutes.
*   **`_marketing.index.tsx`:** The Homepage. Features hero slideshows, the 7-Step Journey, roles focus boxes, the SVG Radar chart, SLEC Lab cards, parent reviews, chatbot sidebars, and vector illustrations.
*   **`_marketing.about.tsx`:** Overview of the company mission, team profiles, and milestones.
*   **`_marketing.assessment.tsx`:** Explanation of AI diagnostic tests.
*   **`_marketing.framework.tsx`:** Highlights the ILDF framework.
*   **`_marketing.slec.tsx`:** Detailed schedule maps and lists of physical SLEC labs.
*   **`_marketing.career.tsx`:** Searchable directory showing career identities.
*   **`_marketing.contact.tsx`:** Cards containing contact information and inquiries submission forms.
*   **`_marketing.demo.tsx`:** Walkthrough videos showing website capabilities.
*   **`_marketing.stories.tsx`:** Testimonials and student reviews.
*   **`_marketing.mentoring.tsx` & `mentoring-program.tsx`:** Profiles of verified mentors and onboarding details.

#### Authentication & Setup:
*   **`login.tsx` & `register.tsx`:** Credentials forms mapped inside the authentication shell.
*   **`forgot.tsx`:** Password recovery flows.
*   **`assessments.tsx`:** Interactive student evaluation page with question blocks, category indexes, and completion states.

#### Unified Portals & Dashboards:
*   **`dashboard.index.tsx`:** Fallback router directing verified users to their respective portals based on their role (`Role`).
*   **`dashboard.super.tsx`:** Controls admin databases and updates global platform components.
*   **`dashboard.admin.tsx` & `dashboard.admin.index.tsx`:** Verification forms, user statuses, and CMS managers.
*   **`dashboard.mentor.tsx` & `dashboard.mentor.index.tsx`:** Advisor control panel logging feedback notes, call schedules, and grade averages.
*   **`dashboard.parent.tsx` & `dashboard.parent.index.tsx`:** Child-linking codes page, monthly diagnostics reports portal, and simulated Razorpay payment gateway checkout interface.

#### Student Dashboard Subpages:
*   **`dashboard.student.tsx`:** Base layout container injecting navigation sidebars.
*   **`dashboard.student.index.tsx`:** Home dashboard displaying growth radar scores, diagnostics tasks checklist, and next mentor meetings.
*   **`dashboard.student.academics.tsx`:** Displays subject trends, term lists, and grades analysis.
*   **`dashboard.student.ai.tsx`:** In-depth cognitive diagnostic graphs.
*   **`dashboard.student.assessments.tsx`:** Active tasks table and past scoring matrices.
*   **`dashboard.student.career.tsx`:** Matches student assessment scores with relevant career paths.
*   **`dashboard.student.goals.tsx`:** Lists tasks and tracks milestone progress.
*   **`dashboard.student.portfolio.tsx`:** Displays uploaded files, workspace materials, and certifications.
*   **`dashboard.student.reports.tsx`:** Generates and exports growth PDFs.
*   **`dashboard.student.sessions.tsx`:** Displays call logs and coordinates scheduling with mentors.
*   **`dashboard.student.skills.tsx`:** Skill gauges showing core strengths and areas for improvement.
