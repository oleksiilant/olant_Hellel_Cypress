const BASE_URL = "https://qauto.forstudy.space/";
const AUTH = { auth: { username: "guest", password: "welcome2qauto" } };

Cypress.on("uncaught:exception", () => false);

// describe("qauto.forstudy.space", () => {
//   beforeEach(() => {
//     cy.visit(BASE_URL, AUTH);
//   });