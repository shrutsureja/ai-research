# Workflow: Writing and Publishing a Report

## 1. Choose Format

- **Markdown (.md)** — for text-heavy reports, analyses, reviews
- **HTML (.astro)** — for reports with complex layouts, custom diagrams, or interactive elements

## 2. Write the Report

### Markdown

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
3. Write content — start with `## Section` headings
4. Use callouts: `<div class="callout callout-note">...`
5. Use diagrams: `<div class="diagram"><svg>...</svg><div class="diagram-caption">...</div></div>`

### HTML

1. Create `src/pages/reports/{slug}.astro`
2. Import `ReportLayout` and `TableOfContents`
3. Follow the template in `skill/SKILL.md`

## 3. Required Structure

Every report must start with:
1. **Title** — h1 heading
2. **Version & Summary** — metadata block (version, date, tags, summary)
3. **Table of Contents** — auto-generated from h2/h3 headings
4. Then your content sections (not fixed — use whatever fits)

## 4. Verify Build

```bash
npm run build
```

Check for errors. Open `dist/` to verify pages generated correctly.

## 5. Commit and Push

```bash
git add .
git commit -m "report: add {slug}"
git push
```

Cloudflare Pages auto-deploys on push to `main`.

## 6. Verify Live Site

Wait ~1-2 minutes for deployment, then check:
- `ai-research.shrutsureja.com` — dashboard should show your report
- `ai-research.shrutsureja.com/reports/{slug}` — report page should render correctly

## Tips

- Reuse existing tags when possible for consistency
- Use kebab-case for slugs and tags
- Include diagrams for architecture or flow explanations
- Add callouts for important notes, warnings, or tips
- Proofread before pushing — reports are public immediately