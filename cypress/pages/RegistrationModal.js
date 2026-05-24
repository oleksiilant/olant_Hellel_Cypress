const selectors = {
  modal: '.modal-content',
  title: '.modal-title',
  registerButton: '.modal-footer .btn-primary',
  errorMessage: '.invalid-feedback',
}

const fieldSelectors = {
  name: '#signupName',
  lastName: '#signupLastName',
  email: '#signupEmail',
  password: '#signupPassword',
  repeatPassword: '#signupRepeatPassword',
}

export default class RegistrationModal {
  get modal() {
    return cy.get(selectors.modal)
  }

  get title() {
    return cy.get(selectors.title)
  }

  get nameField() {
    return this.getField('name')
  }

  get lastNameField() {
    return this.getField('lastName')
  }

  get emailField() {
    return this.getField('email')
  }

  get passwordField() {
    return this.getField('password')
  }

  get repeatPasswordField() {
    return this.getField('repeatPassword')
  }

  get registerButton() {
    return cy.get(selectors.registerButton)
  }

  getField(fieldName) {
    return cy.get(fieldSelectors[fieldName])
  }

  shouldBeVisible() {
    this.modal.should('be.visible')
    this.title.should('contain.text', 'Registration')
  }

  shouldHaveRequiredFields() {
    this.nameField.should('be.visible')
    this.lastNameField.should('be.visible')
    this.emailField.should('be.visible')
    this.passwordField.should('be.visible')
    this.repeatPasswordField.should('be.visible')
    this.registerButton.should('be.visible')
  }

  focusAndBlurField(fieldName) {
    this.getField(fieldName).focus().blur()
  }

  typeAndBlurField(fieldName, value, options = {}) {
    const isPasswordField = ['password', 'repeatPassword'].includes(fieldName)
    const typeOptions = isPasswordField ? { ...options, sensitive: true } : options

    this.getField(fieldName).clear().type(value, typeOptions).blur()
  }

  shouldShowFieldError(fieldName, errorText) {
    this.getField(fieldName).should('have.class', 'is-invalid')
    cy.contains(selectors.errorMessage, errorText).should('be.visible')
    this.registerButton.should('be.disabled')
  }

  fillForm(user) {
    this.nameField.clear().type(user.name)
    this.lastNameField.clear().type(user.lastName)
    this.emailField.clear().type(user.email)
    this.passwordField.clear().type(user.password, { sensitive: true })
    this.repeatPasswordField.clear().type(user.password, { sensitive: true })
  }

  submit() {
    this.registerButton.should('not.be.disabled').click()
  }

  shouldKeepSubmitDisabled() {
    this.registerButton.should('be.disabled')
  }
}
