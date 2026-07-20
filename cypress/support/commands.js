const PRISCILA = {
  id: 'u1',
  username: 'priscila',
  name: 'Priscila del Rocío Ordóñez León',
  age: 63,
  conditions: ['Diabetes'],
  accessibility: ['Usa lentes'],
  avatarInitials: 'PO',
}

function unregisterServiceWorkers(win) {
  if (win.navigator && win.navigator.serviceWorker) {
    win.navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => registration.unregister())
    })
  }
}

Cypress.Commands.add('loginViaUi', (username = 'priscila', password = 'demo1234') => {
  cy.visit('/login', {
    onBeforeLoad(win) {
      unregisterServiceWorkers(win)
    },
  })
  cy.get('#username').type(username)
  cy.get('#password').type(password)
  cy.contains('button', 'Ingresar').click()
})

Cypress.Commands.add('loginAsPriscila', (path = '/inicio') => {
  cy.visit(path, {
    onBeforeLoad(win) {
      unregisterServiceWorkers(win)
      win.localStorage.setItem('saludfamiliar.session', JSON.stringify(PRISCILA))
    },
  })
})
