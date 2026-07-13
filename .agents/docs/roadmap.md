# Project Roadmap & Future Steps

This document outlines the step-by-step roadmap to refine and expand the **VEDHKRIT** platform.

---

## 🗺️ Roadmap Steps

### 🏁 Step 1: Homepage Hybrid Integration (COMPLETED)
* Restored missing compiler type declarations.
* Restored assets, cloned custom gradients, and updated global variables.
* Implemented the brand preloader, 1/3 layout, SVG Radar chart, SLEC cards, and vector background pattern.

---

### 📅 Step 2: Marketing Subpages Alignment (PENDING)
We will polish public-facing subpages to align with the new design system (using the 60-30-10 color rule, vector background pattern, and compact margins):
* **Why Vedhkrit (`about.tsx`):** Align layouts and copy structures.
* **ILDF Framework (`framework.tsx`):** Detailed breakdown of SLEC labs and Centre of Excellence (COE).
* **Assessment Model (`assessment.tsx`):** Overview of our AI diagnostic system.
* **Career Pathways (`career.tsx`):** Searchable index of future identities.
* **Contact (`contact.tsx`):** Clean forms.

---

### 📅 Step 3: Portal Dashboards Enhancement (PENDING)
Ensure dashboards are responsive, clean, and app-ready:
* **Student Dashboard (`dashboard.student.index.tsx`):** Add interactive progress cards, skill gauges, task TODOs, and roadmap trackers.
* **Parent Dashboard (`dashboard.parent.index.tsx`):** Align metrics, mentor notes, reports, and payment portals.
* **Mentor & Coach Portals:** Streamlined session logs and review tools.

---

### 📅 Step 4: Hybrid App & PWA Configuration (PENDING)
Prepare the client application to be exported as a hybrid mobile app/PWA:
1. **Manifest Setup:** Create a `manifest.webmanifest` defining brand icons, theme colors, and layout ratios.
2. **Service Worker:** Cache assets, CSS configurations, and routes for offline loading.
3. **App Header:** Enable viewport adjustments and custom standalone layout support.

---

### 📅 Step 5: Database Hooks & Server Setup (PENDING)
* Connect front-end forms (login, registration, assessments logs) to the monorepo databases package (`packages/database`).
* Setup APIs to persist diagnostic data and index values.
