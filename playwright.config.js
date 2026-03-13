const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./.github/tests",

  use: {
    baseURL: "http://localhost:5173",
    headless: true,
    screenshot: "only-on-failure",
    video: "retain-on-failure"
  },

  webServer: [
    {
      command: "cd App/Backend && npm run dev",
      url: "http://localhost:3000",
      timeout: 120000
    },
    {
      command: "cd App/FrontEnd && npm run dev",
      url: "http://localhost:5173",
      timeout: 120000
    }
  ]
});