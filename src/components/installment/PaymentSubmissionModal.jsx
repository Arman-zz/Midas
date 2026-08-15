import { useState } from 'react'
import Modal from '../common/Modal'
import { midasApi } from '../../services/midasApi'

export default function PaymentSubmissionModal({ open, onClose, plan, onSubmitted }) {
  const [invoiceId, setInvoiceId] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const close = () => {
    setInvoiceId('')
    setError('')
    onClose()
  }

  const submit = async (event) => {
    event.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await midasApi.submitPaymentRecord(plan.id, invoiceId.trim())
      await onSubmitted?.()
      close()
    } catch (submitError) {
      setError(submitError.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal open={open} onClose={close}>
      <form className="modal-form" onSubmit={submit}>
        <h2>Apply for a payment record</h2>
        <p>
          Submit the invoice issued by <b>{plan?.shop}</b>. Your gold progress changes only after
          the shop verifies and approves it.
        </p>
        <div className="field-row">
          <label className="field-label" htmlFor="customer-payment-invoice">
            Invoice ID
          </label>
          <input
            className="field mono"
            id="customer-payment-invoice"
            value={invoiceId}
            onChange={(event) => setInvoiceId(event.target.value)}
            minLength="3"
            maxLength="80"
            placeholder="e.g. INV-2026-0042"
            autoComplete="off"
            autoFocus
            required
          />
          <small className="field-help">
            Enter the exact invoice number printed on your receipt.
          </small>
        </div>
        {error && (
          <div className="field-error" role="alert">
            {error}
          </div>
        )}
        <button
          className="btn btn-gold btn-block"
          disabled={submitting || invoiceId.trim().length < 3}
        >
          {submitting ? 'Submitting…' : 'Send to shop for approval'}
        </button>
      </form>
    </Modal>
  )
}
