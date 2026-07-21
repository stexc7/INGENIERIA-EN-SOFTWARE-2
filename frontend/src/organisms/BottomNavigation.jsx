import { NavLink } from 'react-router-dom'
import Icon from '../atoms/Icon'
import './BottomNavigation.css'

const ITEMS = [
  { to: '/inicio', label: 'Inicio', icon: 'home' },
  { to: '/citas', label: 'Citas', icon: 'calendar' },
  { to: '/recetas', label: 'Recetas', icon: 'pill' },
  { to: '/notificaciones', label: 'Avisos', icon: 'bell' },
  { to: '/perfil', label: 'Perfil', icon: 'user' },
]

function BottomNavigation() {
  return (
    <nav className="bottom-nav" aria-label="Navegación principal">
      {ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => `bottom-nav__item${isActive ? ' bottom-nav__item--active' : ''}`}
        >
          <Icon name={item.icon} size={24} />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}

export default BottomNavigation
