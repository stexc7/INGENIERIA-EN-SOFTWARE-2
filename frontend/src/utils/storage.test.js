import { describe, expect, it, beforeEach } from '@jest/globals'
import { readStorage, writeStorage } from './storage'

describe('storage utils', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('returns the fallback when the key does not exist', () => {
    expect(readStorage('missing-key', ['fallback'])).toEqual(['fallback'])
  })

  it('writes and reads back a JSON value', () => {
    writeStorage('my-key', { a: 1 })
    expect(readStorage('my-key', null)).toEqual({ a: 1 })
  })

  it('returns the fallback when the stored value is corrupted JSON', () => {
    window.localStorage.setItem('bad-key', '{not valid json')
    expect(readStorage('bad-key', 'fallback')).toBe('fallback')
  })
})
