const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./.github/tests",

  use: {
    baseURL: "http://localhost:3000",
    headless: true,
    screenshot: "only-on-failure",
    video: "retain-on-failure"
  },

  webServer: [
    {
      command: "cd App/Backend && npm start",
      url: "http://localhost:5000",
      timeout: 120000
    },
    {
      command: "cd App && npm start",
      url: "http://localhost:3000",
      timeout: 120000
    }
  ]
});