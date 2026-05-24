const BASE_URL = 'https://qauto.forstudy.space/'

const AUTH = {
  auth: {
    username: 'guest',
    password: 'welcome2qauto',
  },
}

const selectors = {
  signInButton: '.header_signin',
  registrationButton: 'button',
  modal: '.modal-content',

  name: '#signupName',
  lastName: '#signupLastName',
  email: '#signupEmail',
  password: '#signupPassword',
  repeatPassword: '#signupRepeatPassword',
  registerButton: '.modal-footer .btn-primary',
}

const validUser = () => {
  const timestamp = Date.now()

  return {
    name: 'Olena',
    lastName: 'Testova',
    email: `olena.test.${timestamp}@example.com`,
    password: 'Qwerty123',
  }
}

const openRegistrationModal = () => {
  cy.visit(BASE_URL, AUTH)

  cy.get(selectors.signInButton).click()
  cy.get(selectors.modal).should('be.visible')
  cy.contains(selectors.registrationButton, 'Registration').click()

  cy.get(selectors.modal).should('be.visible')
  cy.contains('Registration').should('be.visible')
}

const checkError = (fieldSelector, errorText) => {
  cy.get(fieldSelector).should('have.class', 'is-invalid')
  cy.contains('.invalid-feedback', errorText).should('be.visible')
  cy.get(selectors.registerButton).should('be.disabled')
}

const typeAndBlur = (fieldSelector, value) => {
  cy.get(fieldSelector).clear().type(value).blur()
}

describe('Registration form', () => {
  beforeEach(() => {
    openRegistrationModal()
  })

  it('should show registration form fields', () => {
    cy.contains('Registration').should('be.visible')

    cy.get(selectors.name).should('be.visible')
    cy.get(selectors.lastName).should('be.visible')
    cy.get(selectors.email).should('be.visible')
    cy.get(selectors.password).should('be.visible')
    cy.get(selectors.repeatPassword).should('be.visible')
    cy.get(selectors.registerButton).should('be.visible')
  })

  it('should validate empty required fields', () => {
    cy.get(selectors.name).focus().blur()
    checkError(selectors.name, 'Name required')

    cy.get(selectors.lastName).focus().blur()
    checkError(selectors.lastName, 'Last name required')

    cy.get(selectors.email).focus().blur()
    checkError(selectors.email, 'Email required')

    cy.get(selectors.password).focus().blur()
    checkError(selectors.password, 'Password required')

    cy.get(selectors.repeatPassword).focus().blur()
    checkError(selectors.repeatPassword, 'Re-enter password required')
  })

  it('should validate invalid name', () => {
    typeAndBlur(selectors.name, '123')
    checkError(selectors.name, 'Name is invalid')
  })

  it('should validate name length', () => {
    typeAndBlur(selectors.name, 'A')
    checkError(selectors.name, 'Name has to be from 2 to 20 characters long')

    cy.get(selectors.name).clear().type('A'.repeat(21)).blur()
    checkError(selectors.name, 'Name has to be from 2 to 20 characters long')
  })

  it('should validate invalid last name', () => {
    typeAndBlur(selectors.lastName, '123')
    checkError(selectors.lastName, 'Last name is invalid')
  })

  it('should validate last name length', () => {
    typeAndBlur(selectors.lastName, 'B')
    checkError(
      selectors.lastName,
      'Last name has to be from 2 to 20 characters long',
    )

    cy.get(selectors.lastName).clear().type('B'.repeat(21)).blur()
    checkError(
      selectors.lastName,
      'Last name has to be from 2 to 20 characters long',
    )
  })

  it('should validate incorrect email', () => {
    typeAndBlur(selectors.email, 'wrong-email')
    checkError(selectors.email, 'Email is incorrect')
  })

  it('should validate password requirements', () => {
    typeAndBlur(selectors.password, 'qwerty')
    checkError(
      selectors.password,
      'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
    )

    cy.get(selectors.password).clear().type('qwertyui').blur()
    checkError(
      selectors.password,
      'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
    )

    cy.get(selectors.password).clear().type('QWERTY123').blur()
    checkError(
      selectors.password,
      'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
    )
  })

  it('should validate repeated password mismatch', () => {
    typeAndBlur(selectors.password, 'Qwerty123')
    typeAndBlur(selectors.repeatPassword, 'Qwerty321')

    checkError(selectors.repeatPassword, 'Passwords do not match')
  })

  it('should keep register button disabled when data is incorrect', () => {
    cy.get(selectors.name).type('Olena')
    cy.get(selectors.lastName).type('Testova')
    cy.get(selectors.email).type('wrong-email')
    cy.get(selectors.password).type('Qwerty123')
    cy.get(selectors.repeatPassword).type('Qwerty123')

    cy.get(selectors.registerButton).should('be.disabled')
  })

  it('should register a new user with valid data', () => {
    const user = validUser()

    cy.get(selectors.name).type(user.name)
    cy.get(selectors.lastName).type(user.lastName)
    cy.get(selectors.email).type(user.email)
    cy.get(selectors.password).type(user.password)
    cy.get(selectors.repeatPassword).type(user.password)

    cy.get(selectors.registerButton).should('not.be.disabled').click()

    cy.url().should('contain', '/panel/garage')
    cy.contains('Garage').should('be.visible')
  })
})