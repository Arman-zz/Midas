import { useCallback, useState } from 'react'
export function useToast(delay = 2600) {
  const [message, setMessage] = useState('')
  const showToast = useCallback((nextMessage) => {
    setMessage(nextMessage)
    window.setTimeout(() => setMessage(''), delay)
  }, [delay])
  return { message, showToast, visible: Boolean(message) }
}
