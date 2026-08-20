# ADR 0004: Portable Report Skill

**Date:** 2026-08-20
**Status:** Accepted

## Context

Reports are written by AI agents (Claude, Cursor, Copilot, OpenClaw, etc.). We need a framework-agnostic specification that any agent can follow to produce consistent, high-quality reports.

## Decision

Create a **portable skill file** (`skill/SKILL.md`) that defines the report-writing process.

## Rationale

- **Framework-agnostic** — any AI agent can read and follow it
- **Self-contained** — includes format specs, theme details, quality guidelines
- **Convention over configuration** — agents follow the structure, get consistent results
- **Living document** — can be updated as the platform evolves
- **Complements CLAUDE.md and AGENTS.md** — those are project-level context; the skill is task-level

## What the Skill Defines

- Required report structure (Title → Version & Summary → TOC → Content)
- Two supported formats (Markdown and HTML/Astro) with templates
- Frontmatter schema
- Theme usage (callouts, diagrams, code blocks)
- Quality guidelines
- Deployment flow (git push → auto-deploy)

## Alternatives Considered

- **Just CLAUDE.md** — too project-focused, not task-specific enough
- **README only** — aimed at humans, not agents
- **No skill file** — rely on convention and examples — too fragile

## Consequences

- `skill/SKILL.md` must be kept in sync with actual conventions
- Agents should read the skill before writing their first report
- The skill is the single source of truth for report authoring