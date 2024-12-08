import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Define the directory where your tests are located
  testDir: './tests', // Adjust this to the correct path if necessary

  // Reporter configuration for generating HTML and JSON reports
  reporter: [
    ['html', { outputFolder: 'test-results' }],
    ['json', { outputFolder: 'test-results' }]
  ],

  // Optionally, you can define test match patterns if you need to filter which files to run
  testMatch: [
    '**/*.spec.ts',  // Change this to match your file naming conventions if needed
    '**/*.test.ts'
  ],

  // Timeout for each individual test case
  timeout: 30000,

  // Retry configuration, in case you want to retry failed tests
  retries: 1,

  // Whether to run tests in parallel (you can adjust this as needed)
  workers: 2,

  use: {
    // Set the base URL for all your tests, e.g., for navigating
    baseURL: 'https://playwright-lab.web.app/',
    
    // You can also set additional configurations here, like viewport sizes, browsers to test, etc.
  },

  // Additional configurations can go here, such as globalSetup, globalTeardown, etc.
});
