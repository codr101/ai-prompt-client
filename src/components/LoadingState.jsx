export function LoadingState() {
  return (
    <div className="loading-state" role="status" aria-live="polite">
      <span className="spinner" aria-hidden />
      <span>Getting response...</span>
    </div>
  )
}
