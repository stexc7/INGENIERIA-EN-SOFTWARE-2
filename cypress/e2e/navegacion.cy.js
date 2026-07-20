describe('Navegación principal', () => {
  beforeEach(() => {
    cy.loginAsPriscila()
  })

  it('navigates to each section from the bottom navigation', () => {
    cy.get('nav[aria-label="Navegación principal"]').within(() => {
      cy.contains('a', 'Citas').click()
    })
    cy.url().should('include', '/citas')
    cy.contains('h2', 'Próximas').should('be.visible')
    cy.get('nav[aria-label="Navegación principal"]').within(() => {
      cy.contains('a', 'Recetas').click()
    })
    cy.url().should('include', '/recetas')
    cy.get('nav[aria-label="Navegación principal"]').within(() => {
      cy.contains('a', 'Avisos').click()
    })
    cy.url().should('include', '/notificaciones')
    cy.get('nav[aria-label="Navegación principal"]').within(() => {
      cy.contains('a', 'Perfil').click()
    })
    cy.url().should('include', '/perfil')
    cy.contains('Priscila del Rocío Ordóñez León').should('be.visible')
    cy.get('nav[aria-label="Navegación principal"]').within(() => {
      cy.contains('a', 'Inicio').click()
    })
    cy.url().should('include', '/inicio')
  })

  it('highlights the active section', () => {
    cy.get('nav[aria-label="Navegación principal"]').should('be.visible')
    cy.get('nav[aria-label="Navegación principal"]').within(() => {
      cy.contains('a', 'Citas').click()
    })
    cy.contains('a', 'Citas').should('have.class', 'bottom-nav__item--active')
  })
})
