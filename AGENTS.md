# AI Research — Agent Context

## Project

A static report publishing platform for AI-generated research reports. Astro + Tailwind CSS, deployed on Cloudflare Pages at `ai-research.shrutsureja.com`.

## Quick Reference

- **Add a report:** Write a `.md` file in `src/content/reports/` with proper frontmatter (see `skill/SKILL.md`)
- **Build:** `npm run build`
- **Deploy:** `git push` to `main` → Cloudflare Pages auto-deploys
- **Report structure:** Title → Version & Summary → TOC → Content (sections are flexible)

## Structure

```
src/
  layouts/        DashboardLayout, ReportLayout
  components/     ThemeToggle, ReportCard, SearchBar, TableOfContents
  pages/          index.astro (dashboard), reports/[slug].astro (dynamic)
  content/        Content collection schema + MD reports
  styles/         report-theme.css
  data/           Metadata helpers
public/            Static assets
skill/             SKILL.md — portable report-writing skill
docs/              Architecture docs, setup, deployment, workflow, ADRs
```

## Conventions

- Every report: **Title (h1) → Version & Summary block → TOC → content**
- Sections after the first 3 are NOT fixed — use whatever fits
- Slug: `kebab-case`, no dates
- Tags: `kebab-case`, lowercase, reuse existing
- Theme: `src/styles/report-theme.css` — callouts, code, tables, diagrams
- Dark/light: automatic, localStorage persistence
- Git identity: `shrutsureja <shrutsureja.code@gmail.com>`

## Skill

Read `skill/SKILL.md` for full report-writing guidelines. It's framework-agnostic — Claude, Cursor, Copilot, or any agent can follow it.

## Deployment

- Cloudflare Pages, project: `ai-research`
- Build command: `npm run build`
- Output: `dist/`
- Domain: `ai-research.shrutsureja.com`
- Auto-deploy on push to `main`

## Important

- Reports are **public** — no secrets, credentials, or private data
- Always `npm run build` before pushing to verify no errors
- Use the report skill (`skill/SKILL.md`) when writing reports