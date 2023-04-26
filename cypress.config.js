const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  watchForFileChanges: false,
  reporter: "cypress-mochawesome-reporter",
  env: {
    slowhopPortal: "https://slowhop.com/en",
    slowhopLogin: "przemyslawszczerkowski@gmail.com",
    slowhopPassword: "CypressTest1@34",
    accessToken:
      "482b675073526006c4f5dcb807ffe89c11207ab311e0d38a6ca7fcc889aeef7f",
  },
  e2e: {
    // testIsolation: false,
    experimentalSessionAndOrigin: true,
    defaultCommandTimeout: 10000,
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
    excludeSpecPattern: "cypress/e2e/FeatureFive/*.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
    },
  },
});
