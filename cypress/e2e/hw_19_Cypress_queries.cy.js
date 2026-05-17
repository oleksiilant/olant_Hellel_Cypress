describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://qauto.forstudy.space/', {
      auth: {
        username: 'guest',
        password: 'welcome2qauto',
      }
    })
  })
})