const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    },
    // baseUrl: 'http://localhost:5173',
    baseUrl: 'https://roopemaatta-humble-sniffle-7g7pqv564pwhrpp-5173.app.github.dev/',
    env: {
      BACKEND: 'http://localhost:3003/api'
    },
    // supportFile: false
  },
})

