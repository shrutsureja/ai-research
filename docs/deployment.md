# Deployment

## Platform: Cloudflare Pages

The site deploys to Cloudflare Pages at `ai-research.shrutsureja.com`.

## Configuration

- **Project name:** `ai-research`
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **wrangler.toml:** present at project root

## Initial Setup (one-time)

1. Create the Cloudflare Pages project:
```bash
CLOUDFLARE_API_TOKEN=$(cat ~/.cloudflared/credentials.json | jq -r .api_token) \
CLOUDFLARE_ACCOUNT_ID=<account_id> \
wrangler pages project create ai-research --production-branch main
```

2. Connect the GitHub repo `shrutsureja/ai-research` to the Pages project (via Cloudflare dashboard or CLI).

3. Set the custom domain `ai-research.shrutsureja.com` in the Pages project settings.

## Auto-Deploy

- Push to `main` → Cloudflare Pages auto-builds and deploys
- Build logs available in the Cloudflare dashboard

## Manual Deploy (if needed)

```bash
npm run build
CLOUDFLARE_API_TOKEN=<token> \
CLOUDFLARE_ACCOUNT_ID=<account_id> \
wrangler pages deploy dist --project-name ai-research
```

## Custom Domain

- Domain: `ai-research.shrutsureja.com`
- DNS: CNAME to the Cloudflare Pages default domain
- SSL: automatic via Cloudflare