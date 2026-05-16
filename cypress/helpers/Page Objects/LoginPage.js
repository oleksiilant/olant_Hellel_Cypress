import BasePage from "./BasePage";

const url = "https://www.saucedemo.com/";

export default class extends BasePage {
  constructor() {
    super(url);
  }

  get usernameField() {
    return cy.get("#user-name");
  }

  get passwordField() {
    return cy.get("#password");
  }

  get loginButton() {
    return cy.get("#login-button");
  }

  get errorMessage() {
    return cy.get(".error-message-container");
  }

  login(username, password) {
    this.usernameField.type(username);
    this.passwordField.type(password);
    this.loginButton.click();
  }

  containUrlCheck(expectedUrl) {
    cy.url().should("contain", expectedUrl);
  }
}
