import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  site: 'https://ai-research.shrutsureja.com',
  output: 'static',
  integrations: [tailwind()],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
  server: {
    host: '0.0.0.0',
    allowedHosts: ['dev.shrutsureja.com'],
  },
});
