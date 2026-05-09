const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,
  defaultCommandTimeout: 5000,
  video: false,
  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',
  fixturesFolder: 'cypress/fixtures',

  e2e: {
    baseUrl: 'https://example.cypress.io',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on, config) {
      return config
    }
  }
})
