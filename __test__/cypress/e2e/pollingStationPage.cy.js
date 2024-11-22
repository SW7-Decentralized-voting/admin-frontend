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
    cy.mockGetPollingStationsSuccess([{}]);
    cy.mockGetNominationDistrictsSuccess([{}]);
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

  it('should show nomination districts in dropdown', () => {
    cy.fixture('pollingStations').then((content) => {
      cy.mockGetPollingStationsSuccess(content);
    });
    cy.fixture('nominationDistricts').then((content) => {
      cy.mockGetNominationDistrictsSuccess(content);
    });

    cy.visit('/polling-station');
    cy.get('#nominationDistrict').click();
    cy.wait('@mockGetPollingStationsSuccess');
    cy.wait('@mockGetNominationDistrictsSuccess');
    cy.get('#nominationDistrict option').should('have.length', 2);
    cy.get('#nominationDistrict option').first().should('have.text', 'Banan-distriktet');
    cy.get('#nominationDistrict option').last().should('have.text', 'Kakao-distriktet');
  });
});
