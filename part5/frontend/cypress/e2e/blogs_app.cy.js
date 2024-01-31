describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)

    const users = [
      {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      },
      {
        name: 'Wuffelishious',
        username: 'Bakawuf',
        password: 'f5dsf'
      }
    ]

    cy.wrap(users).each(user => {
      cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    })

    cy.visit('/')
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

  describe('When logged in and blogs exist', function() {
    beforeEach(function() {
      cy.login({ username: 'Bakawuf', password: 'f5dsf' })
      cy.createBlog({
        title: 'Wuf blog',
        author: 'Wuf Author before each',
        url: 'www.urlBeforeEachWuf.wuf',
        likes: 20
      })
      cy.contains('Logout').click()
      cy.contains('login')
      cy.login({ username: 'mluukkai', password: 'salainen' })
      cy.createBlog({
        title: 'First blog',
        author: 'First Author before each',
        url: 'www.urlBeforeEach1.wuf',
        likes: 621
      })
      cy.createBlog({
        title: 'Second blog',
        author: 'Second Author before each',
        url: 'www.urlBeforeEach2.wuf',
        likes: 30
      })


    })
    it('A user can like a blog', function() {
      cy.contains('Second blog').parent().within(() => {
        cy.contains('Show Details').click()
        cy.contains('Like').click()
        cy.contains('Likes: 31')
      })
    })
    it('A user can delete a blog he has created', function() {
      cy.contains('Second blog').parent().within(() => {
        cy.contains('Show Details').click()
        cy.contains('Delete blog').click()
        cy.on('window:confirm', () => true)
        cy.contains('Second blog was deleted')
      })
    })

    it('A user can see delete button for only blogs he created', function() {
      cy.contains('First blog').parent().within(() => {
        cy.contains('Show Details').click()
        cy.contains('Delete blog')
      })
      cy.contains('Wuf blog').parent().within(() => {
        cy.contains('Show Details').click()
        cy.get('.delete-blog').should('not.exist')
      })
    })

  })
})
