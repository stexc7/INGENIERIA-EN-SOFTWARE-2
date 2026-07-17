import { Link } from 'react-router-dom'
import Icon from '../atoms/Icon'
import './Header.css'

function Header({ user, unreadCount = 0 }) {
  return (
    <header className="app-header">
      <div>
        <p className="app-header__eyebrow">Hola,</p>
        <h1 className="app-header__name">{user?.name?.split(' ')[0]}</h1>
      </div>
      <div className="app-header__actions">
        <Link
          to="/notificaciones"
          className="app-header__bell"
          aria-label={
            unreadCount > 0
              ? `Notificaciones, ${unreadCount} sin leer`
              : 'Notificaciones'
          }
        >
          <Icon name="bell" size={24} />
          {unreadCount > 0 && <span className="app-header__dot" aria-hidden="true" />}
        </Link>
        <Link to="/perfil" className="app-header__avatar" aria-label="Ir a mi perfil">
          {user?.avatarInitials}
        </Link>
      </div>
    </header>
  )
}

export default Header
