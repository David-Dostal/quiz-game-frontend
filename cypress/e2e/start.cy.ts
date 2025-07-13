describe('Start', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/start');
  });

  it('Loads the page', () => {
    cy.get('.homepage').should('be.visible');
  });

  it('Verifies components are visible', () => {
    cy.get('.homepage').should('be.visible');

    cy.get('.header').should('be.visible');

    cy.get('[data-test-id="difficulty-radio-easy"]').should('be.visible');

    cy.get('[data-test-id="category-select"]').should('be.visible');

    cy.get('[data-test-id="start-game-button"]').should('be.visible');
  });

  it('Starts the game', () => {
    cy.get('[data-test-id="start-game-button"]').click();
    cy.url().should('include', '/game');
  });

  it('Resumes the game', () => {
    cy.get('[data-test-id="start-game-button"]').click();
    cy.url().should('include', '/game');
    cy.visit('http://localhost:3000/start');
    cy.get('[data-test-id="resume-game-button"]').click();
    cy.url().should('include', '/game');
  });

  describe('Select Different Combinations', () => {
    const difficulties = ['easy', 'medium', 'hard'];
    const categories = ["Unspecified", 'Linux', 'DevOps', 'Networking', 'Programming', 'Docker'];

    difficulties.forEach(difficulty => {
      categories.forEach((category, categoryIndex) => {
        it(`Starts the game with difficulty: ${difficulty}, category: ${category}`, () => {
          cy.visit('http://localhost:3000/start');

          // Select difficulty
          cy.get(`[data-test-id="difficulty-radio-${difficulty}"]`).click();


          cy.get('[data-test-id="category-select"]').click();
          cy.get('.v-list-item').eq(categoryIndex).click({ force: true });

        });
      });
    });
  });
});