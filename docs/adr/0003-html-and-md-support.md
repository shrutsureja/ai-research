# ADR 0003: HTML and Markdown Support

**Date:** 2026-08-20
**Status:** Accepted

## Context

Reports vary in complexity. Some are text-heavy analyses (Markdown is ideal). Others need custom diagrams, complex layouts, or interactive elements (HTML is better). We need to support both without duplicating the theme.

## Decision

Support **both Markdown and HTML/Astro** report formats, sharing a common layout and theme.

## Rationale

- **Markdown** — lower barrier to entry, fast to write, perfect for text-heavy reports
- **HTML/Astro** — full control for complex reports with inline SVG, custom layouts
- **Shared ReportLayout** — both formats use the same layout, ensuring consistent appearance
- **Shared CSS theme** — `report-theme.css` applies to both, single source of truth for styling
- **Content collections** — Markdown reports get schema validation via Astro collections
- **Page routing** — HTML reports are just `.astro` files in `src/pages/reports/`, naturally routed

## Implementation

- MD reports: `src/content/reports/*.md` → content collection → `[slug].astro` dynamic route
- HTML reports: `src/pages/reports/*.astro` → direct page routing
- Both import `ReportLayout.astro` for the shared shell
- Both include `TableOfContents.astro` for auto-generated TOC

## Alternatives Considered

- **Markdown only** — too limiting for complex diagrams and layouts
- **HTML only** — too verbose for simple text reports
- **MDX** — interesting but adds complexity and Astro MDX support varies

## Consequences

- Two entry points for reports — documented clearly in skill and docs
- Markdown reports get schema validation; HTML reports rely on convention
- Theme CSS must work for both Astro-rendered HTML and Markdown-rendered HTML