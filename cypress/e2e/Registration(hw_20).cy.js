import HomePage from '../pages/HomePage.js'
import RegistrationModal from '../pages/RegistrationModal.js'
import {
  invalidRegistrationData,
  validPassword,
  validUser,
} from '../support/testData.js'

describe('Registration form', () => {
  const homePage = new HomePage()
  const registrationModal = new RegistrationModal()

  let errors

  before(() => {
    cy.fixture('registrationErrors').then((registrationErrors) => {
      errors = registrationErrors
    })
  })

  beforeEach(() => {
    homePage.visit()
    homePage.openRegistrationModal()
    registrationModal.shouldBeVisible()
  })

  it('Verify registration form fields are visible', () => {
    registrationModal.shouldHaveRequiredFields()
    registrationModal.shouldKeepSubmitDisabled()
  })

  it('Validate empty required fields', () => {
    registrationModal.focusAndBlurField('name')
    registrationModal.shouldShowFieldError('name', errors.name.required)

    registrationModal.focusAndBlurField('lastName')
    registrationModal.shouldShowFieldError('lastName', errors.lastName.required)

    registrationModal.focusAndBlurField('email')
    registrationModal.shouldShowFieldError('email', errors.email.required)

    registrationModal.focusAndBlurField('password')
    registrationModal.shouldShowFieldError('password', errors.password.required)

    registrationModal.focusAndBlurField('repeatPassword')
    registrationModal.shouldShowFieldError(
      'repeatPassword',
      errors.repeatPassword.required,
    )
  })

  it('Validate name field', () => {
    registrationModal.typeAndBlurField(
      'name',
      invalidRegistrationData.name.invalidFormat,
    )
    registrationModal.shouldShowFieldError('name', errors.name.invalid)

    registrationModal.typeAndBlurField(
      'name',
      invalidRegistrationData.name.tooShort,
    )
    registrationModal.shouldShowFieldError('name', errors.name.length)

    registrationModal.typeAndBlurField(
      'name',
      invalidRegistrationData.name.tooLong,
    )
    registrationModal.shouldShowFieldError('name', errors.name.length)
  })

  it('Validate last name field', () => {
    registrationModal.typeAndBlurField(
      'lastName',
      invalidRegistrationData.lastName.invalidFormat,
    )
    registrationModal.shouldShowFieldError('lastName', errors.lastName.invalid)

    registrationModal.typeAndBlurField(
      'lastName',
      invalidRegistrationData.lastName.tooShort,
    )
    registrationModal.shouldShowFieldError('lastName', errors.lastName.length)

    registrationModal.typeAndBlurField(
      'lastName',
      invalidRegistrationData.lastName.tooLong,
    )
    registrationModal.shouldShowFieldError('lastName', errors.lastName.length)
  })

  it('Validate email field', () => {
    registrationModal.typeAndBlurField(
      'email',
      invalidRegistrationData.email.invalidFormat,
    )
    registrationModal.shouldShowFieldError('email', errors.email.invalid)
  })

  it('Validate password field', () => {
    registrationModal.typeAndBlurField(
      'password',
      invalidRegistrationData.password.tooShort,
    )
    registrationModal.shouldShowFieldError('password', errors.password.invalid)

    registrationModal.typeAndBlurField(
      'password',
      invalidRegistrationData.password.withoutNumberAndCapital,
    )
    registrationModal.shouldShowFieldError('password', errors.password.invalid)

    registrationModal.typeAndBlurField(
      'password',
      invalidRegistrationData.password.withoutSmallLetter,
    )
    registrationModal.shouldShowFieldError('password', errors.password.invalid)

    registrationModal.typeAndBlurField(
      'password',
      invalidRegistrationData.password.tooLong,
    )
    registrationModal.shouldShowFieldError('password', errors.password.invalid)
  })

  it('Validate repeated password mismatch', () => {
    registrationModal.typeAndBlurField('password', validPassword)
    registrationModal.typeAndBlurField(
      'repeatPassword',
      invalidRegistrationData.repeatPassword.mismatch,
    )

    registrationModal.shouldShowFieldError(
      'repeatPassword',
      errors.repeatPassword.mismatch,
    )
  })

  it('Check register button is disabled when data is incorrect', () => {
    const user = validUser()

    registrationModal.nameField.type(user.name)
    registrationModal.lastNameField.type(user.lastName)
    registrationModal.emailField.type(invalidRegistrationData.email.invalidFormat)
    registrationModal.passwordField.type(user.password, { sensitive: true })
    registrationModal.repeatPasswordField.type(user.password, { sensitive: true })

    registrationModal.shouldKeepSubmitDisabled()
  })

  it('Verify new user registration with valid data', () => {
    registrationModal.fillForm(validUser())
    registrationModal.submit()

    cy.url().should('contain', '/panel/garage')
    cy.contains('Garage').should('be.visible')
  })

  it('Verify created user can login with custom command', () => {
    const user = validUser()

    registrationModal.fillForm(user)
    registrationModal.submit()

    cy.url().should('contain', '/panel/garage')
    cy.contains('Garage').should('be.visible')

    cy.clearCookies()
    cy.clearLocalStorage()

    cy.login(user.email, user.password)

    cy.url().should('contain', '/panel/garage')
    cy.contains('Garage').should('be.visible')
  })
})
