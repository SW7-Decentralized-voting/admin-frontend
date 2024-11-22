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

  it('should add a candidate and refresh list', () => {
    cy.mockGetCandidatesSuccess([]);
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

    cy.mockAddCandidate();
    cy.fixture('candidatesNewEntry').then((content) => {
      cy.mockGetCandidatesAfter(content);
    });

    cy.get('form').within(() => {
      cy.get('input#name').should('exist').type('Test Man');
      cy.get('select#party')
        .should('exist')
        .select('Nordlisten');
      cy.get('select#nominationDistrict')
        .should('exist')
        .select('Banan-distriktet');
    });

    cy.get('form button[type="submit"]').should('exist').click();

    cy.wait('@mockAddCandidate');
    cy.contains('Candidate added successfully!').should('be.visible');

    cy.wait('@mockGetCandidatesAfter');
    cy.get('.card-body table tbody tr').should('have.length', 1);
    cy.get('.card-body table tbody tr')
      .first()
      .within(() => {
        cy.get('td').eq(0).should('contain', 'Test Man');
        cy.get('td').eq(1).should('contain', 'Nordlisten');
        cy.get('td').eq(2).should('contain', 'Banan-distriktet');
      });
  });

  it('should give toast error when candidate name is too short', () => {
    cy.mockGetCandidatesSuccess([]);
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

    cy.get('form').within(() => {
      cy.get('input#name').should('exist').type('T');
      cy.get('select#party')
        .should('exist')
        .select('Nordlisten');
      cy.get('select#nominationDistrict')
        .should('exist')
        .select('Banan-distriktet');
    });
    cy.get('form button[type="submit"]').should('exist').click();
    cy.contains('Candidate name must be between 3 and 100 characters.')
      .should('be.visible');
  });

  it('should give toast error when candidate name is too long', () => {
    cy.mockGetCandidatesSuccess([]);
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

    cy.get('form').within(() => {
      cy.get('input#name').should('exist').type('P'.repeat(101));
      cy.get('select#party')
        .should('exist')
        .select('Nordlisten');
      cy.get('select#nominationDistrict')
        .should('exist')
        .select('Banan-distriktet');
    });
    cy.get('form button[type="submit"]').should('exist').click();
    cy.contains('Candidate name must be between 3 and 100 characters.')
      .should('be.visible');
  });

  it('should give toast error when party is not selected', () => {
    cy.mockGetCandidatesSuccess([]);
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

    cy.get('form').within(() => {
      cy.get('input#name').should('exist').type('Test Man');
      cy.get('select#nominationDistrict')
        .should('exist')
        .select('Banan-distriktet');
  });
    cy.get('form button[type="submit"]').should('exist').click();
    cy.contains('Party is required.')
      .should('be.visible');
  });

  it('should give toast error when nomination district is not selected', () => {
    cy.mockGetCandidatesSuccess([]);
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

    cy.get('form').within(() => {
      cy.get('input#name').should('exist').type('Test Man');
      cy.get('select#party')
        .should('exist')
        .select('Nordlisten');
    });
    cy.get('form button[type="submit"]').should('exist').click();
    cy.contains('Nomination District is required.')
      .should('be.visible');
  });

  it('should delete a candidate from the list', () => {
    cy.fixture('candidatesNewEntry').then((content) => {
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
    cy.get('.card-body table tbody tr').should('have.length', 1);

    cy.get('button.btn-error').click();
    cy.get('.modal.modal-open').should('be.visible');
    cy.get('.modal-box').should('contain', 'Are you sure?');
    cy.get('.modal-box').should('contain', 'Do you really want to delete Test Man?');

    cy.mockDeleteCandidate(1);
    cy.mockGetCandidatesAfter([]);

    cy.get('.modal-box .btn-warning').click();
    cy.wait('@mockDeleteCandidate');
    cy.contains('Candidate: Test Man was deleted successfully!').should('be.visible');

    cy.wait('@mockGetCandidatesAfter');
    cy.get('.card-body table tbody').should('contain', 'No Candidate found.');
  });
});