const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    // baseurl: 'https%3A//roopemaatta-humble-sniffle-7g7pqv564pwhrpp-5173.app.github.dev/',
    baseUrl: 'http://localhost:5173',
    env: {
      BACKEND: 'http://localhost:3003/api',
    },
    // supportFile: false
  },
})
