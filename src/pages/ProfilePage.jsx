import { useAuth } from '../context/AuthContext'
import { useFontSize } from '../context/FontSizeContext'
import Badge from '../atoms/Badge'
import Button from '../atoms/Button'
import './ProfilePage.css'

function ProfilePage() {
  const { user, logout } = useAuth()
  const { scale, increaseFontSize, decreaseFontSize, resetFontSize } = useFontSize()

  if (!user) return null

  return (
    <div className="profile-page">
      <div className="profile-page__avatar">{user.avatarInitials}</div>
      <h2>{user.name}</h2>
      <p className="profile-page__age">{user.age} años</p>

      <section className="profile-page__section" aria-labelledby="conditions-heading">
        <h3 id="conditions-heading">Condiciones de salud</h3>
        <div className="profile-page__badges">
          {user.conditions.length > 0 ? (
            user.conditions.map((condition) => (
              <Badge key={condition} tone="info">
                {condition}
              </Badge>
            ))
          ) : (
            <p className="profile-page__empty">Sin condiciones registradas.</p>
          )}
        </div>
      </section>

      <section className="profile-page__section" aria-labelledby="accessibility-heading">
        <h3 id="accessibility-heading">Necesidades de accesibilidad</h3>
        <div className="profile-page__badges">
          {user.accessibility.length > 0 ? (
            user.accessibility.map((need) => (
              <Badge key={need} tone="warning">
                {need}
              </Badge>
            ))
          ) : (
            <p className="profile-page__empty">Sin necesidades registradas.</p>
          )}
        </div>
      </section>

      <section className="profile-page__section" aria-labelledby="fontsize-heading">
        <h3 id="fontsize-heading">Tamaño de letra</h3>
        <div className="profile-page__fontsize-controls">
          <Button variant="secondary" onClick={decreaseFontSize} ariaLabel="Reducir tamaño de letra">A-</Button>
          <span>{Math.round(scale * 100)}%</span>
          <Button variant="secondary" onClick={increaseFontSize} ariaLabel="Aumentar tamaño de letra">A+</Button>
        </div>
        <Button variant="ghost" fullWidth onClick={resetFontSize}>Restablecer tamaño</Button>
      </section>

      <Button variant="danger" fullWidth onClick={logout}>
        Cerrar sesión
      </Button>
    </div>
  )
}

export default ProfilePage