# ADR 0005: Dashboard Design

**Date:** 2026-08-20
**Status:** Accepted

## Context

The dashboard (index page) is the entry point for all visitors. It needs to present reports in a browsable, searchable way with a clean, modern, geeky aesthetic.

## Decision

Design a **card-based dashboard** with client-side search and tag filtering.

## Design Choices

### Layout
- **Card grid** — responsive, 1 column on mobile, 2 on desktop
- Each card shows: title, date, summary (2-line clamp), tags
- Cards link to the full report page

### Search
- **Client-side filtering** — no server needed
- Searches across title, tags, and summary
- Real-time as you type
- Clear button to reset

### Tag Filtering
- **Chip-style filters** — horizontal row above the grid
- "All" chip + one per unique tag
- Click to filter; combines with search query
- Active chip is highlighted

### Visual Design
- **Geeky, clean, modern** — not corporate
- Indigo accent color (`#6366f1`)
- Subtle borders, rounded corners, hover shadows
- Light: white cards on slate-50 background
- Dark: `#161b22` cards on `#0d1117` background
- Inter font, JetBrains Mono for code

### Theme Toggle
- Sun/moon icon toggle
- Persisted in `localStorage`
- No FOUC (anti-flash script in `<head>`)
- Respects `prefers-color-scheme` on first visit

## Alternatives Considered

- **List view** — less visual, harder to scan
- **Server-side search** — unnecessary for a static site
- **No tag filter** — reports would be hard to find as the collection grows
- **Sidebar filters** — more complex, less mobile-friendly

## Consequences

- All filtering happens client-side — scales well for hundreds of reports
- No search index needed — `data-*` attributes on cards are the index
- Dashboard rebuilds on every build — reports list is always current