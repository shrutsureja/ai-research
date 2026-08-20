# AI Research — Project Context

## What This Is

A static report publishing platform for AI-generated research reports. Built with Astro + Tailwind CSS, deployed on Cloudflare Pages at `ai-research.shrutsureja.com`.

## How to Add a Report

### Markdown Reports (most common)

1. Create `src/content/reports/{slug}.md`
2. Add frontmatter:
```yaml
---
title: "Report Title"
summary: "1-2 sentence summary"
version: "1.0.0"
date: 2026-08-20
tags: ["tag1", "tag2"]
slug: "url-friendly-slug"
---
```
3. Write the report content using standard Markdown
4. Use `## Headings` for sections — TOC is auto-generated from h2/h3
5. Use callout classes for notes/warnings/tips: `<div class="callout callout-note">...`
6. Use `<div class="diagram">` wrapper for inline SVG diagrams

### HTML Reports (for complex layouts)

1. Create `src/pages/reports/{slug}.astro`
2. Import and use `ReportLayout` and `TableOfContents` components
3. See `skill/SKILL.md` for the full template

### After Writing

```bash
npm run build  # verify it builds
git add . && git commit -m "report: add {slug}"
git push       # auto-deploys to Cloudflare Pages
```

## Project Structure

```
src/
  layouts/       # DashboardLayout, ReportLayout
  components/    # ThemeToggle, ReportCard, SearchBar, TableOfContents
  pages/         # index.astro (dashboard), reports/[slug].astro
  content/       # Content collection (MD reports)
    reports/     # .md report files
    config.ts    # Collection schema
  styles/        # report-theme.css (shared theme)
  data/          # reports.ts (metadata helpers)
public/           # Static assets
skill/            # SKILL.md (portable report skill)
docs/             # Architecture docs and ADRs
```

## Key Conventions

- Every report starts with: **Title → Version & Summary → Table of Contents**
- Sections after those 3 are NOT fixed — use whatever fits the report
- Slug: `kebab-case`, no dates
- Tags: `kebab-case`, lowercase, reuse existing
- Dark/light mode: automatic, persisted in localStorage
- Theme: defined in `src/styles/report-theme.css`

## Deployment

- Cloudflare Pages, project: `ai-research`
- Build: `npm run build` → `dist/`
- Domain: `ai-research.shrutsureja.com`
- Auto-deploy on push to `main`

## Read the Skill

For full report-writing guidelines, see `skill/SKILL.md`.