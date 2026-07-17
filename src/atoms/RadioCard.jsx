import './RadioCard.css'

function RadioCard({ name, value, checked, onChange, label, description }) {
  return (
    <label className={`radio-card${checked ? ' radio-card--checked' : ''}`}>
      <span className="radio-card__content">
        <span className="radio-card__title">{label}</span>
        {description && <span className="radio-card__desc">{description}</span>}
      </span>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="radio-card__input"
      />
    </label>
  )
}

export default RadioCard
