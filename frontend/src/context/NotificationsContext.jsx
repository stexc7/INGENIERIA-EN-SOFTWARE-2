import { createContext, useContext, useEffect, useState } from 'react'
import { mockNotifications } from '../mocks/mockData'
import { readStorage, writeStorage } from '../utils/storage'

const NotificationsContext = createContext(null)
const STORAGE_KEY = 'saludfamiliar.notifications'

export function NotificationsProvider({ children }) {
  const [notifications, setNotifications] = useState(() => readStorage(STORAGE_KEY, mockNotifications))

  useEffect(() => {
    writeStorage(STORAGE_KEY, notifications)
  }, [notifications])

  function markAsRead(id) {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  function markAllAsRead(userId) {
    setNotifications((prev) => prev.map((n) => (n.userId === userId ? { ...n, read: true } : n)))
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
