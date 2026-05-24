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

const BASE_URL = 'https://qauto.forstudy.space/'

const AUTH = {
  auth: {
    username: 'guest',
    password: 'welcome2qauto',
  },
}

Cypress.Commands.overwrite('type', (originalFn, element, text, options = {}) => {
  if (options.sensitive) {
    options.log = false

    Cypress.log({
      $el: element,
      name: 'type',
      message: '*'.repeat(String(text).length),
    })
  }

  return originalFn(element, text, options)
})

Cypress.Commands.add('login', (email, password) => {
  cy.visit(BASE_URL, AUTH)
  cy.get('.header_signin').click()
  cy.get('.modal-content').should('be.visible')
  cy.get('#signinEmail').clear().type(email)
  cy.get('#signinPassword').clear().type(password, { sensitive: true })
  cy.contains('.modal-footer button', 'Login').should('not.be.disabled').click()
})
