import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  timeout: 30000,
  use: {
    headless: true,
    actionTimeout: 0,
    ignoreHTTPSErrors: true,
    baseURL: 'http://127.0.0.1:3000',
  },
});
