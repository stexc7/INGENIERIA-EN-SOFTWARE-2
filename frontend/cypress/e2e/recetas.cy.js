describe('Recetas', () => {
  beforeEach(() => {
    cy.loginAsPriscila()
  })

  it('lists the prescriptions and opens the detail screen', () => {
    cy.contains('a', 'Citas') // sanity: bottom nav rendered
    cy.get('nav[aria-label="Navegación principal"]').contains('a', 'Recetas').click()
    cy.url().should('include', '/recetas')
    cy.contains('button', 'Metformina 850mg').click()
    cy.url().should('match', /\/recetas\/.+/)
    cy.contains('h2', 'Metformina 850mg').should('be.visible')
    cy.contains('Indicaciones').should('be.visible')
    cy.contains('Medicamentos').should('be.visible')
    cy.contains('Cada 12 horas').should('be.visible')
  })

  it('can open the latest prescription directly from the home screen', () => {
    cy.loginAsPriscila('/inicio')
    cy.contains('Última receta')
    cy.contains('button', 'Metformina 850mg').click()
    cy.url().should('match', /\/recetas\/.+/)
    cy.contains('h2', 'Metformina 850mg').should('be.visible')
  })
})
