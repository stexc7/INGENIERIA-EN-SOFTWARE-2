import { describe, expect, it, beforeEach, jest } from '@jest/globals'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useNotifications } from './NotificationsContext'
import { renderWithProviders, loginAs } from '../test-utils'

jest.mock('../utils/apiClient')

function Probe() {
  const { notifications, markAsRead, markAllAsRead } = useNotifications()
  const first = notifications[0]
  const unreadCount = notifications.filter((n) => !n.read).length
  return (
    <div>
      <p data-testid="read-state">{first ? String(first.read) : 'none'}</p>
      <p data-testid="unread-count">{unreadCount}</p>
      <button onClick={() => markAsRead(first.id)}>mark-read</button>
      <button onClick={() => markAllAsRead()}>mark-all-read</button>
    </div>
  )
}

describe('NotificationsContext', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it("loads the user's notifications from the API on mount", async () => {
    loginAs('priscila')
    renderWithProviders(<Probe />)

    await waitFor(() => expect(screen.getByTestId('read-state')).toHaveTextContent('false'))
  })

  it('marks a single notification as read', async () => {
    loginAs('priscila')
    renderWithProviders(<Probe />)
    await waitFor(() => expect(screen.getByTestId('read-state')).toHaveTextContent('false'))

    await userEvent.click(screen.getByText('mark-read'))

    await waitFor(() => expect(screen.getByTestId('read-state')).toHaveTextContent('true'))
  })

  it("marks all of the user's notifications as read", async () => {
    loginAs('priscila')
    renderWithProviders(<Probe />)
    await waitFor(() => expect(Number(screen.getByTestId('unread-count').textContent)).toBeGreaterThan(0))

    await userEvent.click(screen.getByText('mark-all-read'))

    await waitFor(() => expect(screen.getByTestId('unread-count')).toHaveTextContent('0'))
    const stored = JSON.parse(window.localStorage.getItem('saludfamiliar.notifications.cache'))
    expect(stored.every((n) => n.read)).toBe(true)
  })
})
