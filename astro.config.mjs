// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import sitemap from '@astrojs/sitemap';
import keystatic from '@keystatic/astro';

const isDev = process.argv.includes('dev');

export default defineConfig({
  site: 'https://ahandani.com',
  adapter: isDev ? undefined : cloudflare(),
  build: { format: 'file' },
  integrations: [
    react(),
    markdoc(),
    sitemap({ filter: (page) => !page.includes('/keystatic') }),
    keystatic(),
  ],
});
