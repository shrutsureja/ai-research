import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://ai-research.shrutsureja.com',
  output: 'static',
  integrations: [tailwind()],
});