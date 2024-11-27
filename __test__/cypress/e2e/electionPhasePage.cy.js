describe('ElectionPhaseScreen', () => {
	beforeEach(() => {
		cy.setToken();
	});

	it('should display correct label for phases', () => {
		cy.fixture('electionPhases').then((content) => {
			content.forEach((phase) => {
				cy.mockGetElectionPhaseSuccess(phase.id);
				cy.visit('/election');
				cy.wait('@getPhase');
				cy.get('#phase-label').should('have.text', phase.phaseText);
			});
		});
	});

	it('should display error if no election phases are fetched', () => {
		cy.mockGetElectionPhaseError();
		cy.visit('/election');
		cy.wait('@getPhase');
		cy.contains('No phases registered').should('exist');
	});

	it('should display correct button text based on phase', () => {
		cy.fixture('electionPhases').then((content) => {
			content.forEach((phase) => {
				cy.mockGetElectionPhaseSuccess(phase.id);
				cy.visit('/election');
				cy.wait('@getPhase');
				cy.get('#advance-btn').should('have.text', phase.advanceText);
			});
		});
	});

	it('should advance phase when button is clicked', () => {
		cy.mockStartElection();
		cy.mockAdvancePhase();
		cy.mockGetElectionPhaseSuccess(-1);
		cy.visit('/election');


		cy.fixture('electionPhases').then((content) => {
			cy.get('#advance-btn').click();
			cy.wait('@startElection');
			cy.get('#phase-label').should('have.text', content[1].phaseText);
			delete content[0];
			content.forEach((_, index) => {
				if (index === content.length - 1) return;
				cy.get('#advance-btn').click();
				cy.get('#phase-label').should('have.text', content[index+1]?.phaseText);
			});
			cy.get('#advance-btn').click();
			cy.wait('@advancePhase');
			cy.get('#phase-label').should('have.text', content[1].phaseText);
		});
	});

	it('should display error if advancing phase fails (start)', () => {
		cy.mockStartElectionError();
		cy.mockGetElectionPhaseSuccess(-1);
		cy.visit('/election');

		cy.get('#advance-btn').click();
		cy.wait('@startElection');
		cy.get('#advance-btn').click();
		cy.wait('@startElection');
		cy.get('#phase-label').should('have.text', 'Election not started.');
		cy.contains('An error occurred while starting the election').should('exist');
	});

	it('should display error if advancing phase fails (advance)', () => {
		cy.mockAdvancePhaseError();
		cy.mockGetElectionPhaseSuccess(0);
		cy.visit('/election');
		cy.get('#advance-btn').click();
		cy.wait('@advancePhase');
		cy.get('#phase-label').should('have.text', 'Registration is ongoing.');
		cy.contains('An error occurred while advancing the election phase').should('exist');
	});
});