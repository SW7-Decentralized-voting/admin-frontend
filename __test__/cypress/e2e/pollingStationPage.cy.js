describe('PollingStationScreen', () => {
  beforeEach(() => {
    cy.setToken();
  });

  afterEach(() => {
    cy.clearToken();
  });

  it('Should display polling stations if any is fetched', () => {
    cy.fixture('pollingStations').then((content) => {
      cy.mockGetPollingStationsSuccess(content);
    });
    cy.fixture('nominationDistricts').then((content) => {
      cy.mockGetNominationDistrictsSuccess(content);
    });
    cy.visit('/polling-station');
    cy.wait('@mockGetPollingStationsSuccess');
    cy.wait('@mockGetNominationDistrictsSuccess');


    cy.get('table tbody tr').should('have.length', 2);

    cy.get('table tbody tr').eq(0).within(() => {
      cy.get('td').eq(0).should('have.text', 'Abe-station');
      cy.get('td').eq(1).should('have.text', 'Banan-distriktet');
      cy.get('td').eq(2).should('have.text', '10');
    });

    cy.get('table tbody tr').eq(1).within(() => {
      cy.get('td').eq(0).should('have.text', 'Fugle-station');
      cy.get('td').eq(1).should('have.text', 'Kakao-distriktet');
      cy.get('td').eq(2).should('have.text', '20');
    });
  });


  it('Should display text if no polling stations are registered', () => {
    cy.mockGetPollingStationsSuccess([]);
    cy.mockGetNominationDistrictsSuccess([]);
    cy.visit('/polling-station');
    cy.wait('@mockGetPollingStationsSuccess');
    cy.wait('@mockGetNominationDistrictsSuccess');
    cy.get('table tbody tr')
      .should('have.length', 1)
      .and('contain.text', 'No Polling Station found.');
  });


  it('Should navigate to login, if no token', () => {
    cy.clearToken();
    cy.visit('/polling-station');
    cy.url().should('include', '/login');
  });


  it('Should give a toast error, when unsuccessful fetch', () => {
    cy.mockGetPollingStationsFail();
    cy.mockGetNominationDistrictsSuccess([]);
    cy.visit('/polling-station');
    cy.wait('@mockGetPollingStationsFail');
    cy.wait('@mockGetNominationDistrictsSuccess');
    cy.contains('Failed to fetch polling stations.')
      .should('be.visible');
  });


  it('should be able to add polling station and refresh list', () => {
    cy.mockGetPollingStationsSuccess([]);
    cy.fixture('nominationDistricts').then((content) => {
      cy.mockGetNominationDistrictsSuccess(content);
    });

    cy.visit('/polling-station');
    cy.wait('@mockGetPollingStationsSuccess');
    cy.wait('@mockGetNominationDistrictsSuccess');
    cy.get('.card-body table tbody').should('contain', 'No Polling Station found.');

    cy.mockAddPollingStation();
    cy.fixture('pollingStationsNewEntry').then((content) => {
      cy.mockGetPollingStationsAfter(content);
    });

    cy.get('form').within(() => {
      cy.get('input#name').should('exist').type('Krabbe-station');
      cy.get('select#nominationDistrict')
        .should('exist')
        .select('Banan-distriktet');
      cy.get('input#expectedVoters').should('exist').type('1000');
    });
    cy.get('form button[type="submit"]').should('exist').click();

    cy.wait('@mockAddPollingStation');
    cy.contains('Polling Station added successfully!').should('be.visible');

    cy.wait('@mockGetPollingStationsAfter');
    cy.get('.card-body table tbody tr').should('have.length', 1);
    cy.get('.card-body table tbody tr')
      .first()
      .within(() => {
        cy.get('td').eq(0).should('contain', 'Krabbe-station');
        cy.get('td').eq(1).should('contain', 'Banan-distriktet');
        cy.get('td').eq(2).should('contain', '1000');
      });
  });


  it('should display correct nomination districts in dropdown', () => {
    cy.fixture('pollingStations').then((content) => {
      cy.mockGetPollingStationsSuccess(content);
    });
    cy.fixture('nominationDistricts').then((content) => {
      cy.mockGetNominationDistrictsSuccess(content);
    });

    cy.visit('/polling-station');
    cy.wait('@mockGetPollingStationsSuccess');
    cy.wait('@mockGetNominationDistrictsSuccess');
    cy.get('#nominationDistrict option').should('have.length', 3);
    cy.get('#nominationDistrict option').eq(1).should('have.text', 'Banan-distriktet');
    cy.get('#nominationDistrict option').eq(2).should('have.text', 'Kakao-distriktet');
  });


  it('should give toast error with too short polling station name', () => {
    cy.mockGetPollingStationsSuccess([]);
    cy.fixture('nominationDistricts').then((content) => {
      cy.mockGetNominationDistrictsSuccess(content);
    });

    cy.visit('/polling-station');
    cy.wait('@mockGetPollingStationsSuccess');
    cy.wait('@mockGetNominationDistrictsSuccess');

    cy.get('form').within(() => {
      cy.get('input#name').should('exist').type('A');
      cy.get('select#nominationDistrict')
        .should('exist')
        .select('Banan-distriktet');
      cy.get('input#expectedVoters').should('exist').type('1000');
    });
    cy.get('form button[type="submit"]').should('exist').click();

    cy.contains('Polling station name must be between 3 and 100 characters.')
      .should('be.visible');
  });


  it('should give toast error with too long polling station name', () => {
    cy.mockGetPollingStationsSuccess([]);
    cy.fixture('nominationDistricts').then((content) => {
      cy.mockGetNominationDistrictsSuccess(content);
    });

    cy.visit('/polling-station');
    cy.wait('@mockGetPollingStationsSuccess');
    cy.wait('@mockGetNominationDistrictsSuccess');

    cy.get('form').within(() => {
      cy.get('input#name').should('exist').type('A'.repeat(101));
      cy.get('select#nominationDistrict')
        .should('exist')
        .select('Banan-distriktet');
      cy.get('input#expectedVoters').should('exist').type('1000');
    });
    cy.get('form button[type="submit"]').should('exist').click();

    cy.contains('Polling station name must be between 3 and 100 characters.')
      .should('be.visible');
  });


  it('should give toast error with negative expected voters', () => {
    cy.mockGetPollingStationsSuccess([]);
    cy.fixture('nominationDistricts').then((content) => {
      cy.mockGetNominationDistrictsSuccess(content);
    });

    cy.visit('/polling-station');
    cy.wait('@mockGetPollingStationsSuccess');
    cy.wait('@mockGetNominationDistrictsSuccess');

    cy.get('form').within(() => {
      cy.get('input#name').should('exist').type('Abe-station');
      cy.get('select#nominationDistrict')
        .should('exist')
        .select('Banan-distriktet');
      cy.get('input#expectedVoters').should('exist').type('-1000');
    });
    cy.get('form button[type="submit"]').should('exist').click();

    cy.contains('Expected voters must be a positive number.')
      .should('be.visible');
  });


  it('should give toast error with no expected voters', () => {
    cy.mockGetPollingStationsSuccess([]);
    cy.fixture('nominationDistricts').then((content) => {
      cy.mockGetNominationDistrictsSuccess(content);
    });

    cy.visit('/polling-station');
    cy.wait('@mockGetPollingStationsSuccess');
    cy.wait('@mockGetNominationDistrictsSuccess');

    cy.get('form').within(() => {
      cy.get('input#name').should('exist').type('Abe-station');
      cy.get('select#nominationDistrict')
        .should('exist')
        .select('Banan-distriktet');
    });
    cy.get('form button[type="submit"]').should('exist').click();

    cy.contains('Expected Voters is required.')
      .should('be.visible');
  });


  it('should give toast error with no nomination district selected', () => {
    cy.mockGetPollingStationsSuccess([]);
    cy.fixture('nominationDistricts').then((content) => {
      cy.mockGetNominationDistrictsSuccess(content);
    });

    cy.visit('/polling-station');
    cy.wait('@mockGetPollingStationsSuccess');
    cy.wait('@mockGetNominationDistrictsSuccess');

    cy.get('form').within(() => {
      cy.get('input#name').should('exist').type('Abe-station');
      cy.get('input#expectedVoters').should('exist').type('1000');
    });
    cy.get('form button[type="submit"]').should('exist').click();

    cy.contains('Nomination District is required.')
      .should('be.visible');
  });


  it('should give toast error with no name', () => {
    cy.mockGetPollingStationsSuccess([]);
    cy.fixture('nominationDistricts').then((content) => {
      cy.mockGetNominationDistrictsSuccess(content);
    });

    cy.visit('/polling-station');
    cy.wait('@mockGetPollingStationsSuccess');
    cy.wait('@mockGetNominationDistrictsSuccess');

    cy.get('form').within(() => {
      cy.get('select#nominationDistrict')
        .should('exist')
        .select('Banan-distriktet');
      cy.get('input#expectedVoters').should('exist').type('1000');
    });
    cy.get('form button[type="submit"]').should('exist').click();

    cy.contains('Name is required.')
      .should('be.visible');
  });


  it('should delete an object from the list with a single element', () => {
    cy.fixture('pollingStationsNewEntry').then((content) => {
      cy.mockGetPollingStationsSuccess(content);
    });
    cy.fixture('nominationDistricts').then((content) => {
      cy.mockGetNominationDistrictsSuccess(content);
    });

    cy.visit('/polling-station');
    cy.wait('@mockGetPollingStationsSuccess');
    cy.wait('@mockGetNominationDistrictsSuccess');
    cy.get('.card-body table tbody tr').should('have.length', 1);

    cy.get('button.btn-error').click();
    cy.get('.modal.modal-open').should('be.visible');
    cy.get('.modal-box').should('contain', 'Are you sure?');
    cy.get('.modal-box').should('contain', 'Do you really want to delete Krabbe-station?');

    cy.mockDeletePollingStation(1);
    cy.mockGetPollingStationsAfter([]);

    cy.get('.modal-box .btn-warning').click();
    cy.wait('@mockDeletePollingStation');
    cy.contains('Polling Station: Krabbe-station was deleted successfully!').should('be.visible');

    cy.wait('@mockGetPollingStationsAfter');
    cy.get('.card-body table tbody').should('contain', 'No Polling Station found.');
  });


  it('should delete an object from the list with multiple elements', () => {
    cy.fixture('pollingStations').then((content) => {
      cy.mockGetPollingStationsSuccess(content);
    });
    cy.fixture('nominationDistricts').then((content) => {
      cy.mockGetNominationDistrictsSuccess(content);
    });

    cy.visit('/polling-station');
    cy.wait('@mockGetPollingStationsSuccess');
    cy.wait('@mockGetNominationDistrictsSuccess');
    cy.get('.card-body table tbody tr').should('have.length', 2);

    cy.get('button.btn-error').eq(0).click();
    cy.get('.modal.modal-open').should('be.visible');
    cy.get('.modal-box').should('contain', 'Are you sure?');
    cy.get('.modal-box').should('contain', 'Do you really want to delete Abe-station?');

    cy.mockDeletePollingStation(1);
    cy.fixture('pollingStations2').then((content) => {
      cy.mockGetPollingStationsAfter(content);
    });
    cy.get('.modal-box .btn-warning').click();
    cy.wait('@mockDeletePollingStation');
    cy.contains('Polling Station: Abe-station was deleted successfully!').should('be.visible');

    cy.wait('@mockGetPollingStationsAfter');
    cy.get('.card-body table tbody tr').should('have.length', 1);
    cy.get('.card-body table tbody tr').eq(0).within(() => {
      cy.get('td').eq(0).should('contain', 'Fugle-station');
      cy.get('td').eq(1).should('contain', 'Kakao-distriktet');
      cy.get('td').eq(2).should('contain', '20');
    });
  });

  it('should edit an object from the list and refresh list', () => {
    cy.fixture('pollingStations').then((content) => {
      cy.mockGetPollingStationsSuccess(content);
    });
    cy.fixture('nominationDistricts').then((content) => {
      cy.mockGetNominationDistrictsSuccess(content);
    });

    cy.visit('/polling-station');
    cy.wait('@mockGetPollingStationsSuccess');
    cy.wait('@mockGetNominationDistrictsSuccess');
    cy.get('.card-body table tbody tr').should('have.length', 2);

    cy.get('.card-body table tbody tr').eq(0).within(() => {
      cy.get('button.btn').first().click();
    });
    cy.get('.modal.modal-open').should('be.visible');
    cy.get('.modal-box').should('contain', 'Edit Polling Station');

    cy.get('.modal-box form').within(() => {
      cy.get('input.input').eq(0).should('exist').clear();
      cy.get('input.input').eq(0).type('Krabbe-station');
      cy.get('select.select').should('exist');
      cy.get('select.select').select('Kakao-distriktet');
      cy.get('input.input').eq(1).should('exist').clear();
      cy.get('input.input').eq(1).type('2000');
    });

    cy.mockEditPollingStation(1);
    cy.fixture('pollingStations3').then((content) => {
      cy.mockGetPollingStationsAfter(content);
    });

    cy.get('.modal-box .btn-primary').click();
    cy.wait('@mockEditPollingStation');
    cy.contains('Polling Station updated successfully!').should('be.visible');

    cy.wait('@mockGetPollingStationsAfter');
    cy.get('.card-body table tbody tr').should('have.length', 2);
    cy.get('.card-body table tbody tr').eq(0).within(() => {
      cy.get('td').eq(0).should('contain', 'Krabbe-station');
      cy.get('td').eq(1).should('contain', 'Kakao-distriktet');
      cy.get('td').eq(2).should('contain', '2000');
    });
  });
});