import { describe, expect, it } from '@jest/globals'
import {
  getUpcomingAppointment,
  getLatestPrescription,
  getUnreadNotificationsCount,
  formatDate,
} from './dataHelpers'

const appointments = [
  { id: 'a1', userId: 'u1', date: '2020-01-01', time: '09:00' },
  { id: 'a2', userId: 'u1', date: '2099-01-01', time: '10:00' },
  { id: 'a3', userId: 'u1', date: '2099-01-01', time: '08:00' },
  { id: 'a4', userId: 'u2', date: '2099-01-01', time: '07:00' },
]

const prescriptions = [
  { id: 'r1', userId: 'u1', date: '2024-01-01' },
  { id: 'r2', userId: 'u1', date: '2025-06-15' },
  { id: 'r3', userId: 'u2', date: '2025-06-20' },
]

const notifications = [
  { id: 'n1', userId: 'u1', read: false },
  { id: 'n2', userId: 'u1', read: true },
  { id: 'n3', userId: 'u2', read: false },
]

describe('getUpcomingAppointment', () => {
  it('returns the earliest future appointment for the given user', () => {
    const result = getUpcomingAppointment(appointments, 'u1')
    expect(result.id).toBe('a3')
  })

  it('returns undefined when the user has no future appointments', () => {
    expect(getUpcomingAppointment(appointments, 'u3')).toBeUndefined()
  })
})

describe('getLatestPrescription', () => {
  it('returns the most recent prescription for the given user', () => {
    const result = getLatestPrescription(prescriptions, 'u1')
    expect(result.id).toBe('r2')
  })

  it('returns undefined when the user has no prescriptions', () => {
    expect(getLatestPrescription(prescriptions, 'u3')).toBeUndefined()
  })
})

describe('getUnreadNotificationsCount', () => {
  it('counts only unread notifications for the given user', () => {
    expect(getUnreadNotificationsCount(notifications, 'u1')).toBe(1)
  })

  it('returns 0 when there are no unread notifications', () => {
    expect(getUnreadNotificationsCount(notifications, 'u3')).toBe(0)
  })
})

describe('formatDate', () => {
  it('formats an ISO date into a long Spanish date', () => {
    const result = formatDate('2026-08-01')
    expect(result).toContain('agosto')
  })
})
