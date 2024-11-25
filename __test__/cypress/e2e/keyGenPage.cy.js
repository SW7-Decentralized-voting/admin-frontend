describe('Key Generation Screen', () => {
	beforeEach(() => {
		cy.setToken();
		cy.visit('/key-generation');
	});

	it('should show progress bar when key generation is in progress', () => {
		cy.mockKeyGenerationSuccess();
		cy.mockStatusSuccess(20);
		cy.get('button[id=generate-keys]').click();
		cy.wait('@mockKeyGenerationSuccess');
		cy.get('div.bg-secondary').should('exist').and('have.css', 'width', '76.9296875px'); // 20% of view width
	});

	it('should show succes message when keys are generated successfully', () => {
		cy.mockKeyGenerationSuccess();
		cy.mockStatusSuccess(100);
		cy.mockGetNumOfKeys();
		cy.get('button#generate-keys').click();
		cy.wait('@mockKeyGenerationSuccess');
		cy.wait('@mockStatusSuccess');
		cy.wait('@mockStatusSuccess');
		cy.get('p#status-text').should('contain', 'Successfully generated 100 keys');
	});

	it('should show error for failed key generation', () => {
		cy.mockKeyGenerationFailure();
		cy.get('button[id=generate-keys]').click();
		cy.wait('@mockKeyGenerationFailure');
		cy.get('p#status-text').should('contain', 'Failed to start key generation.');
	});
});