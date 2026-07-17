import Icon from '../atoms/Icon'
import { useOnlineStatus } from '../hooks/useOnlineStatus'
import './OfflineBanner.css'

function OfflineBanner() {
  const isOnline = useOnlineStatus()

  if (isOnline) return null

  return (
    <div className="offline-banner" role="status">
      <Icon name="wifi-off" size={18} />
      <span>Sin conexión — mostrando la última información guardada</span>
    </div>
  )
}

export default OfflineBanner
