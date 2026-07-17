describe('Login', () => {
  it('shows the login screen with the app title', () => {
    cy.visit('/login')
    cy.contains('h1', 'Salud Familiar').should('be.visible')
    cy.get('#username').should('be.visible')
    cy.get('#password').should('be.visible')
  })

  it('shows an error message with invalid credentials', () => {
    cy.visit('/login')
    cy.get('#username').type('priscila')
    cy.get('#password').type('incorrecta')
    cy.contains('button', 'Ingresar').click()
    cy.get('[role="alert"]').should('contain.text', 'incorrectos')
  })

  it('logs in with valid credentials and redirects to inicio', () => {
    cy.loginViaUi('priscila', 'demo1234')
    cy.url().should('include', '/inicio')
    cy.contains('Priscila').should('be.visible')
  })

  it('redirects unauthenticated visitors away from protected pages', () => {
    cy.visit('/citas')
    cy.url().should('include', '/login')
  })
})
