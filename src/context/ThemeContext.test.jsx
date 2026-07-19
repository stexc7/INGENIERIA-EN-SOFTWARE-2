import { describe, expect, it, beforeEach } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider, useTheme } from './ThemeContext'

function Probe() {
  const { theme, toggleTheme } = useTheme()
  return (
    <div>
      <p data-testid="theme">{theme}</p>
      <button onClick={toggleTheme}>toggle</button>
    </div>
  )
}

describe('ThemeContext', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('starts in light theme by default', () => {
    render(<ThemeProvider><Probe /></ThemeProvider>)
    expect(screen.getByTestId('theme')).toHaveTextContent('light')
  })

  it('toggles to dark and persists it', async () => {
    render(<ThemeProvider><Probe /></ThemeProvider>)
    await userEvent.click(screen.getByText('toggle'))
    expect(screen.getByTestId('theme')).toHaveTextContent('dark')
    expect(window.localStorage.getItem('saludfamiliar.theme')).toBe('dark')
  })
})
