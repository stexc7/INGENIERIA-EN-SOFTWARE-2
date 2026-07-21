import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../utils/apiClient'
import { readStorage, writeStorage } from '../utils/storage'
import { useAuth } from './AuthContext'

const NotificationsContext = createContext(null)
const STORAGE_KEY = 'saludfamiliar.notifications.cache'

export function NotificationsProvider({ children }) {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState(() => readStorage(STORAGE_KEY, []))

  useEffect(() => {
    if (!user) return
    api
      .get('/notifications')
      .then(({ notifications: fresh }) => {
        setNotifications(fresh)
        writeStorage(STORAGE_KEY, fresh)
      })
      .catch(() => {
        // Sin conexión: se conserva lo último cacheado en localStorage.
      })
  }, [user])

  async function markAsRead(id) {
    const { notification } = await api.patch(`/notifications/${id}/read`)
    setNotifications((prev) => {
      const next = prev.map((n) => (n.id === id ? notification : n))
      writeStorage(STORAGE_KEY, next)
      return next
    })
  }

  async function markAllAsRead() {
    const { notifications: updated } = await api.patch('/notifications/read-all')
    setNotifications(updated)
    writeStorage(STORAGE_KEY, updated)
  }

  return (
    <NotificationsContext.Provider value={{ notifications, markAsRead, markAllAsRead }}>
      {children}
    </NotificationsContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationsContext)
  if (!context) {
    throw new Error('useNotifications debe usarse dentro de un NotificationsProvider')
  }
  return context
}
