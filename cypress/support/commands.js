// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("loginToSlowhop", () => {
  cy.visit(Cypress.env("slowhopPortal"));
  cy.get(".login-link").click();
  cy.wait(500);
  cy.get(".login-link", { timeout: 10000 }).should("not.be.visible");
  cy.get(".modal-body")
    .should("contain", "Log in")
    .then((loginModal) => {
      cy.wrap(loginModal)
        .find(".login-email")
        .type(Cypress.env("slowhopLogin"));
      cy.wrap(loginModal)
        .find(".login-pass")
        .type(Cypress.env("slowhopPassword"));
      cy.wrap(loginModal).find(".login-submit").click();
    });
  cy.get(".container-fluid").should("contain", "YOUR ACCOUNT");
});
