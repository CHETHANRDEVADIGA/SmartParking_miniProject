// ***********************************************
// Custom Cypress Commands for Smart Parking System
// ***********************************************

Cypress.Commands.add('loginAsAdmin', () => {
  cy.visit('/login');
  cy.get('input[type="email"]').clear().type('sweet@gmail.com');
  cy.get('input[type="password"]').clear().type('queen');
  cy.get('button[type="submit"]').click();
  cy.url().should('include', '/dashboard');
  cy.contains('Dashboard').should('be.visible');
});

Cypress.Commands.add('loginAsUser', () => {
  cy.visit('/login');
  cy.get('input[type="email"]').clear().type('user@gmail.com');
  cy.get('input[type="password"]').clear().type('user123');
  cy.get('button[type="submit"]').click();
  cy.url().should('include', '/dashboard');
  cy.contains('Dashboard').should('be.visible');
});
