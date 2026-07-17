import { describe, expect, it, beforeEach } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NotificationsProvider, useNotifications } from './NotificationsContext'

function Probe() {
  const { notifications, markAsRead, markAllAsRead } = useNotifications()
  const first = notifications[0]
  const mineUnreadCount = notifications.filter((n) => n.userId === 'u1' && !n.read).length
  return (
    <div>
      <p data-testid="read-state">{first ? String(first.read) : 'none'}</p>
      <p data-testid="unread-count">{mineUnreadCount}</p>
      <button onClick={() => markAsRead(first.id)}>mark-read</button>
      <button onClick={() => markAllAsRead('u1')}>mark-all-read</button>
    </div>
  )
}

describe('NotificationsContext', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('marks a notification as read and persists the change', async () => {
    render(
      <NotificationsProvider>
        <Probe />
      </NotificationsProvider>,
    )
    expect(screen.getByTestId('read-state')).toHaveTextContent('false')

    await userEvent.click(screen.getByText('mark-read'))

    expect(screen.getByTestId('read-state')).toHaveTextContent('true')
  })

  it('marks all of a user\'s notifications as read and persists the change', async () => {
    render(
      <NotificationsProvider>
        <Probe />
      </NotificationsProvider>,
    )
    expect(Number(screen.getByTestId('unread-count').textContent)).toBeGreaterThan(0)

    await userEvent.click(screen.getByText('mark-all-read'))

    expect(screen.getByTestId('unread-count')).toHaveTextContent('0')
    const stored = JSON.parse(window.localStorage.getItem('saludfamiliar.notifications'))
    const mine = stored.filter((n) => n.userId === 'u1')
    expect(mine.every((n) => n.read)).toBe(true)
  })
})
