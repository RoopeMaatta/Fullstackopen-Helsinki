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
    cy.get('#username').should('exist')
    cy.get('#password').should('exist')
  })


  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Logged in successfully')
      cy.contains('Matti Luukkainen is logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('wrongUsername')
      cy.get('#password').type('wrongPassword')
      cy.get('#login-button').click()

      cy.contains('Wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function() {
      cy.contains('Create new blog').click()
      cy.get('#title').type('LeTitle')
      cy.get('#author').type('LeAuthor')
      cy.get('#url').type('www.leUrl.le')
      cy.contains('Submit new Blog').click()

      cy.contains('New blog added successfully')
      cy.contains('LeTitle')
      cy.contains('LeAuthor')
      cy.contains('www.leUrl.le')
    })
  })
})