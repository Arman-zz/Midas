import { useEffect, useState } from 'react'
import { planEventName } from '../services/planService'

export function usePlans() {
  const [, refresh] = useState(0)
  useEffect(() => {
    const update = () => refresh((value) => value + 1)
    window.addEventListener(planEventName, update)
    window.addEventListener('midas:payments-updated', update)
    window.addEventListener('storage', update)
    return () => {
      window.removeEventListener(planEventName, update)
      window.removeEventListener('midas:payments-updated', update)
      window.removeEventListener('storage', update)
    }
  }, [])
}
