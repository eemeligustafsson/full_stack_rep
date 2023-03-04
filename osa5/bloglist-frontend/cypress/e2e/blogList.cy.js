describe('Blog app', () => {
  beforeEach(()=> {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
        username: "eemeli",
        name: "eemeli",
        password: "kissa1234"
    }
    const user2 = {
        username: "eemeli2",
        name: "eemeli2",
        password: "kissa123"
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.request('POST', 'http://localhost:3003/api/users', user2)
    cy.visit('http://localhost:3000')
  })
  it('login form is shown', () => {
    cy.contains('log in to application')
  })

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
        cy.get('#username').type('eemeli')
        cy.get('#password').type('kissa1234')
        cy.get('#loginButton').click()
        cy.contains('user eemeli successfully logged in')
    })
    it('fails with incorrect credentials', () => {
        cy.get('#username').type('wrong')
        cy.get('#password').type('wrong')
        cy.get('#loginButton').click()
        cy.contains('error invalid username or password')
    })
  })
  describe('When logged in', () => {
    beforeEach(() => {
        cy.get('#username').type('eemeli')
        cy.get('#password').type('kissa1234')
        cy.get('#loginButton').click() 

        cy.contains('new blog').click()
        cy.get('#title').type('blog to be deleted')
        cy.get('#author').type('by cypress')
        cy.get('#url').type('sssssssssssssssssss')
        cy.contains('create').click()

        cy.get('#logoutButton').click()
        cy.get('#username').type('eemeli2')
        cy.get('#password').type('kissa123')
        cy.get('#loginButton').click() 

        cy.contains('new blog').click()
        cy.get('#title').type('blog to be deleted by another user')
        cy.get('#author').type('by cypress')
        cy.get('#url').type('sssssssssssssssssss')
        cy.contains('create').click()
    })

    it('blog can be created', () => {
        cy.contains('new blog').click()
        cy.get('#title').type('blog created with cypress')
        cy.get('#author').type('by cypress')
        cy.get('#url').type('sssssssssssssssssss')
        cy.contains('create').click() 
        cy.contains('blog created with cypress')
    })
    it('blog can be liked', () => {
        cy.contains('new blog').click()
        cy.get('#title').type('blog to like')
        cy.get('#author').type('by cypress')
        cy.get('#url').type('sssss')
        cy.get('#createButton').click()
        cy.get('#viewButton').click()
        cy.get('#likeButton').click()
        cy.contains('likes: 1')
    })
    it('blog can be deleted by owner', () => {
        cy.reload()
        cy.get('#logoutButton').click()
        cy.get('#username').type('eemeli')
        cy.get('#password').type('kissa1234')
        cy.get('#loginButton').click() 
        cy.contains('blog to be deleted').parent().find('#viewButton').click()
        cy.get('#deleteButton').click()
        cy.get('html').should('not.contain', 'blog to delete')
    })
    it('delete blog button only visible to blog owner', () => {
        cy.reload()
        cy.contains('blog to be deleted').parent().find('#viewButton').click()
        cy.get('html').should('not.contain', '#deleteButton')
        cy.get('#hideButton').click()
        cy.contains('blog to be deleted by another user').parent().find('#viewButton').click()
        cy.get('html').should('contain', 'delete')
    })
    it('blogs are ordered by likes in descending order', async () => {
        cy.contains('blog to be deleted').parent().find('#viewButton').click()
        cy.get('#likeButton').click().wait(500).click().wait(500)
        cy.get('#hideButton').click()

        cy.contains('blog to be deleted by another user').parent().find('#viewButton').click()
        cy.get('#likeButton').click().wait(500).click().wait(500).click().wait(500).click().wait()

        cy.get('.blog').eq(0).should('contain', 'blog to be deleted by another user')
        cy.get('.blog').eq(0).should('contain', 'blog to be deleted')
    })
  })
})