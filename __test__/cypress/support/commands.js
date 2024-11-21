// UTILS
const fakeJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlBsYXlib2kgQ2FydGkiLCJpYXQiOjE1MTYyMzkwMjJ9.OuBDA5BeAyz5Ss22m_lsVfZOQjI9rreNq1nlGwinO88';

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
  cy.intercept('POST', Cypress.env('BACKEND_URL') + '/login', {
    statusCode: 200,
    body: {
      token: 'mocked-jwt-token',
    },
  }).as('mockLoginSuccess');
  cy.window().then((window) => {
    window.sessionStorage.setItem('jwt', 'mocked-token');
  });
});

Cypress.Commands.add('mockLoginFailure', () => {
  cy.intercept('POST', Cypress.env('BACKEND_URL') + '/login', {
    statusCode: 401,
    body: {
      error: 'Invalid password',
    },
  }).as('mockLoginFailure');
});


// CANDIDATE PAGE
Cypress.Commands.add('mockGetPartiesSuccess', () => {
  cy.fixture('parties').then((parties) => {
    cy.intercept('GET', Cypress.env('BACKEND_URL') + '/parties', {
      statusCode: 200,
      body: parties,
    }).as('mockGetPartiesSuccess');
  });
});


// 

