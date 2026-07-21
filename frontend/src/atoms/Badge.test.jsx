import { describe, expect, it } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import Badge from './Badge'

describe('Badge', () => {
  it('renders the given text', () => {
    render(<Badge tone="success">Confirmada</Badge>)
    expect(screen.getByText('Confirmada')).toBeInTheDocument()
  })

  it('falls back to the info tone for an unknown tone', () => {
    render(<Badge tone="unknown">Pendiente</Badge>)
    expect(screen.getByText('Pendiente').className).toContain('badge--info')
  })
})
