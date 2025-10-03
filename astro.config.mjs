// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'server', // SSRモードを有効化
  server: {
    port: 4321,
  },
});
