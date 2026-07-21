import { Outlet } from 'react-router-dom'
import Header from './Header'
import BottomNavigation from './BottomNavigation'
import OfflineBanner from '../molecules/OfflineBanner'
import { useAuth } from '../context/AuthContext'
import { useNotifications } from '../context/NotificationsContext'
import { getUnreadNotificationsCount } from '../utils/dataHelpers'
import './AppLayout.css'

function AppLayout() {
  const { user } = useAuth()
  const { notifications } = useNotifications()
  const unreadCount = getUnreadNotificationsCount(notifications, user?.id)

  return (
    <div className="app-layout">
      <Header user={user} unreadCount={unreadCount} />
      <OfflineBanner />
      <main id="main-content" className="app-layout__content">
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  )
}

export default AppLayout
