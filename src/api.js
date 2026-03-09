const OPENAI_URL = 'https://api.openai.com/v1/chat/completions'

export async function submitPrompt(prompt) {
  const key = import.meta.env.VITE_OPENAI_API_KEY
  if (!key || key.trim() === '') {
    throw new Error(
      'Missing API key. Create a .env file with VITE_OPENAI_API_KEY=your_openai_key'
    )
  }

  const res = await fetch(OPENAI_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1024,
    }),
  })

  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    const msg = data.error?.message || res.statusText || `Request failed (${res.status})`
    throw new Error(msg)
  }

  const data = await res.json()
  const content = data.choices?.[0]?.message?.content
  if (content == null) {
    throw new Error('Invalid response from API')
  }
  return content.trim()
}
