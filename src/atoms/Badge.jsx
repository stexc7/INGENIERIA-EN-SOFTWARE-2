import './Badge.css'

const TONE_CLASS = {
  info: 'badge badge--info',
  success: 'badge badge--success',
  warning: 'badge badge--warning',
  danger: 'badge badge--danger',
}

function Badge({ children, tone = 'info' }) {
  return <span className={TONE_CLASS[tone] || TONE_CLASS.info}>{children}</span>
}

export default Badge
