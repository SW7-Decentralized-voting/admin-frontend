describe('Login Screen', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should log in successfully with a correct password', () => {
    cy.mockLoginSuccess();
    cy.get('input#password').type('correct-password');
    cy.get('form').submit();
    cy.wait('@mockLoginSuccess');
    cy.url().should('include', '/home');
    cy.window().then((window) => {
      expect(window.sessionStorage.getItem('jwt')).to.equal('mocked-jwt-token');
    });
  });

  it('should show error for invalid password', () => {
    cy.clearToken();
    cy.mockLoginFailure();
    cy.get('input#password').type('wron̈́g-password');
    cy.get('form').submit();
    cy.wait('@mockLoginFailure');
    cy.get('p.text-red-800').should('contain', 'Invalid password');
    cy.window().then((window) => {
      expect(window.sessionStorage.getItem('jwt')).to.be.null;
    });
  });
});
