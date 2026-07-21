import { useId } from 'react'
import './Input.css'

function Select({ label, value, onChange, options, placeholder, required = false, ...rest }) {
  const generatedId = useId()
  const selectId = rest.id || generatedId

  return (
    <div className="field">
      <label htmlFor={selectId} className="field__label">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      <select
        id={selectId}
        value={value}
        onChange={onChange}
        required={required}
        className="field__input"
        {...rest}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select
