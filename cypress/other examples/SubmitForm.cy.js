describe('Online tickets selling app', () => {
  beforeEach(() => {
    cy.visit('https://example.com/tickets')
  })

  it('successfully orders a ticket', () => {
    cy.get('#fullName')
      .should('be.visible')
      .type('John Doe')
    cy.get('#email')
      .should('be.visible')
      .type('john-doe@example.com')
    cy.get('#iAgree')
      .should('be.visible')
      .check()
    cy.contains('button','Send')
      .should('be.visible')
      .click()

    cy.contains('You will receive an email to finish the purchase.')
      .should('be.visible')
  })
})