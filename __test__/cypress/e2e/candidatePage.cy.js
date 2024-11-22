describe('CandidateScreen', () => {
  beforeEach(() => {
    cy.setToken();
  });

  afterEach(() => {
    cy.clearToken();
  });

  it('should display candidates if any is fetched', () => {
    cy.fixture('candidates').then((content) => {
      cy.mockGetCandidatesSuccess(content);
    });
    cy.fixture('parties').then((content) => {
      cy.mockGetPartiesSuccess(content);
    });
    cy.fixture('nominationDistricts').then((content) => {
      cy.mockGetNominationDistrictsSuccess(content);
    });
    cy.visit('/candidate');
    cy.wait('@mockGetCandidatesSuccess');
    cy.wait('@mockGetPartiesSuccess');
    cy.wait('@mockGetNominationDistrictsSuccess');

    cy.get('table tbody tr').should('have.length', 4);

    cy.get('table tbody tr').eq(0).within(() => {
      cy.get('td').eq(0).should('have.text', 'Bettina Bendtsen');
      cy.get('td').eq(1).should('have.text', 'Nordlisten');
      cy.get('td').eq(2).should('have.text', 'Banan-distriktet');
    });

    cy.get('table tbody tr').eq(1).within(() => {
      cy.get('td').eq(0).should('have.text', 'Fanny Findsen');
      cy.get('td').eq(1).should('have.text', 'Sydlisten');
      cy.get('td').eq(2).should('have.text', 'Banan-distriktet');
    });

    cy.get('table tbody tr').eq(2).within(() => {
      cy.get('td').eq(0).should('have.text', 'Henrik Hansen');
      cy.get('td').eq(1).should('have.text', 'Vestpartiet');
      cy.get('td').eq(2).should('have.text', 'Kakao-distriktet');
    });

    cy.get('table tbody tr').eq(3).within(() => {
      cy.get('td').eq(0).should('have.text', 'Mette Madsen');
      cy.get('td').eq(1).should('have.text', 'Østpartiet');
      cy.get('td').eq(2).should('have.text', 'Kakao-distriktet');
    });
  });

  it('should display text if no candidates are registered', () => {
    cy.mockGetCandidatesSuccess([]);
    cy.mockGetPartiesSuccess([]);
    cy.mockGetNominationDistrictsSuccess([]);
    cy.visit('/candidate');
    cy.wait('@mockGetCandidatesSuccess');
    cy.wait('@mockGetPartiesSuccess');
    cy.wait('@mockGetNominationDistrictsSuccess');
    cy.get('table tbody tr')
      .should('have.length', 1)
      .and('contain.text', 'No Candidate found.');
  });

  it('Should navigate to login, if no token', () => {
    cy.clearToken();
    cy.visit('/polling-station');
    cy.url().should('include', '/login');
  });

  it('Should give a toast error, when unsuccessful fetch', () => {
    cy.mockGetCandidatesFail();
    cy.mockGetPartiesSuccess([]);
    cy.mockGetNominationDistrictsSuccess([]);
    cy.visit('/candidate');
    cy.wait('@mockGetCandidatesFail');
    cy.wait('@mockGetPartiesSuccess');
    cy.wait('@mockGetNominationDistrictsSuccess');
    cy.contains('Failed to fetch candidates.')
      .should('be.visible');
  });

  it('should show parties in dropdown', () => {
    cy.fixture('candidates').then((content) => {
      cy.mockGetCandidatesSuccess(content);
    });
    cy.fixture('parties').then((content) => {
      cy.mockGetPartiesSuccess(content);
    });
    cy.fixture('nominationDistricts').then((content) => {
      cy.mockGetNominationDistrictsSuccess(content);
    });
    cy.visit('/candidate');
    cy.wait('@mockGetCandidatesSuccess');
    cy.wait('@mockGetPartiesSuccess');
    cy.wait('@mockGetNominationDistrictsSuccess');
    cy.get('#party option').should('have.length', 6);
    cy.get('#nominationDistrict option').should('have.length', 3);
  });

});