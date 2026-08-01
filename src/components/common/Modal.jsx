import { createPortal } from 'react-dom'
export default function Modal({ open, children, onClose }) {
  if (!open) return null
  return createPortal(
    <div className="modal-overlay" onMouseDown={onClose}>
      <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        {children}
        <button className="modal-x" aria-label="Close" onClick={onClose}>
          ×
        </button>
      </div>
    </div>,
    document.body,
  )
}
