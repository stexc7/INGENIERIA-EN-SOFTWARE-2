const PRISCILA = {
  id: 'u1',
  username: 'priscila',
  name: 'Priscila del Rocío Ordóñez León',
  age: 63,
  conditions: ['Diabetes'],
  accessibility: ['Usa lentes'],
  avatarInitials: 'PO',
}

Cypress.Commands.add('loginViaUi', (username = 'priscila', password = 'demo1234') => {
  cy.visit('/login')
  cy.get('#username').type(username)
  cy.get('#password').type(password)
  cy.contains('button', 'Ingresar').click()
})

Cypress.Commands.add('loginAsPriscila', () => {
  cy.visit('/inicio', {
    onBeforeLoad(win) {
      win.localStorage.setItem('saludfamiliar.session', JSON.stringify(PRISCILA))
    },
  })
})
