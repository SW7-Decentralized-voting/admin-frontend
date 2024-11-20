Cypress.Commands.add('getToken', () => {
  const fakeJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fakePayload.fakeSignature';

  // Mock the login API request to return the fake token
  cy.intercept('POST', '/api/login', (req) => {
    req.reply({
      statusCode: 200,
      body: { token: fakeJWT },
    });
  }).as('mockLogin');

  // Make a request to the login endpoint or mock the behavior
  return cy.request({
    method: 'POST',
    url: Cypress.env('BACKEND_URL') + '/api/login',
    body: {
      username: 'testuser',
      password: 'password123',
    },
  }).then(() => {
    // Return the token for further usage
    return fakeJWT; // Use `response.body.token` if fetching a real token
  });
});
