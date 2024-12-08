import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  reporter: [['html', { outputFolder: 'test-results' }], ['json', { outputFolder: 'test-results' }]],
});
