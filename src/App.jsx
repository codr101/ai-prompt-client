import { useState, useEffect, useCallback } from 'react'
import { submitPrompt } from './api'
import { ChatEntry, PromptForm, ClearButton, ErrorMessage, LoadingState } from './components'
import './App.css'

const HISTORY_KEY = 'ai-prompt-client-history'

function loadHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    if (!raw) return []
    return JSON.parse(raw)
  } catch {
    return []
  }
}

function saveHistory(history) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
  } catch (_) {}
}

export default function App() {
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [history, setHistory] = useState([])

  useEffect(() => {
    setHistory(loadHistory())
  }, [])

  const handleSubmit = useCallback(async (e) => {
    e?.preventDefault()
    const value = prompt.trim()
    if (!value || loading) return

    setError(null)
    setResponse(null)
    setLoading(true)

    try {
      const result = await submitPrompt(value)
      setResponse(result)
      const entry = { prompt: value, response: result, at: new Date().toISOString() }
      setHistory((prev) => {
        const next = [entry, ...prev].slice(0, 50)
        saveHistory(next)
        return next
      })
    } catch (err) {
      setError(err.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }, [prompt, loading])

  const handleClear = useCallback(() => {
    setPrompt('')
    setResponse(null)
    setError(null)
    setHistory([])
    saveHistory([])
  }, [])

  return (
    <div className="app">
      <header className="app-header">
        <h1>AI Prompt Client</h1>
        <p className="subtitle">Enter a prompt and get a response from the AI.</p>
      </header>

      <PromptForm
        prompt={prompt}
        onPromptChange={setPrompt}
        onSubmit={handleSubmit}
        disabled={loading}
      />

      <div className="actions">
        <ClearButton onClick={handleClear} disabled={loading} />
      </div>

      {loading && <LoadingState />}
      {error && <ErrorMessage message={error} onDismiss={() => setError(null)} />}
      {response && !loading && (
        <section className="result" aria-live="polite">
          <h2>Response</h2>
          <div className="result-content">{response}</div>
        </section>
      )}

      {history.length > 0 && (
        <section className="history" aria-label="Chat history">
          <h2>Past prompts & responses</h2>
          <ul className="history-list">
            {history.map((entry, i) => (
              <ChatEntry key={entry.at + i} entry={entry} />
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
