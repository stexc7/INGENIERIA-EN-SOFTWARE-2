describe('Agendar cita', () => {
  beforeEach(() => {
    cy.loginAsPriscila()
  })

  it('completes the 3-step wizard and shows the new appointment', () => {
    cy.contains('a', 'Agendar nueva cita').click()
    cy.url().should('include', '/agendar')

    // Paso 1: especialidad
    cy.contains('h2, legend', /especialidad/i)
    cy.contains('Cardiología').click()
    cy.contains('button', 'Continuar').click()

    // Paso 2: fecha, hora y lugar
    cy.get('#appointment-date').type('2099-01-09')
    cy.get('#appointment-time').select('10:00')
    cy.get('#appointment-location').select('Clínica Santa Ana')
    cy.contains('button', 'Continuar').click()

    // Paso 3: confirmar
    cy.contains('Revisa tu cita').should('be.visible')
    cy.contains('Cardiología').should('be.visible')
    cy.contains('button', 'Confirmar cita').click()

    // Resultado: vuelve a Mis citas con la nueva cita
    cy.url().should('include', '/citas')
    cy.contains('Tu cita fue agendada correctamente.').should('be.visible')
    cy.contains('Cardiología').should('be.visible')
    cy.contains('Pendiente').should('be.visible')
  })

  it('keeps the continue button disabled until a specialty is selected', () => {
    cy.visit('/agendar')
    cy.contains('button', 'Continuar').should('be.disabled')
  })
})
