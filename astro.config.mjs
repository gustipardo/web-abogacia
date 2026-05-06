// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.estudioghetti.com',
  output: 'static',
  adapter: vercel(),
  integrations: [
    sitemap({
      // /ficha-consulta y /api/* no van al sitemap.
      filter: (page) => !page.includes('/ficha-consulta') && !page.includes('/api/'),
    }),
  ],
});
