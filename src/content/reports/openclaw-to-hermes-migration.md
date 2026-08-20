---
title: "OpenClaw → Hermes Agent Migration Guide"
summary: "A practical deep-dive on migrating from OpenClaw to Hermes Agent — what migrates automatically, what needs manual setup, deployment options for your laptop vs cloud, and a verdict on whether you should switch now or wait."
version: "1.0.0"
date: 2026-08-20
tags: ["migration-guide", "ai-agents", "openclaw", "hermes-agent"]
---

## What It Does (TL;DR)

Hermes Agent (by Nous Research) is a self-improving AI agent framework that's emerged as the natural successor to OpenClaw. It ships a built-in migration tool (`hermes claw migrate`) that reads your `~/.openclaw/` config, transplants API keys, models, custom skills, and memory into `~/.hermes/`, and leaves the source untouched.

The migration takes under 10 minutes for most setups. The real work is unlearning OpenClaw's tier-routing mental model and trusting Hermes' skill loop to fill the gap.

### Quick Verdict

| Question | Answer |
|----------|--------|
| Should you migrate? | **Yes, but not today.** Plan it within a quarter. |
| Can you keep your data? | **Yes** — credentials, skills, and memory migrate automatically. |
| Deploy on your laptop? | **Yes, for now.** Laptop is fine. Cloud (Daytona/Modal) is optional later. |
| Is OpenClaw dead? | **Maintenance-only.** No new agent-level features. Security fixes only. |
| Is Hermes production-ready? | **Yes** — v0.19.0, 233K+ GitHub stars, active development. |

---

## Repository Stats

| Metric | Value |
|--------|-------|
| GitHub stars | 233,000+ |
| Forks | 46,700+ |
| Open issues | 33,700+ |
| License | MIT |
| Language | Python 3.11+ |
| Current version | v0.19.0 (PyPI) |
| Created | July 2025 |
| Maintainer | Nous Research |

---

## Architecture & Components

### OpenClaw (Current)

OpenClaw is a Node.js-based agent framework with:
- YAML config layer (`~/.openclaw/openclaw.json`)
- Tier-routing engine (primary/fallback/economy models)
- Skill system (`~/.openclaw/skills/`)
- Memory files (`~/.openclaw/workspace/MEMORY.md`, `memory/*.md`)
- Messaging gateway (Telegram, Discord, etc.)
- Cron scheduler
- Browser automation
- MCP integration

### Hermes Agent (Target)

Hermes is a Python-based agent framework with:
- Config file (`~/.hermes/config.yaml`) + `.env` for credentials
- Skill system (`~/.hermes/skills/`) — compatible with agentskills.io standard
- Memory system (`~/.hermes/memories/MEMORY.md` + `USER.md`) — bounded, curated, with FTS5 search
- Self-improving learning loop (creates and improves skills from experience)
- 20+ messaging platform adapters (Telegram, Discord, Slack, WhatsApp, Signal, Matrix, etc.)
- 6 terminal backends: local, Docker, SSH, Daytona, Singularity, Modal
- 70+ built-in tools across 28 toolsets
- Cron scheduler with delivery to any platform
- Bot Mode (multiple specialist bots with own models, memory, skills)
- MCP integration
- Voice mode (CLI, Telegram, Discord)
- Desktop app (macOS + Windows)
- Session search (SQLite + FTS5 across all past conversations)

### Key Architectural Differences

| Feature | OpenClaw | Hermes |
|---------|----------|--------|
| Language | Node.js | Python 3.11+ |
| Config format | JSON (`openclaw.json`) | YAML (`config.yaml`) + `.env` |
| Model routing | Tier-based (primary/fallback/economy) | Default model + per-skill model overrides |
| Memory | Unlimited files, manual curation | Bounded (2,200 chars MEMORY + 1,375 chars USER), auto-managed |
| Skills | Static markdown files | Static + **self-creating** skills (learning loop) |
| Session search | No | Yes — SQLite FTS5 across all sessions |
| Deployment | Local only | Local, Docker, SSH, Daytona, Modal, Singularity |
| Voice | No | Yes — TTS + voice messages + Discord VC |
| Desktop app | No | Yes — macOS + Windows |
| Bot mode | No | Yes — multiple specialist bots |
| Sub-agents | Yes (sessions_spawn) | Yes (delegate_tool) |

---

## What Migrates Automatically

The `hermes claw migrate` command handles:

| OpenClaw artifact | Lands in Hermes as | Auto-migrated? |
|---|---|---|
| `~/.openclaw/openclaw.json` provider blocks | `~/.hermes/.env` (OPENAI_API_KEY, OPENAI_BASE_URL, etc.) | ✅ Yes |
| Default provider + model | `hermes model` selection saved to config | ✅ Yes |
| Custom skills in `~/.openclaw/skills/` | `~/.hermes/skills/` (copied directly) | ✅ Yes |
| Memory notes (`MEMORY.md`, `USER.md`) | `~/.hermes/memories/MEMORY.md` and `USER.md` | ✅ Yes |
| Search provider keys (Tavily, Bing) | Hermes search tool config | ✅ Yes |

### What Does NOT Migrate

| OpenClaw feature | Hermes equivalent | Status |
|---|---|---|
| Tier routing (primary/fallback/economy) | Per-skill model overrides | ❌ Not transplanted — different mechanics |
| `extra_params.thinking` and provider overrides | `model_params` in Hermes config | ❌ Skipped — reapply manually |
| CLI scripts and `openclaw` subcommands | Different CLI surface in Hermes | ❌ No equivalent |
| Usage tracking history (`~/.openclaw/usage/*.json`) | Fresh usage log | ❌ Not imported |
| Workspace files (`AGENTS.md`, `SOUL.md`, etc.) | `SOUL.md` supported natively, `AGENTS.md` → context files | ⚠️ Manual mapping needed |
| Credentials (`~/.openclaw/credentials/`) | `~/.hermes/.env` | ⚠️ Migrated as env vars, not files |
| Cron jobs | Hermes cron system | ⚠️ Recreate manually (same concept, different format) |
| Notion MCP integration | Hermes MCP support | ⚠️ Reconfigure MCP servers |

---

## Migration Steps

### Step 1: Install Hermes

```bash
# Linux / macOS / WSL2
curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash
```

The installer handles everything — Python 3.11, Node.js v22, ripgrep, ffmpeg, and the hermes binary. All dependencies are auto-installed.

### Step 2: Dry-Run Migration

```bash
# See what would be migrated without changing anything
hermes claw migrate --dry-run
```

This writes a manifest of every file that would be read, every credential that would be transplanted, and every skill that would be copied — then exits without touching `~/.hermes/`.

### Step 3: Run Migration

```bash
# Full migration
hermes claw migrate

# Or: migrate only user data (skills, memory, preferences) — skip credentials
hermes claw migrate --preset user-data

# Or: overwrite existing Hermes state from a previous attempt
hermes claw migrate --overwrite
```

### Step 4: Verify

```bash
# 1. Confirm Hermes can see your credentials
hermes status

# 2. Check your skills came across
hermes skills list

# 3. Check memory file isn't empty
cat ~/.hermes/memories/MEMORY.md

# 4. Test a round-trip
hermes chat -q "respond with 'migration ok' and nothing else"
```

### Step 5: Manual Cleanup

These need manual attention after migration:

1. **Model routing** — if you used OpenClaw's tier routing, set up per-skill model overrides instead. Set your default with `hermes model`, then add `metadata.hermes.model` blocks in specific skills that need a stronger model.

2. **Cron jobs** — recreate any scheduled jobs in Hermes' cron system. The concept is the same but the config format differs.

3. **MCP servers** — reconfigure any MCP integrations (like Notion) in Hermes' MCP config.

4. **Workspace context** — map your OpenClaw workspace files:
   - `SOUL.md` → `~/.hermes/SOUL.md` (supported natively)
   - `AGENTS.md` → context files or `SOUL.md` additions
   - `USER.md` → `~/.hermes/memories/USER.md` (auto-migrated)
   - `TOOLS.md` → fold into memory or skill notes

5. **Telegram pairing** — reconfigure messaging gateway with `hermes gateway setup`.

---

## Deployment Options

### Option A: Your Laptop (Recommended for Now)

**Pros:**
- Zero additional cost
- Full access to local files, credentials, browser
- Same setup as OpenClaw — familiar mental model
- Hermes runs as a background service via systemd

**Cons:**
- Agent is down when laptop is off
- No remote access (unless you set up a tunnel)
- Resource constrained by your machine

**Setup:**
```bash
# Install as a user service (starts on login, stops on logout)
hermes gateway install

# Or as a system service (starts at boot)
sudo hermes gateway install --system
```

### Option B: Daytona (Serverless Cloud)

**Pros:**
- Serverless persistence — hibernates when idle, costs nearly nothing
- Agent is always available (Telegram, Discord, etc.)
- No laptop dependency
- Your laptop stays clean

**Cons:**
- Additional setup complexity
- Needs cloud account
- File access requires SSH or remote backend

### Option C: Modal (Serverless Cloud)

Similar to Daytona — serverless, hibernates when idle, near-zero cost when not in use.

### Option D: Docker on Your Laptop

**Pros:**
- Isolation from host system
- Reproducible environment
- Easy to reset

**Cons:**
- More resource overhead
- File access needs volume mounts
- Browser automation more complex

### Verdict: Deploy on Laptop

**For your current setup, the laptop is the right choice.** Here's why:

1. You already have everything configured locally — credentials, browser, Cloudflare tunnel, gws CLI
2. Your cron jobs (morning briefing, evening check-in) need the machine on anyway
3. The migration from OpenClaw to Hermes is mostly mechanical — same machine, same setup
4. Cloud deployment (Daytona/Modal) is a future optimization, not a migration requirement
5. You can always add cloud later as a second backend without removing the local one

---

## Your Current Setup: What Needs Attention

Based on your actual `~/.openclaw/` directory:

### Will Migrate Smoothly ✅
- **Custom skills** (75+ GWS skills, persona skills, research-report skill) → copied to `~/.hermes/skills/`
- **Memory files** (`MEMORY.md`, `memory/*.md`) → `~/.hermes/memories/`
- **Model config** → `hermes model` selection
- **Telegram integration** → `hermes gateway setup` (reconfigure)

### Needs Manual Reconfiguration ⚠️
- **Cloudflare credentials** (`~/.openclaw/credentials/cloudflare.json`) → add to `~/.hermes/.env` as `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID`
- **gws CLI** (Google Workspace) — Hermes doesn't have native GWS integration, but your GWS skills will work as skills (they call the CLI)
- **Cron jobs** (5 jobs: morning briefing, evening check-in, etc.) → recreate in Hermes cron
- **MCP servers** (Notion) → `hermes config` MCP setup
- **Cloudflare tunnel** — works as-is, just point `dev.shrutsureja.com` to whatever port Hermes uses
- **Workspace scripts** (`scripts/snapshot.sh`, heartbeat, etc.) → move to Hermes directory or keep in workspace

### Won't Migrate ❌
- **OpenClaw-specific config** (`openclaw.json` tier routing, exec-approvals, session config)
- **Usage history** — fresh start in Hermes
- **Session transcripts** — not portable
- **Browser extension relay** — Hermes has its own browser automation

---

## Memory System Comparison

### OpenClaw Memory (Current)
- **Files:** `MEMORY.md` + `memory/YYYY-MM-DD.md` daily notes
- **No character limit** — can grow unbounded
- **Manual curation** — you and the agent manage it
- **No session search** — can't find past conversations

### Hermes Memory (Target)
- **Files:** `~/.hermes/memories/MEMORY.md` (2,200 chars) + `USER.md` (1,375 chars)
- **Bounded** — strict character limits keep prompts focused
- **Auto-managed** — agent adds, replaces, removes entries via memory tool
- **Security scanned** — blocks injection/exfiltration patterns
- **Session search** — SQLite FTS5 across ALL past conversations
- **Learning journey** — visual timeline of everything Hermes has learned

### Migration Impact

Your current `MEMORY.md` is likely larger than Hermes' 2,200 char limit. The migration tool will copy it, but you'll need to help Hermes consolidate it down. Your daily notes (`memory/*.md`) won't transfer — Hermes uses session search instead.

**Recommendation:** Before migrating, distill your MEMORY.md to the essential facts. Let Hermes' learning loop rebuild the rest over time.

---

## Risk Assessment

| Risk | Severity | Mitigation |
|------|----------|-----------|
| Skills break in Hermes | Low | Skills are markdown files — Hermes is compatible with the agentskills.io standard |
| Memory overflow | Medium | Consolidate MEMORY.md before migrating; Hermes auto-manages after |
| Cron jobs stop working | Medium | Recreate manually — same concept, different config |
| Credential exposure | Low | `--dry-run` first; `--preset user-data` to skip credentials |
| Loss of OpenClaw config | None | Migration is non-destructive — `~/.openclaw/` stays untouched |
| Model cost increase | Low | Hermes' per-skill model routing can actually reduce costs |
| Telegram bot downtime | Low | Reconfigure gateway; test before switching |

---

## Final Verdict

### ✅ Migrate — but not today

**Hermes Agent is the clear successor to OpenClaw.** The migration tool is first-class, the feature set is superior, and the ecosystem is thriving (233K+ stars, active development, Nous Research backing).

**However, you don't need to rush:**

1. **OpenClaw still works** — maintenance mode means security fixes, not abandonment
2. **Your setup is complex** — 75+ skills, 5 cron jobs, Cloudflare tunnel, gws CLI, Notion MCP. Plan the migration for a weekend.
3. **The laptop deployment is correct** — no need to move to cloud. Hermes runs locally just like OpenClaw does.
4. **Do a dry-run first** — `hermes claw migrate --dry-run` to see exactly what transfers
5. **Keep OpenClaw running** — migration is non-destructive. Run both side-by-side until you're confident, then archive OpenClaw.

### Recommended Timeline

| When | What |
|------|------|
| Week 1 | Install Hermes, run `--dry-run`, review manifest |
| Week 2 | Consolidate MEMORY.md, test migration on a weekend |
| Week 3 | Recreate cron jobs, reconfigure Telegram + MCP |
| Week 4 | Run both side-by-side, compare behavior |
| Week 5+ | If happy, archive OpenClaw. Keep `~/.openclaw/` as backup. |

### 🛑 Don't Migrate If...

- You need OpenClaw's tier routing exactly as-is (Hermes uses a different model)
- Your GWS skills depend on OpenClaw-specific tool calling (they should work, but test first)
- You're in the middle of critical work and can't afford a weekend of debugging
- You want to stay on Node.js (Hermes is Python-based)

### 🎯 Do Migrate If...

- You want self-improving skills (Hermes creates and improves skills from experience)
- You want session search (find past conversations across all sessions)
- You want voice mode (TTS, voice messages, Discord VC)
- You want bot mode (multiple specialist bots with their own models and memory)
- You want cloud deployment options (Daytona, Modal — serverless, near-zero idle cost)
- You want a desktop app (macOS + Windows)
- You want the learning journey visualization (`/journey`)