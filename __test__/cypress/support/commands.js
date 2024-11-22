// UTILS
const fakeJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlBsYXlib2kgQ2FydGkiLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6OTk5OTk5OTk5OX0.Vyoq12sCusGygz8Zwj3cqniOmbep4Cii6xCxrzmgu7w';
const BACKEND_URL = Cypress.env('BACKEND_URL');


Cypress.Commands.add('clearToken', () => {
  cy.window().then(() => {
    window.sessionStorage.clear();
  });
});

Cypress.Commands.add('setToken', () => {
  cy.window().then(() => {
    window.sessionStorage.setItem('jwt', fakeJWT);
  });
});


// LOGIN PAGE
Cypress.Commands.add('mockLoginSuccess', () => {
  cy.intercept('POST', BACKEND_URL + '/login', {
    statusCode: 200,
    body: {
      token: fakeJWT,
    },
  }).as('mockLoginSuccess');
});

Cypress.Commands.add('mockLoginFailure', () => {
  cy.intercept('POST', BACKEND_URL + '/login', {
    statusCode: 401,
    body: {
      error: 'Invalid password',
    },
  }).as('mockLoginFailure');
});


// PARTY PAGE
Cypress.Commands.add('mockGetPartiesSuccess', () => {
  cy.fixture('parties').then((parties) => {
    cy.intercept('GET', BACKEND_URL + '/parties*', {
      statusCode: 200,
      body: parties,
    }).as('mockGetPartiesSuccess');
  });
});


// POLLING STATION PAGE
Cypress.Commands.add('mockGetPollingStationsSuccess', (content) => {
  cy.intercept('GET', BACKEND_URL + '/pollingStations*', {
    statusCode: 200,
    body: content,
  }).as('mockGetPollingStationsSuccess');
});

Cypress.Commands.add('mockGetPollingStationsFail', (content) => {
  cy.intercept('GET', BACKEND_URL + '/pollingStations*', {
    statusCode: 401,
    body: content,
  }).as('mockGetPollingStationsFail');
});

Cypress.Commands.add('mockAddPollingStation', () => {
  cy.intercept('POST', BACKEND_URL + '/pollingStations*', {
    statusCode: 201,
    body: { message: 'Polling Station added successfully!' },
  }).as('mockAddPollingStation');
});

Cypress.Commands.add('mockGetPollingStationsAfter', (content) => {
  cy.intercept('GET', BACKEND_URL + '/pollingStations*', {
    statusCode: 200,
    body: content,
  }).as('mockGetPollingStationsAfter');
});

Cypress.Commands.add('mockDeletePollingStation', (id) => {
  cy.intercept('DELETE', BACKEND_URL + '/pollingStations/' + id, {
    statusCode: 200,
    body: { message: 'Polling Station deleted successfully!' },
  }).as('mockDeletePollingStation');
});


// NOMINATION DISTRICT PAGE
Cypress.Commands.add('mockGetNominationDistrictsSuccess', (content) => {
  cy.intercept('GET', BACKEND_URL + '/nominationDistricts*', {
    statusCode: 200,
    body: content,
  }).as('mockGetNominationDistrictsSuccess');
});

Cypress.Commands.add('mockGetNominationDistrictsFail', (content) => {
  cy.intercept('GET', BACKEND_URL + '/nominationDistricts*', {
    statusCode: 401,
    body: content,
  }).as('mockGetNominationDistrictsFail');
});


// CANDIDATE PAGE
Cypress.Commands.add('mockGetCandidatesSuccess', (content) => {
  cy.intercept('GET', BACKEND_URL + '/candidate*', {
    statusCode: 200,
    body: content,
  }).as('mockGetCandidatesSuccess');
});

Cypress.Commands.add('mockGetCandidatesFail', (content) => {
  cy.intercept('GET', BACKEND_URL + '/candidate*', {
    statusCode: 401,
    body: content,
  }).as('mockGetCandidatesFail');
});

Cypress.Commands.add('mockAddCandidate', () => {
  cy.intercept('POST', BACKEND_URL + '/candidate*', {
    statusCode: 201,
    body: { message: 'Candidate added successfully!' },
  }).as('mockAddCandidate');
});

Cypress.Commands.add('mockGetCandidatesAfterAdd', () => {
  cy.fixture('candidatesNewEntry').then((content) => {
    cy.intercept('GET', BACKEND_URL + '/candidate*', {
      statusCode: 200,
      body: content,
    }).as('mockGetCandidatesAfterAdd');
  });
});

// CONSTIUENCY PAGE
Cypress.Commands.add('mockGetConstituencySuccess', (content) => {
  cy.intercept('GET', BACKEND_URL + '/constituency*', {
    statusCode: 200,
    body: content,
  }).as('mockGetConstituencySuccess');
});

Cypress.Commands.add('mockGetConstituencyFail', (content) => {
  cy.intercept('GET', BACKEND_URL + '/constituency*', {
    statusCode: 401,
    body: content,
  }).as('mockGetConstituencyFail');
});