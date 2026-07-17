import { describe, expect, it } from '@jest/globals'
import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import Header from './Header'

const user = { name: 'Priscila del Rocío Ordóñez León', avatarInitials: 'PO' }

describe('Header', () => {
  it("greets the user with their first name and initials", () => {
    render(
      <MemoryRouter>
        <Header user={user} unreadCount={0} />
      </MemoryRouter>,
    )
    expect(screen.getByText('Priscila')).toBeInTheDocument()
    expect(screen.getByText('PO')).toBeInTheDocument()
    expect(screen.getByLabelText('Notificaciones')).toBeInTheDocument()
  })

  it('announces the unread count on the bell link', () => {
    render(
      <MemoryRouter>
        <Header user={user} unreadCount={3} />
      </MemoryRouter>,
    )
    expect(screen.getByLabelText('Notificaciones, 3 sin leer')).toBeInTheDocument()
  })
})
