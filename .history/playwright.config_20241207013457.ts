import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Indiquez le bon répertoire pour vos tests
  testDir: 'testCases',  // Assurez-vous que ce répertoire contient vos fichiers de tests
  
  reporter: [
    ['html', { outputFolder: 'test-results' }],
    ['json', { outputFolder: 'test-results' }]
  ],

  testMatch: [
    '**/*.ts'  // Inclut tous les fichiers .ts
  ],

  timeout: 30000,
  retries: 1,
  workers: 2,
  use: {
    baseURL: 'https://playwright-lab.web.app/', 
  },
});
