import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: '../testCases',
  reporter: [
    ['html', { outputFolder: '../test-results' }],
    ['json', { outputFolder: '../test-results'}]
  ],
  testMatch: [
    '**/*.ts'
  ],
  timeout: 30000,
  retries: 1,
  workers: 2,
  use: {
    baseURL: 'https://playwright-lab.web.app/', 
  },
  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'WebKit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
