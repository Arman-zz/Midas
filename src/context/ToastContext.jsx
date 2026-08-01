import { createContext, useCallback, useContext, useRef, useState } from 'react'

const ToastContext=createContext(()=>{})
export function ToastProvider({children}){
  const [message,setMessage]=useState(''); const timer=useRef()
  const notify=useCallback(text=>{ setMessage(text); clearTimeout(timer.current); timer.current=setTimeout(()=>setMessage(''),2600) },[])
  return <ToastContext.Provider value={notify}>{children}<div id="toast" className={`toast ${message?'show':''}`} role="status" aria-live="polite">{message}</div></ToastContext.Provider>
}
export const useToast=()=>useContext(ToastContext)
