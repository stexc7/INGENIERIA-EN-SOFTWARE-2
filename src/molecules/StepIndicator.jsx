import './StepIndicator.css'

function StepIndicator({ steps, currentStep }) {
  return (
    <ol className="step-indicator" aria-label={`Paso ${currentStep} de ${steps.length}`}>
      {steps.map((label, index) => {
        const stepNumber = index + 1
        const isCurrent = stepNumber === currentStep
        const isDone = stepNumber < currentStep
        return (
          <li
            key={label}
            className={`step-indicator__item${isCurrent ? ' step-indicator__item--current' : ''}${
              isDone ? ' step-indicator__item--done' : ''
            }`}
            aria-current={isCurrent ? 'step' : undefined}
          >
            <span className="step-indicator__badge">{isDone ? '✓' : stepNumber}</span>
            <span className="step-indicator__label">{label}</span>
          </li>
        )
      })}
    </ol>
  )
}

export default StepIndicator
