export function ChatEntry({ entry }) {
  const date = new Date(entry.at)
  const time = date.toLocaleString(undefined, {
    dateStyle: 'short',
    timeStyle: 'short',
  })
  return (
    <li className="chat-entry">
      <div className="chat-entry-meta">{time}</div>
      <div className="chat-entry-prompt">{entry.prompt}</div>
      <div className="chat-entry-response">{entry.response}</div>
    </li>
  )
}
