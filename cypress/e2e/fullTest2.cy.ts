describe('Quiz game with resuming', () => {

  it('Cycle with resuming', () => {
    cy.visit('http://localhost:3000');
    // Navigate to the Start page
    cy.contains('Start').click();
    cy.url().should('include', '/start');

    // Selects random difficulty and category and starts the game
    const difficulties = ['easy', 'medium', 'hard'];
    const categories = ["Unspecified", 'Linux', 'DevOps', 'Networking', 'Programming', 'Docker'];

    const randomDifficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
    // Select random difficulty
    cy.get(`[data-test-id="difficulty-radio-${randomDifficulty}"]`).click();
    // Select random category
    const randomCategoryIndex = Math.floor(Math.random() * categories.length);

    cy.get('[data-test-id="category-select"]').click();
    cy.get('.v-list-item').eq(randomCategoryIndex).click({ force: true });

    cy.get('[data-test-id="start-game-button"]').click();

    // Validate if the game page is visible
    cy.url().should('include', '/game');

    // Go back to main page
    cy.get('.header-link').click();
    cy.url().should('include', '/');

    // Navigate to the Start page again
    cy.contains('Start').click();
    cy.url().should('include', '/start');

    // Resume the game
    cy.get('[data-test-id="resume-game-button"]').click();
    cy.url().should('include', '/game');

    // Continue the game
    cy.get('[data-test-id^="answer-button-"]').first().click(); // Clicks the first answer button

    // After answering all questions, check the results
    cy.get('[data-test-id="results-button"]').click(); // Clicks the results button
    cy.get('.game-record').should('be.visible');
  });
});