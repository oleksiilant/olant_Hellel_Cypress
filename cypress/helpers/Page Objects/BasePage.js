import Footer from "../Components/Footer";

export default class {
  _url;
  footer = new Footer();

  constructor(url) {
    this._url = url;
  }

  navigate() {
    cy.visit(this._url);
  }

  containUrlCheck(expectedUrl) {
    cy.url().should("contain", expectedUrl);
  }
}
