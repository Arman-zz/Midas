import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { getChatReply } from '../../services/chatService'

const welcome = {
  id: 'welcome',
  role: 'assistant',
  text: 'Hi! I’m the MIDAS Assistant. Ask me about jewelry, installment plans, payments, or gold progress.',
}

const suggestions = [
  'How do installments work?',
  'How is gold progress calculated?',
  'Where do I pay?',
]

export default function Chatbot() {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([welcome])
  const [loading, setLoading] = useState(false)
  const endRef = useRef(null)
  const controllerRef = useRef(null)

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading, open])

  useEffect(() => () => controllerRef.current?.abort(), [])

  const send = async (value) => {
    const text = value.trim()
    if (!text || loading) return
    const userMessage = { id: `user-${Date.now()}`, role: 'user', text }
    const nextMessages = [...messages, userMessage]
    setMessages(nextMessages)
    setLoading(true)
    controllerRef.current = new AbortController()
    try {
      const reply = await getChatReply({
        message: text,
        messages: nextMessages,
        role: user?.role || 'public',
        signal: controllerRef.current.signal,
      })
      setMessages((current) => [
        ...current,
        { id: `assistant-${Date.now()}`, role: 'assistant', text: reply },
      ])
    } catch (error) {
      if (error.name !== 'AbortError') {
        setMessages((current) => [
          ...current,
          {
            id: `error-${Date.now()}`,
            role: 'assistant',
            text: 'I could not answer that just now. Please try again.',
          },
        ])
      }
    } finally {
      setLoading(false)
    }
  }

  const submit = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const input = new FormData(form).get('message')
    form.reset()
    send(input)
  }

  return (
    <div className="chatbot" data-language-switch>
      {open && (
        <section className="chatbot-panel" aria-label="MIDAS Assistant">
          <header className="chatbot-head">
            <span className="chatbot-mark">◇</span>
            <span>
              <b>MIDAS Assistant</b>
              <small>
                <i /> Online
              </small>
            </span>
            <button type="button" aria-label="Close assistant" onClick={() => setOpen(false)}>
              ×
            </button>
          </header>
          <div className="chatbot-messages" aria-live="polite">
            {messages.map((message) => (
              <div className={`chatbot-message ${message.role}`} key={message.id}>
                {message.text}
              </div>
            ))}
            {messages.length === 1 && (
              <div className="chatbot-suggestions">
                {suggestions.map((suggestion) => (
                  <button type="button" key={suggestion} onClick={() => send(suggestion)}>
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
            {loading && (
              <div className="chatbot-message assistant chatbot-typing">
                <span />
                <span />
                <span />
              </div>
            )}
            <div ref={endRef} />
          </div>
          <form className="chatbot-form" onSubmit={submit}>
            <input
              name="message"
              aria-label="Message MIDAS Assistant"
              placeholder="Ask MIDAS anything…"
              autoComplete="off"
              disabled={loading}
            />
            <button type="submit" aria-label="Send message" disabled={loading}>
              ➤
            </button>
          </form>
          <small className="chatbot-disclaimer">
            Information only · MIDAS never handles payments
          </small>
        </section>
      )}
      <button
        className="chatbot-trigger"
        type="button"
        aria-label={open ? 'Close MIDAS Assistant' : 'Open MIDAS Assistant'}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? (
          '×'
        ) : (
          <>
            <span>◇</span>
            <i />
          </>
        )}
      </button>
    </div>
  )
}
