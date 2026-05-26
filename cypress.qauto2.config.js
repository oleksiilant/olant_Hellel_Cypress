const { defineConfig } = require('cypress')
const baseConfig = require('./cypress.config')

const createRegistrationUser = () => {
  return {
    name: 'Oleksii',
    lastName: 'withBug',
    email: `oleksi.lantuh.qauto2.${Date.now()}@example.com`,
    password: 'Qwerty123',
  }
}

module.exports = defineConfig({
  ...baseConfig,

  env: {
    ...baseConfig.env,
    basicAuth: {
      username: 'guest',
      password: 'welcome2qauto',
    },
    registrationUser: createRegistrationUser(),
  },

  e2e: {
    ...baseConfig.e2e,
    baseUrl: 'https://qauto2.forstudy.space/',
    setupNodeEvents(on, config) {
      return baseConfig.e2e.setupNodeEvents(on, config)
    },
  },
})
