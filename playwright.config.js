
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './.github/tests',

  use: {
    baseURL: 'http://localhost:3000',
    headless: true,
  },

  webServer: {
    command: 'cd App/Backend && npm start',
    url: 'http://localhost:3000',
    timeout: 120000,
    reuseExistingServer: !process.env.CI,
  },
});