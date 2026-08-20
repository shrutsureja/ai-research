# AI Research

A static report publishing platform for AI-generated research reports. Built with Astro + Tailwind CSS, deployed on Cloudflare Pages.

**Live:** [ai-research.shrutsureja.com](https://ai-research.shrutsureja.com)

## Features

- 📊 Dashboard with client-side search and tag filtering
- 📝 Reports in Markdown or HTML (Astro)
- 🌓 Dark/light mode with localStorage persistence
- 📋 Auto-generated table of contents for each report
- 🎨 Shared report theme with callouts, code blocks, tables, SVG diagram support
- 🚀 Auto-deploy via git push to Cloudflare Pages

## Quick Start

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # output to dist/
```

## Writing a Report

1. Create `src/content/reports/{slug}.md`
2. Add frontmatter (title, summary, version, date, tags, slug)
3. Write content — TOC is auto-generated from h2/h3 headings
4. `git push` → auto-deploys

See [`skill/SKILL.md`](skill/SKILL.md) for the full report-writing guide.

## Tech Stack

- [Astro](https://astro.build) — static site generator
- [Tailwind CSS](https://tailwindcss.com) — styling
- [Cloudflare Pages](https://pages.cloudflare.com) — hosting

## Documentation

- [Architecture](docs/architecture.md)
- [Setup](docs/setup.md)
- [Deployment](docs/deployment.md)
- [Workflow](docs/workflow.md)
- [ADRs](docs/adr/)

## License

MIT