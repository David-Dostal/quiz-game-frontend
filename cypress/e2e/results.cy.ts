describe('Game History', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/results');
    cy.clearLocalStorage();
  });

  it('displays loading spinner when isLoading is true', () => {
    cy.get('.loading-wrapper').should('be.visible');

  });

  it('displays game records when gameHistory is not empty', () => {
    const gameHistory = [
      { score: 90, timestamp: '2023-06-18T10:30:00.000Z' },
      { score: 80, timestamp: '2023-06-19T15:45:00.000Z' },
    ];
    localStorage.setItem('gameHistory', JSON.stringify(gameHistory));

    cy.reload();

    cy.get('.homepage').should('be.visible');
    cy.get('.error-wrapper').should('not.be.visible');
    cy.get('.game-record').should('have.length', gameHistory.length);
  });

  it('displays "No game records found" when gameHistory is empty', () => {
    localStorage.setItem('gameHistory', '[]');

    cy.reload();

    cy.get('.homepage').should('be.visible');
    cy.get('.error-wrapper').should('not.be.visible');
    cy.get('.homepage p').should('contain', 'No game records found.');
  });
});