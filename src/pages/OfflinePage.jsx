import Icon from '../atoms/Icon'
import Button from '../atoms/Button'
import './OfflinePage.css'

function OfflinePage() {
  return (
    <main id="main-content" className="offline-page">
      <span className="offline-page__icon">
        <Icon name="wifi-off" size={40} />
      </span>
      <h1>Sin conexión a internet</h1>
      <p>
        No pudimos cargar esta pantalla porque no tienes conexión y aún no se había
        guardado en este dispositivo. Revisa tu conexión Wi-Fi o datos móviles e
        inténtalo de nuevo.
      </p>
      <Button onClick={() => window.location.reload()}>Reintentar</Button>
    </main>
  )
}

export default OfflinePage
