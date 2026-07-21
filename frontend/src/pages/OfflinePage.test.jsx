import { describe, expect, it } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import OfflinePage from './OfflinePage'

describe('OfflinePage', () => {
  it('shows the offline message and a retry button', () => {
    render(<OfflinePage />)
    expect(screen.getByText('Sin conexión a internet')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Reintentar' })).toBeInTheDocument()
  })
})
