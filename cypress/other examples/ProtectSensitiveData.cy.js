describe('Login', () => {
    it('successfully', () => {
      cy.visit('https://example.com/login')
  
      cy.get('#user')
        .type(Cypress.env('user_name'))
      cy.get('#password')
        .type(Cypress.env('user_password'))
      cy.contains('Login').click()
  
      cy.get('.navbar-top .avatar')
        .should('be.visible')
    })
  })