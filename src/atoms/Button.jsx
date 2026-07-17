import './Button.css'

const VARIANT_CLASS = {
  primary: 'btn btn--primary',
  secondary: 'btn btn--secondary',
  danger: 'btn btn--danger',
  ghost: 'btn btn--ghost',
}

function Button({
  children,
  variant = 'primary',
  type = 'button',
  fullWidth = false,
  disabled = false,
  onClick,
  ariaLabel,
  ...rest
}) {
  const className = [VARIANT_CLASS[variant] || VARIANT_CLASS.primary, fullWidth ? 'btn--full' : '']
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type={type}
      className={className}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
