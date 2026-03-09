export function ClearButton({ onClick, disabled }) {
  return (
    <button
      type="button"
      className="clear-btn"
      onClick={onClick}
      disabled={disabled}
      aria-label="Clear history and current response"
    >
      Clear
    </button>
  )
}
