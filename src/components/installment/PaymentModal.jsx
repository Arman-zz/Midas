import { useEffect, useState } from 'react'
import Modal from '../common/Modal'
import { getCurrentBangladeshGoldPrice } from '../../services/goldPriceService'

function localDate() {
  const now = new Date()
  return new Date(now.getTime() - now.getTimezoneOffset() * 60_000).toISOString().slice(0, 10)
}

export default function PaymentModal({
  open,
  onClose,
  customer,
  product,
  defaultAmount,
  defaultGoldRate,
  defaultInvoiceId = '',
  invoiceReadOnly = false,
  onSubmit,
}) {
  const [rate, setRate] = useState(null)
  const [rateMeta, setRateMeta] = useState(null)
  const [rateError, setRateError] = useState('')

  useEffect(() => {
    if (!open) return undefined
    const controller = new AbortController()
    setRate(null)
    setRateError('')
    getCurrentBangladeshGoldPrice({ signal: controller.signal })
      .then((result) => {
        setRate(result.goldRate)
        setRateMeta(result)
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setRateError(error.message)
      })
    return () => controller.abort()
  }, [open])

  const submit = (event) => {
    event.preventDefault()
    if (!rate) return
    const form = new FormData(event.currentTarget)
    const amount = Number(form.get('amount'))
    onSubmit({
      invoiceId: form.get('invoiceId').trim(),
      amount,
      goldRate: rate,
      goldAmount: amount / rate,
      goldRateSource: rateMeta.source,
      goldRateUpdatedAt: rateMeta.updatedAt.toISOString(),
      date: form.get('date'),
      customer,
      product,
    })
  }

  return (
    <Modal open={open} onClose={onClose}>
      <form className="modal-form" onSubmit={submit}>
        <h2>Record customer payment</h2>
        <p>
          Record the payment received from <b>{customer}</b> for {product}.
        </p>
        <div className="field-row">
          <label className="field-label" htmlFor="payment-invoice-id">
            Invoice ID
          </label>
          <input
            className="field mono"
            id="payment-invoice-id"
            name="invoiceId"
            defaultValue={defaultInvoiceId}
            readOnly={invoiceReadOnly}
            placeholder="e.g. INV-2026-0042"
            autoComplete="off"
            required
          />
          <small className="field-help">Use the invoice number from your shop receipt.</small>
        </div>
        <div className="field-row">
          <label className="field-label" htmlFor="payment-gold-rate">
            Applied gold rate (BDT per gram)
          </label>
          <input
            className="field"
            id="payment-gold-rate"
            name="goldRate"
            type="number"
            min="1"
            step="0.01"
            value={rate ? rate.toFixed(2) : ''}
            placeholder="Loading live rate…"
            readOnly
          />
          <small className="field-help">
            {rateMeta
              ? `Live 22K market rate from ${rateMeta.source}. It will be stored with this approval.`
              : rateError || `Fetching live rate (fallback reference: ${defaultGoldRate})…`}
          </small>
        </div>
        <div className="field-row">
          <label className="field-label" htmlFor="payment-amount">
            Amount paid
          </label>
          <input
            className="field"
            id="payment-amount"
            name="amount"
            type="number"
            min="1"
            defaultValue={defaultAmount}
            required
          />
        </div>
        <div className="field-row">
          <label className="field-label" htmlFor="payment-date">
            Payment date
          </label>
          <input
            className="field"
            id="payment-date"
            name="date"
            type="date"
            max={localDate()}
            defaultValue={localDate()}
            required
          />
        </div>
        <button className="btn btn-gold btn-block" disabled={!rate}>
          {rate ? 'Approve payment & convert to gold' : 'Waiting for live gold rate…'}
        </button>
      </form>
    </Modal>
  )
}
