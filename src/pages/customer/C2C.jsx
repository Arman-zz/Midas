import { useState } from 'react'
import ListingGrid from '../../components/c2c/ListingGrid'
import Modal from '../../components/common/Modal'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../context/ToastContext'
import { useApiResource } from '../../hooks/useApiResource'
import { midasApi } from '../../services/midasApi'

export default function C2C() {
  const { data, loading, error: loadError, reload } = useApiResource(midasApi.listings, [])
  const listings = data || []
  const [createOpen, setCreateOpen] = useState(false)
  const [error, setError] = useState('')
  const { user } = useAuth()
  const notify = useToast()

  const closeCreate = () => {
    setCreateOpen(false)
    setError('')
  }

  const createListing = async (event) => {
    event.preventDefault()
    setError('')
    const form = new FormData(event.currentTarget)
    try {
      await midasApi.addListing({
        title: form.get('title').trim(),
        price: Number(form.get('price')),
        area: user?.area || 'Dhaka',
        image: form.get('image'),
      })
      await reload()
      closeCreate()
      notify('Your C2C listing is now visible')
    } catch (submitError) {
      setError(submitError.message)
    }
  }

  return (
    <>
      <div className="section-h">
        <div>
          <h2>C2C Listings</h2>
          <p className="lead">
            Member listings are direct transactions. Inspect items and meet safely.
          </p>
        </div>
        <button className="btn btn-gold" onClick={() => setCreateOpen(true)}>
          Create listing
        </button>
      </div>
      <div className="notice">
        C2C listings are for jewelry resale only. MIDAS does not receive payment or guarantee C2C
        transactions.
      </div>
      <ListingGrid listings={listings} />
      {loading && <div className="shop-filter-empty">Loading listings…</div>}
      {loadError && (
        <div className="notice" role="alert">
          {loadError}
        </div>
      )}
      <Modal open={createOpen} onClose={closeCreate}>
        <form className="modal-form c2c-create-form" onSubmit={createListing}>
          <h2>Create a C2C listing</h2>
          <p>Provide the jewelry details and a clear photo.</p>
          <div className="field-row">
            <label className="field-label" htmlFor="listing-title">
              Jewelry title
            </label>
            <input
              className="field"
              id="listing-title"
              name="title"
              placeholder="e.g. 22K gold necklace"
              required
            />
          </div>
          <div className="field-row">
            <label className="field-label" htmlFor="listing-photo">
              Jewelry photo
            </label>
            <input
              className="field"
              id="listing-photo"
              name="image"
              type="url"
              placeholder="https://…"
              required
            />
            <small className="field-help">Use a permanent HTTPS image URL.</small>
          </div>

          <div className="field-row">
            <label className="field-label" htmlFor="listing-price">
              Asking price (BDT)
            </label>
            <input
              className="field"
              id="listing-price"
              name="price"
              type="number"
              min="1"
              placeholder="Enter amount"
              required
            />
          </div>
          {error && <div className="field-error c2c-create-error">{error}</div>}
          <button className="btn btn-gold btn-block" type="submit">
            Publish listing
          </button>
        </form>
      </Modal>
    </>
  )
}
