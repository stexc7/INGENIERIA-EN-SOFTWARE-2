import { describe, expect, it, beforeEach } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FontSizeProvider, useFontSize } from './FontSizeContext'

function Probe() {
  const { scale, increaseFontSize, decreaseFontSize, resetFontSize } = useFontSize()
  return (
    <div>
      <p data-testid="scale">{scale}</p>
      <button onClick={increaseFontSize}>increase</button>
      <button onClick={decreaseFontSize}>decrease</button>
      <button onClick={resetFontSize}>reset</button>
    </div>
  )
}

describe('FontSizeContext', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('starts at scale 1 by default', () => {
    render(<FontSizeProvider><Probe /></FontSizeProvider>)
    expect(screen.getByTestId('scale')).toHaveTextContent('1')
  })

  it('increases and persists the scale', async () => {
    render(<FontSizeProvider><Probe /></FontSizeProvider>)
    await userEvent.click(screen.getByText('increase'))
    expect(screen.getByTestId('scale')).toHaveTextContent('1.15')
    expect(window.localStorage.getItem('saludfamiliar.fontScale')).toBe('1.15')
  })

  it('does not go below the minimum scale', async () => {
    render(<FontSizeProvider><Probe /></FontSizeProvider>)
    for (let i = 0; i < 5; i += 1) {
      await userEvent.click(screen.getByText('decrease'))
    }
    expect(Number(screen.getByTestId('scale').textContent)).toBeGreaterThanOrEqual(0.85)
  })

  it('resets to scale 1', async () => {
    render(<FontSizeProvider><Probe /></FontSizeProvider>)
    await userEvent.click(screen.getByText('increase'))
    await userEvent.click(screen.getByText('reset'))
    expect(screen.getByTestId('scale')).toHaveTextContent('1')
  })
})