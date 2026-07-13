# Homepage Hybrid Blueprint (Step 1 Complete)

This document maps out the specific sections and components implemented in [HomePage](file:///e:/Startup%20Building/WORKSPACE/VEDHKRIT/apps/web/src/routes/_marketing.index.tsx) to target **Students, Parents, and SLEC**.

---

## 🏗️ Section Breakdown

### 1. Branded Preloader (`<Preloader />`)
A preloader overlay blocks initial hydration layouts and exits once React state registers `loading = false`.
* **Visuals:** An outer pulsing ping circle, spinning gradient border, and central static brand circle containing a navy 'V'.
* **Progress:** Motion-powered indicator extending from `0%` to `100%` width in 1.5 seconds.

### 2. Full-Bleed Slideshow Hero
A full-screen responsive hero section designed to align value propositions clearly while presenting stunning visual banners:
* **Background Slideshow:** 4 banners (`hero-new-1.jpg`, `hero-new-2.jpg`, `/assets/images/classroom-sec.png` for SLEC, and `/assets/images/hero-bg-4.png` for career readiness) stretch fully across the hero width (`absolute inset-0`). Framer Motion manages transitions and scale animations, and the crop focuses on the right side on mobile screens (`object-right lg:object-center`).
* **Contrast Overlays:** Desktop layouts use a smooth black gradient fade (`bg-linear-to-r from-black/90 via-black/60 to-transparent`) and mobile viewports use a bottom-to-top black gradient shadow overlay (`bg-gradient-to-t from-black/90 via-black/80 via-45% to-transparent`) extending up to the height of the bottom-left text block only to ensure readability.
* **Layout:** Restricts the hero container's height to exactly `h-[calc(100dvh-56px)]` on all devices. All text, badges, descriptions, and CTA buttons are restricted to the left 50% width (`lg:max-w-[50%]`) on large screens, aligned in the bottom-left corner of the viewport (`justify-end pb-12 lg:pb-16`), leaving the top 25% of the viewport empty (`pt-[25dvh]`) to maintain excellent breathing room and clear visual framing of background images. Includes slider navigation dots.

### 3. The 7-Step journey
* **Desktop:** Clean 7-column layout with horizontal connector lines.
* **Mobile:** Horizontal sliding flex list with snap-to-card actions.

### 4. Focus Blocks (Student & Parent Roles)
* Two clean card components explaining user portals.
* CTA links navigate to the registrations router paths.

### 5. Growth Snapshot (Radar Chart)
* **SVG chart:** Drawn with five coordinate points representing Academic, Communication, Consistency, Innovation, and Leadership metrics.
* **Animation:** Spring transition scales up the inner polygon on scroll entry.
* **Stats:** 4 snapshot stat widgets describing current capabilities (e.g. Visual Learner learning style).

### 6. SLEC Labs Grid
* Flex headers with an action button linking to the framework layout path.
* 6-column image card layout representing physical laboratories. Card images zoom on hover.

### 7. Parents Showcase
* **Mobile Mockup:** A vertical smartphone card containing the child's index (82, Attendance 95%, On Track assignments) that floats vertically.
* **Testimonial:** A block showing Priya Sharma's review.
* **Media:** Merged family illustration.

---

## 🎨 Background Vector Decorations
* Renders scattered SVG paths of graduation caps, brains, rockets, lightbulbs, books, and atoms in the background.
* Opacity is capped at `opacity-[0.03]` (low visibility) using the logo blue color to create a unique illustrated grid texture without distracting the reader.
