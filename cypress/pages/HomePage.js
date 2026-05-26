const BASE_URL = 'https://qauto.forstudy.space/'

const AUTH = {
  auth: {
    username: 'guest',
    password: 'welcome2qauto',
  },
}

export default class HomePage {
  get signInButton() {
    return cy.get('.header_signin')
  }

  get registrationButton() {
    return cy.contains('button', 'Registration')
  }

  visit() {
    const baseUrl = Cypress.config('baseUrl')
    const url = baseUrl && baseUrl !== 'https://example.cypress.io/' ? '/' : BASE_URL

    return cy.env(['basicAuth']).then(({ basicAuth }) => {
      cy.visit(url, {
        auth: basicAuth || AUTH.auth,
      })
    })
  }

  openSignInModal() {
    this.signInButton.click()
    cy.get('.modal-content').should('be.visible')
  }

  openRegistrationModal() {
    this.openSignInModal()
    this.registrationButton.click()
  }
}
