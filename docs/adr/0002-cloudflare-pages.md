# ADR 0002: Cloudflare Pages

**Date:** 2026-08-20
**Status:** Accepted

## Context

We need a hosting platform for a static site. Requirements:
- Free or low-cost
- Auto-deploy from git
- Custom domain support
- Fast CDN
- SSL included

## Decision

Deploy to **Cloudflare Pages**.

## Rationale

- **Free** — unlimited requests, unlimited bandwidth on free plan
- **Git integration** — auto-deploy on push to main
- **Custom domains** — easy to add `ai-research.shrutsureja.com`
- **Global CDN** — fast worldwide, Cloudflare's edge network
- **SSL** — automatic, no configuration needed
- **Wrangler CLI** — can deploy from CLI if needed
- **Existing infrastructure** — already using Cloudflare for other projects

## Alternatives Considered

- **Vercel** — good but has bandwidth limits on free plan
- **Netlify** — good but slower builds on free plan
- **GitHub Pages** — free but less flexible, no custom domain on free
- **AWS S3 + CloudFront** — powerful but too complex for a static site

## Consequences

- Locked into Cloudflare ecosystem (acceptable — already invested)
- Build limits on free plan (1 build at a time, fine for this project)
- `wrangler.toml` required at project root