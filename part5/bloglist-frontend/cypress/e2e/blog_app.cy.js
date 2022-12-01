describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Aleksi Rendel',
      username: 'arendel',
      password: 'secret'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('login form is shown by default', function () {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('arendel')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()

      cy.contains('Aleksi Rendel logged-in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('arendel')
      cy.get('#password').type('wrong-secret')
      cy.get('#login-button').click()

      cy.contains('Wrong credentials')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'arendel', password: 'secret' })

      cy.addBlog({ title: 'Hello World 5', author: 'Peter Pan 5', url: 'www.test5.com', likes: 5 })
      cy.addBlog({ title: 'Hello World 1', author: 'Peter Pan 1', url: 'www.test1.com', likes: 1 })
      cy.addBlog({ title: 'Hello World 10', author: 'Peter Pan 10', url: 'www.test10.com', likes: 10 })
      cy.visit('http://localhost:3000')
    })

    it('blog can be created', function () {
      cy.contains('Add blog').click()
      cy.get('#title').type('Test blog')
      cy.get('#author').type('Testauthor')
      cy.get('#homepage').type('testhomepage')
      cy.get('#add-blog-button').click()
      cy.contains('Test blog Testauthor')
      cy.visit('http://localhost:3000')
    })

    it('blog can be liked', function () {
      cy.contains('Hello World 10').contains('view').click()
      cy.contains('likes').contains('like').click()
      cy.visit('http://localhost:3000')
      cy.contains('Hello World 10').contains('view').click()
      cy.contains('likes').contains('11')
    })

    it.only('blog can be deleted', function () {
      cy.contains('Hello World 10').contains('view').click()
      cy.contains('likes').contains('Delete').click()
      cy.visit('http://localhost:3000')
      cy.get('#bloglist').should('not.contain', 'Hello World 10')
    })
  })
})