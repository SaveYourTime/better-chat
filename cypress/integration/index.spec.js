/// <reference types="cypress" />

describe('ChatRoom', () => {
  const message = 'Message send by robot';

  before(() => {
    cy.login();
  });

  it('[LOAD] successfully loads', () => {
    cy.visit('/');
  });

  it('[USER] should see the user email at the top right corner after login', () => {
    cy.get('[data-testid="email"]').should('contain.text', Cypress.env('username'));
  });

  it('[CREATE] should send the message to chatroom', () => {
    cy.get('[data-testid="message-input"]').type(message).type('{enter}');
  });

  it('[READ] should see the message we just previous sent', () => {
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
    cy.get('[data-testid="message"]').last().should('contain.text', message);
  });

  it('[LOGOUT] should logout the user', () => {
    cy.get('[data-testid="logout"]').trigger('click', { force: true });
    cy.get('[data-testid="auth"]').should('exist');
  });
});
