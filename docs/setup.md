# Setup

## Prerequisites

- Node.js 18+ (recommended: latest LTS)
- npm or your preferred package manager

## Local Development

```bash
# Clone the repo
git clone https://github.com/shrutsureja/ai-research.git
cd ai-research

# Install dependencies
npm install

# Start dev server
npm run dev
```

The dev server runs at `http://localhost:4321`.

## Build

```bash
npm run build    # outputs to dist/
npm run preview  # preview the build locally
```

## Project Structure

```
ai-research/
├── src/
│   ├── layouts/          # Page layouts
│   ├── components/       # Reusable UI components
│   ├── pages/            # Routes (index + dynamic report pages)
│   ├── content/          # Content collections (MD reports)
│   ├── styles/           # Shared CSS
│   └── data/             # Metadata helpers
├── public/               # Static assets
├── skill/                # Portable report skill
├── docs/                 # Documentation and ADRs
├── astro.config.mjs      # Astro configuration
├── tailwind.config.mjs   # Tailwind configuration
└── wrangler.toml         # Cloudflare Pages config
```

## Environment

No environment variables required for local development. The site is fully static.

For Cloudflare Pages deployment, see [deployment.md](deployment.md).