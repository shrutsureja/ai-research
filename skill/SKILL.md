# Skill: Research Report Publishing

> A portable skill that any AI agent can use to write and publish research reports on the ai-research platform.

## Purpose

This skill enables any AI agent (Claude, Cursor, Copilot, OpenClaw, etc.) to create well-structured, visually rich research reports and publish them to the ai-research platform. Reports are deployed automatically via git push to Cloudflare Pages.

## Report Structure (Required)

Every report **must** start with these three elements, in order:

### 1. Title (h1)

A clear, descriptive title as the first `#` heading (Markdown) or `<h1>` (HTML).

### 2. Version & Summary Block

A metadata block at the top of the report containing:
- **Version** — semantic version (e.g., `1.0.0`)
- **Date** — publication date
- **Tags** — 1-5 relevant tags for discoverability
- **Summary** — a 1-2 sentence description of what the report covers

### 3. Table of Contents / Index

An auto-generated TOC listing all `h2` and `h3` headings in the report. The platform generates this automatically from your headings — just make sure your headings are properly nested (h2 for major sections, h3 for subsections).

### After Those Three: Report Content

**Sections are NOT fixed.** Different report types can have completely different sections. A code review report will have different sections than a market analysis or a competitive landscape report. Use whatever sections make sense for your report type.

## Two Formats

### Markdown (for text-heavy reports)

Place in `src/content/reports/` as `.md` files.

**Frontmatter (required):**
```yaml
---
title: "Report Title"
summary: "1-2 sentence summary"
version: "1.0.0"
date: 2026-08-20
tags: ["tag1", "tag2", "tag3"]
slug: "url-friendly-slug"
---
```

The platform automatically:
- Generates the report page at `/reports/{slug}`
- Creates a dashboard card
- Builds the TOC from headings
- Applies the shared theme

### HTML / Astro (for complex reports with custom diagrams)

Place in `src/pages/reports/` as `.astro` files.

```astro
---
import ReportLayout from '../../layouts/ReportLayout.astro';
import TableOfContents from '../../components/TableOfContents.astro';

const meta = {
  title: "Report Title",
  version: "1.0.0",
  date: "2026-08-20",
  summary: "1-2 sentence summary",
  tags: ["tag1", "tag2"],
  slug: "url-friendly-slug"
};
---

<ReportLayout {...meta}>
  <h1>{meta.title}</h1>

  <!-- Version & Summary block -->
  <div class="report-meta">
    <div class="report-meta-item">
      <span class="report-meta-label">Version</span>
      <span class="report-meta-value">{meta.version}</span>
    </div>
    <div class="report-meta-item">
      <span class="report-meta-label">Date</span>
      <span class="report-meta-value">{meta.date}</span>
    </div>
    <div class="report-meta-item">
      <span class="report-meta-label">Tags</span>
      <div class="flex flex-wrap gap-1.5 mt-1">
        {meta.tags.map(tag => <span class="report-tag">{tag}</span>)}
      </div>
    </div>
  </div>

  <div class="report-summary">
    <strong>Summary:</strong> {meta.summary}
  </div>

  <!-- TOC -->
  <TableOfContents />

  <!-- Report content -->
  <!-- Your sections here -->
</ReportLayout>
```

## Theme & Styling

The shared CSS theme is at `src/styles/report-theme.css`. It provides:

- **Typography** — Inter font, system fallback, good line height
- **Code blocks** — dark background, syntax-highlighting-friendly
- **Tables** — bordered, hover states, responsive
- **Callouts** — `.callout-note`, `.callout-warning`, `.callout-tip` classes
- **SVG diagrams** — `.diagram` container with `.diagram-caption`
- **Dark/light mode** — automatic via `.dark` class on `<html>`

### Using Callouts

**Markdown:**
```html
<div class="callout callout-note">
  <div class="callout-title">📝 Note</div>
  Your note content here.
</div>
```

**HTML/Astro:** Same as above, directly in your template.

### Diagrams

Use inline SVG for diagrams. The theme provides a `.diagram` container:

```html
<div class="diagram">
  <svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg">
    <!-- Your SVG content -->
  </svg>
  <div class="diagram-caption">Figure 1 — Description</div>
</div>
```

**Theme-compatible colors:**
- Primary: `#6366f1` (indigo)
- Primary light: `#818cf8`
- Success: `#10b981`
- Warning: `#f59e0b`
- Danger: `#ef4444`
- Dark bg: `#0d1117`
- Dark surface: `#161b22`
- Dark border: `#21262d`

For custom diagram styling, override colors inline. Diagrams should look good in both light and dark mode — use CSS variables or test both.

## Quality Guidelines

1. **Be thorough** — research the topic deeply before writing
2. **Evidence-based** — cite sources, include data, reference real code/behavior
3. **Use diagrams** — visual explanations where they help (architecture, flows, hierarchies)
4. **Include verdicts** — recommendations or conclusions where appropriate
5. **Proper structure** — use headings hierarchically (h1 → h2 → h3)
6. **Tags** — choose tags that help discovery (2-5 tags, kebab-case)
7. **Version** — start at `1.0.0`, increment for revisions
8. **Proofread** — check for errors before committing

## Deployment

1. Write your report (`.md` or `.astro`)
2. `git add . && git commit -m "report: add <slug>"`
3. `git push`
4. Cloudflare Pages auto-deploys from the `main` branch
5. Report is live at `ai-research.shrutsureja.com/reports/{slug}`

## Conventions

- **Slug naming:** `kebab-case`, descriptive, no dates (the date is in metadata)
- **Tag naming:** `kebab-case`, lowercase, reuse existing tags when possible
- **File naming:** `{slug}.md` for Markdown, `{slug}.astro` for HTML
- **Images:** place in `public/images/{slug}/` if needed (rare — prefer inline SVG)
- **No secrets** — reports are public, never include credentials or private data