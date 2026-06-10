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
  it('API testing', () => {})