import HomePage from '../pages/HomePage'
import RegistrationModal from '../pages/RegistrationModal'
import { validUser } from '../support/testData'

describe('HW 21 CLI registration', () => {
  const homePage = new HomePage()
  const registrationModal = new RegistrationModal()

  beforeEach(() => {
    homePage.visit()
    homePage.openRegistrationModal()
    registrationModal.shouldBeVisible()
  })

  it('registers a new user using the current Cypress config', () => {
    cy.env(['registrationUser']).then(({ registrationUser }) => {
      const user = registrationUser || validUser()

      expect(user, 'registration user').to.include.keys(
        'name',
        'lastName',
        'email',
        'password',
      )

      registrationModal.fillForm(user)
      registrationModal.submit()

      cy.url().should('contain', '/panel/garage')
      cy.contains('Garage').should('be.visible')
    })
  })
})
