import Modal from '../common/Modal'

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
  onSubmit,
}) {
  const submit = (event) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const amount = Number(form.get('amount'))
    const goldRate = Number(form.get('goldRate'))
    onSubmit({
      invoiceId: form.get('invoiceId').trim(),
      amount,
      goldRate,
      goldAmount: amount / goldRate,
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
            defaultValue={defaultGoldRate}
            required
          />
          <small className="field-help">
            The converted gold amount is calculated from payment ÷ gold rate.
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
        <button className="btn btn-gold btn-block">Save payment record</button>
      </form>
    </Modal>
  )
}
