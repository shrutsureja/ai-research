// html-reports.ts — registry for HTML/Astro reports
// Each HTML report is an .astro file in src/pages/reports/html/ that uses ReportLayout
// This registry makes them show up on the dashboard alongside MD reports

export interface HTMLReport {
  slug: string;
  title: string;
  summary: string;
  version: string;
  date: string; // ISO date
  tags: string[];
  headings?: { depth: number; slug: string; text: string }[];
  html: string; // raw HTML content
}

// Add HTML reports here
// To create a new HTML report:
// 1. Write the HTML content (with <h2>/<h3> headings for TOC)
// 2. Add an entry below with metadata + headings
const htmlReports: HTMLReport[] = [
  // Example:
  // {
  //   slug: 'my-html-report',
  //   title: 'My HTML Report',
  //   summary: 'A report with custom diagrams and HTML',
  //   version: '1.0.0',
  //   date: '2026-08-20',
  //   tags: ['code-review'],
  //   headings: [
  //     { depth: 2, slug: 'section-1', text: 'Section 1' },
  //     { depth: 2, slug: 'section-2', text: 'Section 2' },
  //   ],
  //   html: '<p>Report content here...</p>',
  // },
];

export default htmlReports;