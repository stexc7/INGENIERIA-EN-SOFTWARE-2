import { useNotifications } from '../context/NotificationsContext'
import Icon from '../atoms/Icon'
import Button from '../atoms/Button'
import { formatDate } from '../utils/dataHelpers'
import './NotificationsPage.css'

function NotificationsPage() {
  const { notifications, markAsRead, markAllAsRead } = useNotifications()

  const sorted = [...notifications].sort((a, b) => b.date.localeCompare(a.date))
  const hasUnread = sorted.some((n) => !n.read)

  return (
    <div className="notifications-page">
      <h2 className="visually-hidden">Notificaciones</h2>
      {hasUnread && (
        <Button variant="ghost" fullWidth onClick={() => markAllAsRead()}>
          Marcar todas como leídas
        </Button>
      )}
      {sorted.length > 0 ? (
        <ul className="notifications-page__list">
          {sorted.map((notification) => (
            <li key={notification.id}>
              <button
                type="button"
                className={`notification-item${notification.read ? '' : ' notification-item--unread'}`}
                onClick={() => markAsRead(notification.id)}
              >
                <span className="notification-item__icon">
                  <Icon name="bell" size={20} />
                </span>
                <span className="notification-item__body">
                  <span className="notification-item__title">
                    {notification.title}
                    {!notification.read && (
                      <span className="notification-item__dot" aria-label="No leída" />
                    )}
                  </span>
                  <span className="notification-item__message">{notification.message}</span>
                  <span className="notification-item__date">{formatDate(notification.date)}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="notifications-page__empty">No tienes notificaciones por ahora.</p>
      )}
    </div>
  )
}

export default NotificationsPage
