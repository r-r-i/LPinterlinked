describe('LP Value', () => {
  it('Should display required LP when current LP is valid', () => {
    cy.visit('/')
    cy.lpValue('10000');
  })

  it('Should not display required LP when current LP is invalid', () => {
    cy.visit('/')
    cy.get('.rp-button').should('be.exist').click({ force: true });
    cy.get('.predicted-lp-container').should('not.exist');
  })
})
