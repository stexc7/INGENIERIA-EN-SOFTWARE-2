import { useId } from 'react'
import './Input.css'

function Input({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  hint,
  required = false,
  autoComplete,
  ...rest
}) {
  const generatedId = useId()
  const inputId = rest.id || generatedId
  const hintId = hint ? `${inputId}-hint` : undefined
  const errorId = error ? `${inputId}-error` : undefined

  return (
    <div className="field">
      <label htmlFor={inputId} className="field__label">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        aria-required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undefined}
        className={`field__input${error ? ' field__input--error' : ''}`}
        {...rest}
      />
      {hint && !error && (
        <p id={hintId} className="field__hint">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="field__error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export default Input
