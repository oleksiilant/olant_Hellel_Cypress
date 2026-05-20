export class QueryingPage {
  get emailField() {
    return cy.get('#inputEmail')
  }

  get passwordField() {
    return cy.get('#inputPassword')
  }

  get submitButton() {
    return cy.get('[data-cy="submit"]')
  }
}
