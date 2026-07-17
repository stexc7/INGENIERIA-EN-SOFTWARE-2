import { describe, expect, it, beforeEach } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NotificationsProvider, useNotifications } from './NotificationsContext'

function Probe() {
  const { notifications, markAsRead } = useNotifications()
  const first = notifications[0]
  return (
    <div>
      <p data-testid="read-state">{first ? String(first.read) : 'none'}</p>
      <button onClick={() => markAsRead(first.id)}>mark-read</button>
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
})
