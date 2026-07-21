import { describe, expect, it } from '@jest/globals'
import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import BottomNavigation from './BottomNavigation'

describe('BottomNavigation', () => {
  it('renders the five main sections', () => {
    render(
      <MemoryRouter initialEntries={['/citas']}>
        <BottomNavigation />
      </MemoryRouter>,
    )
    expect(screen.getByRole('link', { name: /inicio/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /citas/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /recetas/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /avisos/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /perfil/i })).toBeInTheDocument()
  })

  it('marks the current route as active', () => {
    render(
      <MemoryRouter initialEntries={['/citas']}>
        <BottomNavigation />
      </MemoryRouter>,
    )
    expect(screen.getByRole('link', { name: /citas/i })).toHaveClass('bottom-nav__item--active')
  })
})
