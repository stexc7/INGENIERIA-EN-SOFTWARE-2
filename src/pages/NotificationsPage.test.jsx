import { describe, expect, it, beforeEach } from '@jest/globals'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NotificationsPage from './NotificationsPage'
import { renderWithProviders, loginAs } from '../test-utils'

describe('NotificationsPage', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('shows an empty state for a user with no notifications', () => {
    loginAs('belen')
    renderWithProviders(<NotificationsPage />, { route: '/notificaciones' })
    expect(screen.getByText('No tienes notificaciones por ahora.')).toBeInTheDocument()
  })

  it("marks a notification as read when clicked", async () => {
    loginAs('priscila')
    renderWithProviders(<NotificationsPage />, { route: '/notificaciones' })

    const item = screen.getByRole('button', { name: /Recordatorio de cita/i })
    await userEvent.click(item)

    const stored = JSON.parse(window.localStorage.getItem('saludfamiliar.notifications'))
    const updated = stored.find((n) => n.id === 'n1')
    expect(updated.read).toBe(true)
  })
})
