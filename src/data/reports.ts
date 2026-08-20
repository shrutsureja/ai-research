// reports.ts — report metadata helper
// This module provides a typed interface to report metadata.
// For MD reports, Astro content collections are used.
// For HTML (.astro) reports, metadata is defined in the frontmatter of the page.

export interface ReportMeta {
  title: string;
  summary: string;
  version: string;
  date: string; // ISO date string
  tags: string[];
  slug: string;
}

// All available tags (computed from reports at build time)
export const allTags: string[] = [
  'code-review',
  'npm-package',
  'agent-skills',
];