describe('PartyScreen', () => {
  beforeEach(() => {
    cy.setToken();
    cy.visit('/parties'); 
  });

  it('should display parties if any is fetched', () => {
    cy.mockGetPartiesSuccess();
    cy.wait('@mockGetPartiesSuccess');
    cy.get('table tbody tr').should('have.length', 5);
    cy.contains('Nordlisten').should('be.visible');
    cy.contains('Sydlisten').should('be.visible');
  });
});
