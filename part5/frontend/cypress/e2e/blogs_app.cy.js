// Test that frontpage loads
// describe('Blog app', function() {
//   it('front page can be opened', function() {
//     cy.visit('http://localhost:5173')
//     cy.contains('Blogs')
//   })
// })


describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:5173')
  })

  it('Frontpage "Blogs" title is shown', function() {
    cy.contains('Blogs')
  })

  it('Login form is shown', function() {
    cy.get('#password').should('exist')
    cy.get('#username').should('exist')
  })
})