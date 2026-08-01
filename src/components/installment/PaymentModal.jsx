import Modal from '../common/Modal'
export default function PaymentModal({ open, onClose, children }) {
  return (
    <Modal open={open} onClose={onClose}>
      {children}
    </Modal>
  )
}
