import { describe, expect, it, afterEach } from '@jest/globals'
import { render, screen, act } from '@testing-library/react'
import OfflineBanner from './OfflineBanner'

describe('OfflineBanner', () => {
  afterEach(() => {
    Object.defineProperty(window.navigator, 'onLine', { value: true, configurable: true })
  })

  it('renders nothing while online', () => {
    Object.defineProperty(window.navigator, 'onLine', { value: true, configurable: true })
    render(<OfflineBanner />)
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('shows a message when the browser goes offline', () => {
    Object.defineProperty(window.navigator, 'onLine', { value: true, configurable: true })
    render(<OfflineBanner />)

    act(() => {
      Object.defineProperty(window.navigator, 'onLine', { value: false, configurable: true })
      window.dispatchEvent(new Event('offline'))
    })

    expect(screen.getByRole('status')).toHaveTextContent('Sin conexión')
  })
})
