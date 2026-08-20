# Architecture

## Overview

AI Research is a static site built with Astro and Tailwind CSS. Reports are authored in Markdown (via Astro content collections) or as Astro components (for complex HTML reports). The site is deployed to Cloudflare Pages.

## Layers

### 1. Content Layer

- **Markdown reports** live in `src/content/reports/` and are managed via Astro's content collection API
- **HTML reports** live in `src/pages/reports/` as `.astro` files
- Both use the shared `ReportLayout.astro` for consistent styling
- Content collection schema (`src/content/config.ts`) enforces frontmatter: title, summary, version, date, tags, slug

### 2. Presentation Layer

- **DashboardLayout.astro** — wraps the dashboard page
- **ReportLayout.astro** — wraps all report pages, includes theme toggle and back link
- **Components:**
  - `ThemeToggle.astro` — dark/light toggle with localStorage persistence
  - `ReportCard.astro` — card for dashboard report list
  - `SearchBar.astro` — client-side search filtering by title, tags, summary
  - `TableOfContents.astro` — auto-generates TOC from h2/h3 headings at runtime

### 3. Styling Layer

- `src/styles/report-theme.css` — shared report theme (typography, code, tables, callouts, diagrams, dark/light)
- `tailwind.config.mjs` — Tailwind config with custom fonts and colors
- Dark mode: `class` strategy, toggled via `<html class="dark">`

### 4. Routing Layer

- `src/pages/index.astro` — dashboard, lists all reports with search and tag filters
- `src/pages/reports/[slug].astro` — dynamic route for content collection reports
- HTML reports in `src/pages/reports/` are routed automatically by filename

### 5. Deployment Layer

- Cloudflare Pages with `@astrojs/cloudflare` adapter
- `wrangler.toml` — Cloudflare config
- Build: `npm run build` → `dist/`
- Auto-deploy on push to `main` branch

## Data Flow

```
Markdown reports (.md) → Content Collection → [slug].astro → ReportLayout → HTML output
HTML reports (.astro)  → Page routing       → ReportLayout → HTML output
All reports            → index.astro        → Dashboard    → HTML output
```

## Key Design Decisions

- **Content collections** for type safety and schema enforcement
- **Client-side search** — no server needed, filters in the browser
- **Auto-generated TOC** — scans headings at runtime, no manual maintenance
- **Shared theme CSS** — one stylesheet for both HTML and MD reports
- **Static output** — fast, cheap, secure, no server runtime required