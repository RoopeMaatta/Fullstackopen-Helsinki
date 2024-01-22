Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedAppUser', JSON.stringify(body))
    cy.visit('http://localhost:5173')
  })
})