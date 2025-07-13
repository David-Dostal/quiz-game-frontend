describe('basic quiz game', () => {

  it('Basic cycle without resuming', () => {
    cy.visit('http://localhost:3000');
    // Navigate to the Start page
    cy.contains('Start').click();
    cy.url().should('include', '/start');

    //Selects random difficulty and category and starts the game', () => {
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

    //it('Plays through the quiz', () => {
    // Repeat for the number of questions
    cy.get('[data-test-id^="answer-button-"]').first().click(); // Clicks the first answer button


    //it('Checks the results page', () => {
    // After answering all questions, check the results
    cy.get('[data-test-id="results-button"]').click(); // Clicks the results button

    cy.get('.game-record').should('be.visible');
  });
});