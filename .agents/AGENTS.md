# VEDHKRIT Workspace Rules & Guidelines

> [!IMPORTANT]
> **MANDATORY INITIALIZATION STEP FOR ALL AGENTS:**
> Before proposing any code changes, running commands, or creating layout architectures, you **MUST** read and understand the project-specific document files inside the `.agents/docs/` directory:
> 1. [Project Overview](file:///e:/Startup%20Building/WORKSPACE/VEDHKRIT/.agents/docs/project_overview.md) — Structural breakdown of the monorepo, workspaces, and routing systems.
> 2. [Design System](file:///e:/Startup%20Building/WORKSPACE/VEDHKRIT/.agents/docs/design_system.md) — Details on the 60-30-10 color system, typography rules, glass utilities, and responsiveness.
> 3. [Homepage Hybrid Blueprint](file:///e:/Startup%20Building/WORKSPACE/VEDHKRIT/.agents/docs/homepage_hybrid.md) — Structure of the preloader, 1/3 hero, vector background illustrations, and specific Student/Parent/SLEC sections.
> 4. [Roadmap & Future Steps](file:///e:/Startup%20Building/WORKSPACE/VEDHKRIT/.agents/docs/roadmap.md) — Future page edits, client dashboards, PWA configurations, and databases.
>
> Doing this prevents style drift, duplicate variables, path breaking, and ensures consistency across coding iterations.

---

## 🛠️ Workspace Behavioral Directives
1. **Routing System:** Always use TanStack Router (`@tanstack/react-router`). Use React Router `<Link>` tags with absolute paths; never use standard anchors (`<a href="...">`) which cause complete page reloads.
2. **Animation Syntax:** Always use the v12 Motion bindings syntax:
   `import { motion, AnimatePresence } from "motion/react";`
3. **PWA/App Integration:** Keep layouts compact and container-focused. Avoid excessive padding, large fonts, and bulky borders so that components easily scale down to mobile web viewports and hybrid shell containers.
4. **Style Tokens:** Rely on the established design tokens mapping to Tailwind variables (`bg-bg-primary`, `text-text-heading`, `bg-btn-accent`, etc.). Do not hardcode raw hex values or create local colors unless extending the base config in `styles.css`.
