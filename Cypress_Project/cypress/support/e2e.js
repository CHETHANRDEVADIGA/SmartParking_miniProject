// ***********************************************************
// This support/e2e.js is processed and loaded automatically before your test files.
// ***********************************************************

import './commands';

// Prevent uncaught exceptions from failing tests if third party or minor app errors occur
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false;
});
