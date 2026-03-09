export function PromptForm({ prompt, onPromptChange, onSubmit, disabled }) {
  return (
    <form className="prompt-form" onSubmit={onSubmit}>
      <label htmlFor="prompt-input" className="sr-only">
        Enter your prompt
      </label>
      <textarea
        id="prompt-input"
        className="prompt-input"
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        placeholder="Type your prompt here..."
        rows={3}
        disabled={disabled}
        autoFocus
      />
      <button type="submit" className="submit-btn" disabled={disabled || !prompt.trim()}>
        Submit
      </button>
    </form>
  )
}
