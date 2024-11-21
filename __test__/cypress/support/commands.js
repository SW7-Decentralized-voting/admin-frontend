// UTILS
const fakeJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlBsYXlib2kgQ2FydGkiLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6OTk5OTk5OTk5OX0.Vyoq12sCusGygz8Zwj3cqniOmbep4Cii6xCxrzmgu7w';

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
      token: fakeJWT,
    },
  }).as('mockLoginSuccess');
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
