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
  const [filter, setFilter] = useState('all')
  const [listings, setListings] = useState(c2cListings)
  const [createOpen, setCreateOpen] = useState(false)
  const [listingType, setListingType] = useState('jewelry')
  const [photoPreview, setPhotoPreview] = useState('')
  const [error, setError] = useState('')
  const { user } = useAuth()
  const notify = useToast()
  const visibleListings = listings.filter(
    (listing) => filter === 'all' || listing.listingType === filter,
  )

  const closeCreate = () => {
    setCreateOpen(false)
    setListingType('jewelry')
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
    const isJewelry = listingType === 'jewelry'
    const photo = form.get('photo')
    if (isJewelry && (!photo || !photo.size)) {
      return setError('Add a clear photo of the jewelry before publishing.')
    }

    try {
      const weight = Number(form.get('weight'))
      const listing = {
        id: `c2c-${Date.now()}`,
        listingType,
        title: isJewelry ? form.get('title').trim() : `${weight} g Confirmed Gold`,
        price: Number(form.get('price')),
        seller: user?.name || 'MIDAS Member',
        area: localStorage.getItem('midas-customer-area') || 'Dhaka',
        ...(isJewelry ? { image: await readImage(photo) } : { weight, purity: form.get('purity') }),
      }
      setListings((current) => [listing, ...current])
      setFilter('all')
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
        Gold-by-weight listings represent gold recorded in a member's confirmed MIDAS balance. MIDAS
        does not receive payment or guarantee C2C transactions.
      </div>
      <div className="filter-scroll c2c-filters" role="group" aria-label="Filter C2C listings">
        <button
          className={`filter-chip ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Listings
        </button>
        <button
          className={`filter-chip ${filter === 'jewelry' ? 'active' : ''}`}
          onClick={() => setFilter('jewelry')}
        >
          Jewelry
        </button>
        <button
          className={`filter-chip ${filter === 'gold-weight' ? 'active' : ''}`}
          onClick={() => setFilter('gold-weight')}
        >
          Gold by Weight
        </button>
      </div>
      <ListingGrid listings={visibleListings} />
      <Modal open={createOpen} onClose={closeCreate}>
        <form className="modal-form c2c-create-form" onSubmit={createListing}>
          <h2>Create a C2C listing</h2>
          <p>Choose what you are selling and provide the listing details.</p>

          <div className="tabbar field-row" role="group" aria-label="Listing type">
            <button
              type="button"
              className={listingType === 'jewelry' ? 'active' : ''}
              onClick={() => {
                setListingType('jewelry')
                setError('')
              }}
            >
              Jewelry
            </button>
            <button
              type="button"
              className={listingType === 'gold-weight' ? 'active' : ''}
              onClick={() => {
                setListingType('gold-weight')
                setError('')
              }}
            >
              Gold by Weight
            </button>
          </div>

          {listingType === 'jewelry' ? (
            <>
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
            </>
          ) : (
            <div className="field-grid">
              <div className="field-row">
                <label className="field-label" htmlFor="listing-weight">
                  Gold amount (grams)
                </label>
                <input
                  className="field"
                  id="listing-weight"
                  name="weight"
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="2.50"
                  required
                />
              </div>
              <div className="field-row">
                <label className="field-label" htmlFor="listing-purity">
                  Purity
                </label>
                <select className="field" id="listing-purity" name="purity" defaultValue="22K">
                  <option>24K</option>
                  <option>22K</option>
                  <option>21K</option>
                  <option>18K</option>
                </select>
              </div>
            </div>
          )}

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
