describe('PartyScreen', () => {
  beforeEach(() => {
    cy.setToken();
  });

  it('should display parties if any is fetched', () => {
    cy.mockGetPartiesSuccess();
    cy.visit('/party');
    cy.wait('@mockGetPartiesSuccess');
    cy.get('table tbody tr').should('have.length', 5);
    cy.contains('Nordlisten').should('be.visible');
    cy.contains('Sydlisten').should('be.visible');
  });
});
