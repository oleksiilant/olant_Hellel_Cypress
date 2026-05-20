import { faker } from '@faker-js/faker'
import { QueryingPage } from '../helpers/Page Objects/queryingPage'
import { ActionsPage } from '../helpers/Page Objects/actionsPage'

describe('Smoke', () => {
  before(() => {
    console.log('before')
  })

  beforeEach(() => {
    console.log('beforeEach')
    cy.visit('/')
  })

  after(() => {
    console.log('after')
  })

  afterEach(() => {
    console.log('afterEach')
  })

  it('Submit', () => {
    const queryingPage = new QueryingPage()

    cy.contains('get').click()
    queryingPage.emailField.type(faker.internet.email())
    queryingPage.passwordField.type(faker.internet.password())
    queryingPage.submitButton.click()
  })

  it('No submit', () => {
    const queryingPage = new QueryingPage()

    cy.contains('get').click()
    queryingPage.emailField.type(faker.internet.email())
    queryingPage.passwordField.type(faker.internet.password())
  })

  it('Actions page', () => {
    const actionsPage = new ActionsPage()

    cy.contains('type').click()
    actionsPage.emailField.type(faker.internet.email())
  })
})
