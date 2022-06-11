import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    fileServerFolder: '.',
    fixturesFolder: './src/fixtures',
    supportFile: './src/support/e2e.ts',
    video: false,
    videosFolder: '../../dist/cypress/apps/majesdash-e2e/videos',
    screenshotsFolder: '../../dist/cypress/apps/majesdash-e2e/screenshots',
    chromeWebSecurity: false,
    baseUrl: 'http://localhost:4200',
    specPattern: './src/integration/**/*.spec.ts',
  },
});
