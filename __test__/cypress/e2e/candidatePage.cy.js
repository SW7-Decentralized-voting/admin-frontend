describe('CandidateScreen', () => {
  beforeEach(() => {
    cy.setToken();
  });

  afterEach(() => {
    cy.clearToken();
  });

  it('should display candidates if any is fetched', () => {
    cy.fixture('candidates').then((content) => {
      cy.mockGetPartyCandidatesSuccess(content);
    });
    cy.fixture('parties').then((content) => {
      cy.mockGetPartiesSuccess(content);
    });
    cy.fixture('nominationDistricts').then((content) => {
      cy.mockGetNominationDistrictsSuccess(content);
    });
    cy.visit('/candidate');
    cy.wait('@mockGetPartiesSuccess');
    cy.wait('@mockGetNominationDistrictsSuccess');

    cy.get('table tbody tr').should('have.length', 2);

    cy.get('table tbody tr').eq(0).within(() => {
      cy.get('td').eq(0).should('have.text', 'Candidate1');
      cy.get('td').eq(1).should('have.text', 'Party1');
      cy.get('td').eq(2).should('have.text', 'NominationDistrict1');
    });

    cy.get('table tbody tr').eq(1).within(() => {
      cy.get('td').eq(0).should('have.text', 'Candidate2');
      cy.get('td').eq(1).should('have.text', 'Party2');
      cy.get('td').eq(2).should('have.text', 'NominationDistrict2');
    });
  });
});