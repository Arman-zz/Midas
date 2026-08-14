import { useState } from 'react'
import ListingGrid from '../../components/c2c/ListingGrid'
import Modal from '../../components/common/Modal'
import { c2cListings } from '../../data/appData'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../context/ToastContext'

function readImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(new Error('Could not read the selected photo'))
    reader.readAsDataURL(file)
  })
}

export default function C2C() {
  const [listings, setListings] = useState(c2cListings)
  const [createOpen, setCreateOpen] = useState(false)
  const [photoPreview, setPhotoPreview] = useState('')
  const [error, setError] = useState('')
  const { user } = useAuth()
  const notify = useToast()

  const closeCreate = () => {
    setCreateOpen(false)
    setPhotoPreview('')
    setError('')
  }

  const previewPhoto = async (event) => {
    const file = event.target.files[0]
    if (!file) return setPhotoPreview('')
    if (file.size > 5 * 1024 * 1024) {
      event.target.value = ''
      setPhotoPreview('')
      return setError('Photo must be smaller than 5 MB.')
    }
    setError('')
    setPhotoPreview(await readImage(file))
  }

  const createListing = async (event) => {
    event.preventDefault()
    setError('')
    const form = new FormData(event.currentTarget)
    const photo = form.get('photo')
    if (!photo || !photo.size) {
      return setError('Add a clear photo of the jewelry before publishing.')
    }

    try {
      const listing = {
        id: `c2c-${Date.now()}`,
        listingType: 'jewelry',
        title: form.get('title').trim(),
        price: Number(form.get('price')),
        seller: user?.name || 'MIDAS Member',
        area: localStorage.getItem('midas-customer-area') || 'Dhaka',
        image: await readImage(photo),
      }
      setListings((current) => [listing, ...current])
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
              name="photo"
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={previewPhoto}
              required
            />
            <small className="field-help">JPG, PNG or WebP · maximum 5 MB</small>
            {photoPreview && (
              <img className="c2c-photo-preview" src={photoPreview} alt="Listing preview" />
            )}
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
