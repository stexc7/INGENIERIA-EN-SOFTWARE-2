const API_URL = Cypress.env('apiUrl') || 'http://localhost:4000/api'

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

// Inicia sesión contra el backend real vía API (rápido, sin pasar por la UI)
// y deja el token + perfil en localStorage tal como lo dejaría un login normal.
Cypress.Commands.add('loginAsPriscila', (path = '/inicio') => {
  cy.request('POST', `${API_URL}/auth/login`, { username: 'priscila', password: 'demo1234' }).then(
    ({ body }) => {
      cy.visit(path, {
        onBeforeLoad(win) {
          unregisterServiceWorkers(win)
          win.localStorage.setItem('saludfamiliar.token', body.token)
          win.localStorage.setItem('saludfamiliar.session', JSON.stringify(body.user))
        },
      })
    },
  )
})
