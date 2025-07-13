//npm run test:e2e
describe('Navigation', () => {
  it('should navigate from homepage to Start page, back to homepage, and then to Results page and back to homepage', () => {
    cy.visit('http://localhost:3000/'); // Visit the homepage

    // Navigate to the Start page
    cy.contains('Start').click();
    cy.url().should('include', '/start');

    // Go back to the homepage by clicking on the title
    cy.get('.header-link').click();
    cy.url().should('eq', 'http://localhost:3000/');

    // Navigate to the Results page
    cy.contains('Results').click();
    cy.url().should('include', 'http://localhost:3000/results');

    // Go back to the homepage
    cy.contains('TechVia').click();
    cy.url().should('eq', 'http://localhost:3000/');
  });
  // Displays not found error screen for undefined page
  it('displays not found error screen for undefined page', () => {
    cy.visit('http://localhost:3000/nonexistent-page');
    cy.contains('The page you are looking for does not exist. Go home').should('be.visible');
  });
});