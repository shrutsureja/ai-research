---
title: "job-application-agent — Deep Dive Report"
summary: "A comprehensive code review and architectural analysis of the job-application-agent npm package — an Agent Skill + CLI that lets coding agents discover, evaluate, fill out, submit, and track job applications autonomously."
version: "1.0.0"
date: 2026-08-20
tags: ["code-review", "npm-package", "agent-skills"]
---

## What It Does (TL;DR)

An **Agent Skill + CLI** that lets a coding agent discover, evaluate, fill out, submit, and track job applications on a candidate's behalf. It packages:

- A **deterministic scoring engine** in pure Node.js (no LLM calls required for the math)
- **Local state management** with append-only ledgers, attention queues, and friction logs
- **OS-backed secure storage** (macOS Keychain / Windows Credential Manager) for the candidate profile
- **Privacy-preserving telemetry** that ships through a Cloudflare Worker → PostHog pipeline with strict identity stripping
- An **installer** that drops the skill into `~/.agents/skills/` and registers an hourly auto-update background job

The agent is told to use it via natural language (*"search jobs"*, *"apply https://..."*, *"show attention queue"*) and the CLI handles all the deterministic bookkeeping. The agent itself only does browser interaction + discovery.

<div class="callout callout-tip">
  <div class="callout-title">💡 Key Insight</div>
  The architecture cleanly separates <strong>deterministic logic</strong> (scoring, state, telemetry) from <strong>non-deterministic logic</strong> (browser interaction, form filling) — the agent handles the fuzzy stuff, the CLI handles the math.
</div>

## Repository Stats

| Metric | Value |
|--------|-------|
| Files in repo | 142 |
| Versions published | 9 (in 5 days) |
| Unpacked size | ~218 KB |
| Files in npm tarball | 27 |
| Test files | 7 |

### File Layout

```text
job-application-agent/
├── bin/
│   └── job-application-agent.mjs      ← npm bin entry
├── installer/
│   └── src/
│       ├── cli.mjs                     ← install/update/status commands
│       ├── installer.mjs               ← staging, rollback, vendor copy
│       ├── runner.mjs                  ← auto-update shell script gen
│       └── scheduler.mjs               ← launchd / systemd / Task Scheduler
├── job-application-agent/
│   ├── SKILL.md                        ← agent-facing spec
│   ├── references/
│   │   ├── ANALYTICS.md
│   │   ├── APPLICATION_GUIDANCE.md
│   │   ├── AUTONOMY.md
│   │   ├── BROWSER_UPLOADS.md
│   │   ├── RUNS.md
│   │   └── SCHEMAS.md
│   ├── scripts/
│   │   ├── job-application.mjs         ← main CLI (command router)
│   │   ├── secret-store.mjs            ← keychain/cred manager wrapper
│   │   ├── telemetry-client.mjs        ← outbound telemetry
│   │   ├── telemetry-schema.mjs        ← event validation
│   │   └── windows-profile-store.ps1   ← DPAPI wrapper for Win
│   └── tests/                          ← 7 test files
├── LICENSE
├── package.json
├── README.md
├── SECURITY.md
└── scripts/
    ├── ci/
    ├── smoke-package.mjs
    └── ...
```

## Architecture & Components

The system is composed of several tightly-scoped modules, each with clear responsibilities:

| Component | File | ~Lines | Responsibility |
|-----------|------|--------|----------------|
| Main CLI | `job-application.mjs` | ~1100 | Single mega-CLI with command router |
| Secret Store | `secret-store.mjs` | ~130 | OS keychain abstraction |
| Telemetry Client | `telemetry-client.mjs` | ~150 | Outbound telemetry client |
| Telemetry Schema | `telemetry-schema.mjs` | ~160 | Event schemas with enum validation |
| Installer | `installer.mjs` | ~180 | Skill staging, atomic replace, rollback |
| Scheduler | `scheduler.mjs` | ~110 | launchd plist / systemd timer / Win Task Scheduler |

### Architecture Diagram

<div class="diagram">
<svg viewBox="0 0 700 380" xmlns="http://www.w3.org/2000/svg" style="font-family: 'Inter', system-ui, sans-serif;">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#6366f1;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#818cf8;stop-opacity:1" />
    </linearGradient>
    <filter id="shadow">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.15"/>
    </filter>
  </defs>

  <!-- Agent Layer -->
  <rect x="20" y="20" width="660" height="70" rx="10" fill="#f0f4ff" stroke="#6366f1" stroke-width="1.5" filter="url(#shadow)"/>
  <text x="350" y="45" text-anchor="middle" font-size="13" font-weight="700" fill="#4338ca">AI Agent (Claude / Cursor / Copilot / Codex)</text>
  <text x="350" y="65" text-anchor="middle" font-size="11" fill="#6366f1">Natural language commands → browser interaction → form filling</text>

  <!-- Arrow -->
  <line x1="350" y1="90" x2="350" y2="115" stroke="#6366f1" stroke-width="2" marker-end="url(#arrow)"/>

  <!-- CLI Core -->
  <rect x="50" y="120" width="600" height="90" rx="10" fill="#fff" stroke="#e2e8f0" stroke-width="1.5" filter="url(#shadow)"/>
  <text x="350" y="145" text-anchor="middle" font-size="13" font-weight="700" fill="#1a1a2e">job-application.mjs — Command Router (~1100 lines)</text>

  <!-- Sub-modules inside CLI -->
  <rect x="70" y="155" width="130" height="40" rx="6" fill="#eef2ff" stroke="#c7d2fe" stroke-width="1"/>
  <text x="135" y="170" text-anchor="middle" font-size="10" font-weight="600" fill="#4338ca">Scoring Engine</text>
  <text x="135" y="183" text-anchor="middle" font-size="9" fill="#6366f1">scoreJob()</text>

  <rect x="210" y="155" width="130" height="40" rx="6" fill="#eef2ff" stroke="#c7d2fe" stroke-width="1"/>
  <text x="275" y="170" text-anchor="middle" font-size="10" font-weight="600" fill="#4338ca">Ledger System</text>
  <text x="275" y="183" text-anchor="middle" font-size="9" fill="#6366f1">Append-only</text>

  <rect x="350" y="155" width="130" height="40" rx="6" fill="#eef2ff" stroke="#c7d2fe" stroke-width="1"/>
  <text x="415" y="170" text-anchor="middle" font-size="10" font-weight="600" fill="#4338ca">Round Manager</text>
  <text x="415" y="183" text-anchor="middle" font-size="9" fill="#6366f1">Batch tracking</text>

  <rect x="490" y="155" width="130" height="40" rx="6" fill="#eef2ff" stroke="#c7d2fe" stroke-width="1"/>
  <text x="555" y="170" text-anchor="middle" font-size="10" font-weight="600" fill="#4338ca">Friction Log</text>
  <text x="555" y="183" text-anchor="middle" font-size="9" fill="#6366f1">UX issues</text>

  <!-- Arrows down -->
  <line x1="135" y1="195" x2="135" y2="225" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#arrow)"/>
  <line x1="275" y1="195" x2="275" y2="225" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#arrow)"/>
  <line x1="415" y1="195" x2="415" y2="225" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#arrow)"/>
  <line x1="555" y1="195" x2="555" y2="225" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#arrow)"/>

  <!-- Infrastructure Layer -->
  <rect x="70" y="230" width="130" height="55" rx="8" fill="#f0fdf4" stroke="#10b981" stroke-width="1.5"/>
  <text x="135" y="250" text-anchor="middle" font-size="10" font-weight="600" fill="#047857">Secret Store</text>
  <text x="135" y="265" text-anchor="middle" font-size="9" fill="#10b981">Keychain / DPAPI</text>

  <rect x="210" y="230" width="130" height="55" rx="8" fill="#fffbeb" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="275" y="250" text-anchor="middle" font-size="10" font-weight="600" fill="#b45309">Telemetry</text>
  <text x="275" y="265" text-anchor="middle" font-size="9" fill="#f59e0b">→ CF Worker → PostHog</text>

  <rect x="350" y="230" width="130" height="55" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="415" y="250" text-anchor="middle" font-size="10" font-weight="600" fill="#1d4ed8">Installer</text>
  <text x="415" y="265" text-anchor="middle" font-size="9" fill="#3b82f6">Atomic + Rollback</text>

  <rect x="490" y="230" width="130" height="55" rx="8" fill="#f5f3ff" stroke="#8b5cf6" stroke-width="1.5"/>
  <text x="555" y="250" text-anchor="middle" font-size="10" font-weight="600" fill="#6d28d9">Auto-Updater</text>
  <text x="555" y="265" text-anchor="middle" font-size="9" fill="#8b5cf6">launchd / systemd</text>

  <!-- Vendor targets -->
  <rect x="50" y="310" width="600" height="50" rx="10" fill="#0f172a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="350" y="330" text-anchor="middle" font-size="11" font-weight="600" fill="#e2e8f0">Vendor Sync Targets</text>
  <text x="350" y="348" text-anchor="middle" font-size="10" fill="#94a3b8">~/.codex/skills/  ·  ~/.claude/skills/  ·  ~/.cursor/skills/  ·  ~/.copilot/skills/  ·  ~/.gemini/skills/</text>

  <!-- Arrow defs -->
  <defs>
    <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#6366f1"/>
    </marker>
  </defs>
</svg>
<div class="diagram-caption">Figure 1 — High-level architecture: Agent layer → CLI core → Infrastructure layer → Vendor sync</div>
</div>

## Workflow: How a Job Gets Applied To

The system uses a **round-based execution model** for batch operations. When the agent starts a batch, it initiates a "round" with a target count:

```javascript
{
  roundId: "round-2026-08-20-001",
  requestedCount: 30,
  startedAt: "2026-08-20T10:00:00Z",
  status: "active"
}
```

Each `roundId` gets attached to ledger entries throughout the round. The round-complete logic rejects if you didn't hit the target count, enabling **resumable workflows** across agent sessions and crash recoveries.

<div class="callout callout-note">
  <div class="callout-title">📝 Design Choice</div>
  Round-based tracking means a crashed agent can resume exactly where it left off. The ledger is the source of truth — not the agent's memory.
</div>

### Workflow Steps

1. **Discovery** — Agent searches job boards or follows provided URLs
2. **Scoring** — `scoreJob(input, target)` evaluates each position against the candidate profile
3. **Decision** — Gate engine returns `auto-submit`, `review`, or `reject`
4. **Application** — Agent fills out the form via browser automation
5. **Ledger** — Result is appended to the application ledger with round ID
6. **Follow-up** — Attention queue surfaces applications needing responses

## Scoring Engine Deep Dive

The core `scoreJob(input, target)` function is a **deterministic gate-decision engine**. No LLM calls — just pure math.

### Decision Gates (in order)

| Gate | Purpose | Action on Fail |
|------|---------|----------------|
| Company exclusion | Block listed companies | Hard reject |
| Eligibility | Check work authorization | Hard reject |
| Posting status | Verify job is still open | Hard reject |
| Location/work-mode | Match preferred location/remote | Hard reject |
| Seniority | Match target level | Hard reject |
| Must-have coverage | Required skills present | Flag for review |
| Compensation floor | Salary meets minimum | Flag for review |

### Score Components

| Component | Max Points | Description |
|-----------|-----------|-------------|
| Role family match | +25 | Job title matches candidate's target role |
| Seniority match | +15 | Level aligns with target (junior/mid/senior/staff) |
| Must-have coverage | +40 | Percentage of required skills the candidate has |
| Location/remote match | +10 | Location preference alignment |
| Industry match | +5 | Candidate's preferred industries |
| Compensation pass | +5 | Salary above floor |

### Auto-Submit Guard

The auto-submit threshold is intentionally strict — all conditions must be met:

```text
decision === "review"
seniority === "senior" || seniority === "staff"
no experience mismatch
score >= 80
must-have coverage >= 70%
all gates passed
```

<div class="callout callout-warning">
  <div class="callout-title">⚠️ Safety Note</div>
  Auto-submit is off by default. The agent operates in <strong>review-each</strong> mode unless explicitly told to auto-submit, and even then, the guard checks are strict.
</div>

## Local Storage & Privacy Boundaries

### Secret Store

The secret store abstracts OS-native credential management:

| Platform | Mechanism | Implementation |
|----------|-----------|----------------|
| macOS | Keychain | `security` CLI command |
| Windows | Credential Manager | PowerShell + DPAPI |
| Linux | ❌ Unsupported | Throws explicit error |

### Ledger System

All state changes are written to **append-only ledgers** with:

- **Idempotency keys** — prevents duplicate applications
- **Duplicate detection** — same job URL + company flagged
- **Round accounting** — tracks counts per round for batch completion checks
- **Friction logs** — records UX issues encountered during application for later review

<div class="callout callout-tip">
  <div class="callout-title">💡 Privacy Win</div>
  The candidate profile (name, contact, work history) never touches the filesystem as plaintext. It lives in the OS keychain, encrypted at rest by the OS itself.
</div>

## Telemetry Pipeline

The telemetry system is designed to be **privacy-preserving while still useful** for the developer.

### Event Architecture

- **13 documented event types** with strict enum validation
- **Max 4 KB payload** per event
- Events validated against schema before sending
- Ships to Cloudflare Worker → PostHog

### Identity Stripping

The `containsDirectIdentity()` function uses regex to reject payloads containing:

- Email addresses
- Phone numbers
- URLs (may contain identifying paths)
- LinkedIn/GitHub profile references

<div class="callout callout-warning">
  <div class="callout-title">⚠️ Telemetry is ON by Default</div>
  Telemetry is enabled out of the box. Disable via the CLI command: <code>job-application-agent telemetry off</code>. The identity stripping is robust but regex-based — edge cases may exist.
</div>

## Installer & Auto-Updates

### Installation Flow

1. **Validates** packaged skill integrity
2. **Stages** to a temp directory
3. **Atomic replace** — swaps the old version with the new in one operation
4. **Rollback** — if anything fails mid-install, the previous version is restored

### Vendor Sync

The installer copies the skill to all known agent vendor directories:

```text
~/.codex/skills/
~/.claude/skills/
~/.cursor/skills/
~/.copilot/skills/
~/.gemini/skills/
```

### Auto-Update Scheduler

| Platform | Mechanism | Schedule |
|----------|-----------|----------|
| macOS | LaunchAgent plist | Hourly |
| Linux | systemd timer | Hourly |
| Windows | Scheduled Task | Hourly |

Auto-update can be disabled via CLI. The installer also supports manual `update` and `status` commands.

## Safety Guardrails

### Hard Stops — Agent Will NOT Do These

| Action | Reason |
|--------|--------|
| Authentication / passwords | Never handle credentials in the browser |
| Legal attestations | Cannot click "I agree to terms" on user's behalf |
| Demographic questions | Race, gender, disability — agent skips these |
| Ambiguous claims | Won't fabricate experience or skills |

### Browser Session Rules

- **Never** inspect cookies or local storage
- **Reuses** the existing browser session (doesn't create new logins)
- **Privileged path-based upload** — uses known upload paths, not page scraping

### Submission Rules

- No submission without **visible confirmation** (agent must see a success state)
- **Duplicate detection** prevents applying to the same job twice
- **Default mode: review-each** — human reviews each application before submit

<div class="callout callout-note">
  <div class="callout-title">📝 Balanced Approach</div>
  The guardrails are thoughtful — they prevent the agent from making legally binding decisions while still allowing genuine automation of the tedious parts (searching, scoring, form-filling).
</div>

## Final Verdict

### What It Does Well ✅

- **Architecture is thoughtful** — clean separation of deterministic vs. non-deterministic logic
- **Privacy claims backed by code** — keychain integration is real, telemetry stripping is implemented
- **Credential handling is real** — not just "store in a JSON file", actual OS keychain
- **Append-only ledgers** — crash-safe, auditable, resumable
- **Auto-update opt-out** — respects user autonomy
- **Honest about scope** — doesn't overpromise

### Caveats ⚠️

- **9 versions in 5 days** — very early, API may still be shifting
- **Linux unsupported** for profile store (major gap for developer audience)
- **Telemetry on by default** — should be opt-in for a privacy-focused tool
- **PostHog retention caveat** — data lives on third-party infra
- **Single-author project** — bus factor of 1
- **Browser-uploads still requires agent** for form-filling — not fully autonomous

### Recommendation

| If you... | Verdict |
|-----------|---------|
| Are on macOS/Windows | ✅ Worth trying |
| Want privacy-respecting deterministic agent skill | ✅ Good fit |
| Are comfortable with Node + browser automation | ✅ Good fit |
| Want hosted SaaS | ❌ Not for you |
| Need multi-user support | ❌ Not for you |
| Are on Linux | ❌ Wait for support |
| Want battle-tested project | ❌ Too early |

**Bottom line:** Pin `v3.1.1`, disable telemetry first, and give it a shot on macOS. The architecture is sound — the main risks are project maturity and single-author dependency.