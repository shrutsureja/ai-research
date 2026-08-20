# ADR 0001: Astro + Tailwind CSS

**Date:** 2026-08-20
**Status:** Accepted

## Context

We need a static site generator for a report publishing platform. Requirements:
- File-based routing
- Markdown support with frontmatter
- Component-based layouts
- Static output (no server runtime)
- Good developer experience
- Modern styling

## Decision

Use **Astro** as the static site generator and **Tailwind CSS** for styling.

## Rationale

### Astro
- **Content collections** — type-safe Markdown with schema enforcement
- **Islands architecture** — ship zero JS by default, add interactivity only where needed
- **File-based routing** — intuitive, no router config
- **Component-based** — reusable layouts and components
- **Fast builds** — Vite under the hood
- **Static output** — perfect for Cloudflare Pages

### Tailwind CSS
- **Utility-first** — fast iteration, no context switching
- **Dark mode** — built-in `class` strategy, perfect for our toggle
- **Responsive** — mobile-first by default
- **Customizable** — easy to add custom colors (accent) and fonts
- **Popular** — well-documented, good ecosystem

## Alternatives Considered

- **Next.js** — overkill for a static site, more complexity than needed
- **Eleventy** — good for Markdown but less component-friendly
- **Hugo** — fast but Go-based, less flexible for custom components
- **Plain HTML/CSS** — too much manual work, no content collections

## Consequences

- Astro content collections enforce a schema — good for consistency
- Tailwind utility classes in components — some classes in markup
- Both are well-maintained and popular — good long-term prospects