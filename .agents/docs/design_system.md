# Design System & Styling Guidelines

This document details the colors, typography, layout dimensions, shadows, and preloaders that form the visual language of **VEDHKRIT**.

---

## 🎨 The 60-30-10 Color Rule

We adhere to a strict color distribution system to create clean, high-contrast layouts:

| Segment | Proportion | Tailwind Variables | Hex / OKLCH | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Base (60%)** | Main Surfaces | `bg-bg-primary`, `bg-bg-secondary` | `#FFFFFF`, `#F8FBFF` | High-contrast, clean light background layers to prevent dark, heavy layouts. |
| **Structure (30%)** | Borders, Text, Footers | `text-text-heading`, `bg-brand-navy` | `#031955` | Deep Navy used for corporate frames, headers, borders, footers, and text to ensure readability. |
| **Accent (10%)** | CTA & Highlights | `bg-btn-accent`, `text-brand-orange` | `#F97C10` | Vibrant orange reserved for buttons, badges, selectors, and interactive feedback indicators. |

---

## 💎 Brand Colors & Gradients

The following parameters are integrated into Tailwind `@theme inline` inside [styles.css](file:///e:/Startup%20Building/WORKSPACE/VEDHKRIT/apps/web/src/styles.css):

### OKLCH Theme Tokens
* `var(--brand)`: `oklch(0.35 0.18 265)` (Primary logo blue)
* `var(--brand-glow)`: `oklch(0.55 0.22 260)`
* `var(--brand-orange)`: `oklch(0.72 0.19 55)`
* `var(--brand-teal)`: `oklch(0.68 0.11 195)`
* `var(--brand-purple)`: `oklch(0.58 0.22 300)`
* `var(--brand-dark)`: `oklch(0.18 0.08 265)`

### Custom Gradient Classes
* `gradient-brand`: Used for primary backgrounds and headers.
* `gradient-warm`: Orange-to-amber sunset gradient for highlights.
* `gradient-dark`: Deep space navy background styles.
* `gradient-cta`: Premium linear gradient (`oklch(0.42 0.19 265)` to `oklch(0.68 0.11 195)`).

---

## 📐 Layout & Spacing Rules

To maintain compact, app-ready views and avoid bulky web structures:

1. **Reduced Whitespace:** Use compact vertical paddings. Prefer `py-10 md:py-14 lg:py-16` instead of oversized `py-24` or `py-32`.
2. **Compact Spacing:** Use `gap-3` or `gap-4` in grids to ensure cards cluster together naturally.
3. **Typography Weights:** Avoid heavy dark text weights (e.g. `font-black`). Prefer `font-bold` for titles, `font-semibold` for subtitles, and `font-medium`/`font-normal` for body copy.
4. **Delicate Shadows:**
   * `shadow-card`: Soft layout indicator.
   * `shadow-elevated`: Floating element shadows (mockups, cards) to create modern layers.

---

## ⏳ Preloader Pre-rendering
Every client entrance starts with the brand preloader to mask image compilation or database queries:
* Spin diameter of 56px (`h-14 w-14`) with dual gradient borders.
* Brand monogram wrapper.
* Smooth fade-out on mount completion.

---

## 🧭 Navigation Bar & Header
The header implements Apple-style liquid glassmorphism to blend with underlying content:
1. **Liquid Glassmorphism:** Uses highly translucent, high-saturation frosted glass (`backdrop-blur-lg backdrop-saturate-150`) with an ultra-thin bottom border (`border-border-default/30`).
2. **Adaptive Color & Opacity:** 
   * **At Top (Homepage):** Renders a highly translucent frosted glass layout (`bg-white/35 border-white/10`) to capture and blend color hues from the active hero banner image.
   * **Scrolled / Other Pages:** Transitions to a standard light glass layout (`bg-white/70 border-border-default/30`) once the user scrolls down past 60px.
3. **Unified Assets:** Uses the Navy logo (`variant="light"`) and navy text links consistently across both states to prevent logo-swap flickering.

---

## 📲 Interactive Widgets & Floating Controls
The interface uses smart scroll-interactive behaviors for secondary action widgets:
1. **Docked Chatbot Sidebar:** The Veda chatbot transitions from a bottom-right floating bubble to a pinned right-hand vertical sidebar tab (`ASK VEDA` text with bot logo) once the user scrolls down past the hero viewport. Clicking it slides out a full-height right sidebar drawer.
2. **Scroll-Stop Go To Top:** To minimize visual distractions during page navigation, the "Go to Top" button hides while scrolling is in progress. A debounce listener detects when scrolling/movement stops and displays the button only after 800ms of inactivity (if scrolled past 300px).
