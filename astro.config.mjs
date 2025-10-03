// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  output: 'server', // SSRモードを有効化
  adapter: vercel(),
  server: {
    port: 4321,
  },
});
