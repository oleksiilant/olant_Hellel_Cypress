const { defineConfig } = require('cypress')

module.exports = defineConfig({
  allowCypressEnv: false,
  watchForFileChanges: false,
  viewportHeight: 1080,
  viewportWidth: 1920,

  e2e: {
    baseUrl: 'https://example.cypress.io/',
    setupNodeEvents(on, config) {
      return config
    }
  }
})
