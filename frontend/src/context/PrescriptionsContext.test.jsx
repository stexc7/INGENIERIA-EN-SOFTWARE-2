import { describe, expect, it, beforeEach, jest } from '@jest/globals'
import { screen, waitFor } from '@testing-library/react'
import { usePrescriptions } from './PrescriptionsContext'
import { renderWithProviders, loginAs } from '../test-utils'

jest.mock('../utils/apiClient')

function Probe() {
  const { prescriptions } = usePrescriptions()
  return <p data-testid="count">{prescriptions.length}</p>
}

describe('PrescriptionsContext', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it("loads the user's prescriptions from the API on mount", async () => {
    loginAs('priscila')
    renderWithProviders(<Probe />)

    await waitFor(() => expect(Number(screen.getByTestId('count').textContent)).toBeGreaterThan(0))
  })

  it('caches the fetched prescriptions to localStorage', async () => {
    loginAs('priscila')
    renderWithProviders(<Probe />)

    await waitFor(() => {
      const stored = JSON.parse(window.localStorage.getItem('saludfamiliar.prescriptions.cache'))
      expect(stored.length).toBeGreaterThan(0)
    })
  })
})
