import { describe, expect, it, beforeEach, jest } from '@jest/globals'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NotificationsPage from './NotificationsPage'
import { renderWithProviders, loginAs } from '../test-utils'

jest.mock('../utils/apiClient')

describe('NotificationsPage', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('shows an empty state for a user with no notifications', async () => {
    loginAs('belen')
    renderWithProviders(<NotificationsPage />, { route: '/notificaciones' })
    expect(await screen.findByText('No tienes notificaciones por ahora.')).toBeInTheDocument()
  })

  it('marks a notification as read when clicked', async () => {
    loginAs('priscila')
    renderWithProviders(<NotificationsPage />, { route: '/notificaciones' })

    const item = await screen.findByRole('button', { name: /Recordatorio de cita/i })
    await userEvent.click(item)

    await waitFor(() => {
      const stored = JSON.parse(window.localStorage.getItem('saludfamiliar.notifications.cache'))
      const updated = stored.find((n) => n.id === 'n1')
      expect(updated.read).toBe(true)
    })
  })

  it('shows the "mark all as read" button only when there are unread notifications', async () => {
    loginAs('priscila')
    renderWithProviders(<NotificationsPage />, { route: '/notificaciones' })
    expect(await screen.findByRole('button', { name: 'Marcar todas como leídas' })).toBeInTheDocument()
  })

  it('marks every notification as read when clicking "mark all as read"', async () => {
    loginAs('priscila')
    renderWithProviders(<NotificationsPage />, { route: '/notificaciones' })

    const button = await screen.findByRole('button', { name: 'Marcar todas como leídas' })
    await userEvent.click(button)

    await waitFor(() => {
      const stored = JSON.parse(window.localStorage.getItem('saludfamiliar.notifications.cache'))
      expect(stored.every((n) => n.read)).toBe(true)
    })
    expect(screen.queryByRole('button', { name: 'Marcar todas como leídas' })).not.toBeInTheDocument()
  })
})
