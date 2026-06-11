import HomePage from '../pages/HomePage'
import RegistrationModal from '../pages/RegistrationModal'
import { validUser } from '../support/testData'

describe('HW 22 API testing', () => {
  const homePage = new HomePage()
  const registrationModal = new RegistrationModal()

  const user = validUser()
  const car = {
    brand: 'BMW',
    model: 'X5',
    mileage: 1203,
  }
  const expence = {
    reportedAt: new Date().toISOString().slice(0, 10),
    mileage: 3000,
    liters: 25,
    totalCost: 500,
  }

  let carId
  let expenceId

  it('creates car from UI and saves car id from intercept', () => {
    homePage.visit()
    homePage.openRegistrationModal()
    registrationModal.shouldBeVisible()
    registrationModal.fillForm(user)
    registrationModal.submit()

    cy.url().should('contain', '/panel/garage')
    cy.contains('Garage').should('be.visible')

    cy.intercept('POST', '**/api/cars').as('createCar')

    // тачка
    cy.contains('button', 'Add car').click()
    cy.get('#addCarBrand').select(car.brand)
    cy.get('#addCarModel').select(car.model)
    cy.get('#addCarMileage').type(String(car.mileage))
    cy.contains('.modal-footer button', 'Add').click()

    cy.wait('@createCar').then(({ response }) => {
      // айдішка
      expect(response.statusCode).to.eq(201)
      carId = response.body.data.id
      expect(carId).to.exist
    })
  })

  it('gets cars by api and checks created car', () => {
    cy.login(user.email, user.password)
    cy.contains('Garage').should('be.visible')

    cy.request('GET', '/api/cars').then((response) => {
      // шукаєм
      expect(response.status).to.eq(200)

      const myCar = response.body.data.find((item) => item.id === carId)

      expect(myCar).to.exist
      expect(myCar.brand).to.eq(car.brand)
      expect(myCar.model).to.eq(car.model)
      expect(myCar.initialMileage).to.eq(car.mileage)
    })
  })

  it('creates expence by api and checks response body', () => {
    cy.login(user.email, user.password)
    cy.contains('Garage').should('be.visible')

    cy.createExpence(carId, expence).then((response) => {
      // ну тут
      expenceId = response.body.data.id

      expect(response.status).to.eq(200)
      expect(response.body.data.carId).to.eq(carId)
      expect(response.body.data.id).to.eq(expenceId)
      expect(response.body.data.liters).to.eq(expence.liters + 3)
      expect(response.body.data.totalCost).to.eq(expence.totalCost)
    })
  })

  it('checks expence for needed car by api', () => {
    cy.login(user.email, user.password)
    cy.contains('Garage').should('be.visible')

    cy.request({
      method: 'GET',
      url: '/api/expenses',
      qs: {
        carId,
      },
    }).then((response) => {
      // знову шукаєм
      expect(response.status).to.eq(200)

      const myExpence = response.body.data.find((item) => item.id === expenceId)

      expect(myExpence).to.exist
      expect(myExpence.carId).to.eq(carId)
      expect(myExpence.mileage).to.eq(expence.mileage + 10)
      expect(myExpence.liters).to.eq(expence.liters)
      expect(myExpence.totalCost).to.eq(expence.totalCost)
    })
  })
})
