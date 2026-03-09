export function ErrorMessage({ message, onDismiss }) {
  return (
    <div className="error-message" role="alert">
      <span>{message}</span>
      <button type="button" className="dismiss-btn" onClick={onDismiss} aria-label="Dismiss">
        ×
      </button>
    </div>
  )
}
