export function getUpcomingAppointment(appointments, userId) {
  const today = new Date().toISOString().slice(0, 10)
  return appointments
    .filter((appt) => appt.userId === userId && appt.date >= today)
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))[0]
}

export function getLatestPrescription(prescriptions, userId) {
  return prescriptions
    .filter((rx) => rx.userId === userId)
    .sort((a, b) => b.date.localeCompare(a.date))[0]
}

export function getUnreadNotificationsCount(notifications, userId) {
  return notifications.filter((n) => n.userId === userId && !n.read).length
}

export function formatDate(isoDate) {
  const date = new Date(`${isoDate}T00:00:00`)
  return date.toLocaleDateString('es-EC', { weekday: 'long', day: 'numeric', month: 'long' })
}
