import { useState } from 'react'
import { shops } from '../../data/appData'
import { useToast } from '../../context/ToastContext'
import { useAuth } from '../../hooks/useAuth'

function storedProfile() {
  try {
    return JSON.parse(localStorage.getItem('midas-shop-profile') || 'null')
  } catch {
    return null
  }
}

export default function Profile() {
  const { user } = useAuth()
  const saved = storedProfile()
  const verified = user?.verified === true || user?.email?.toLowerCase() === 'shop@midas.bd'
  const [data, setData] = useState(() => ({
    name: shops[0].name,
    ownerName: 'Shop Owner',
    area: shops[0].area,
    phone: '+880 1700-000000',
    email: user?.email || 'shop@midas.bd',
    tradeLicense: '',
    taxId: '',
    hours: '10:00 AM – 8:00 PM',
    description: 'Trusted gold and jewelry retailer serving customers in Dhaka.',
    ...saved,
  }))
  const [documents, setDocuments] = useState(() => saved?.documents || {})
  const [status, setStatus] = useState(() =>
    verified ? 'verified' : saved?.verificationStatus || 'not-submitted',
  )
  const notify = useToast()

  const update = (field) => (event) =>
    setData((current) => ({ ...current, [field]: event.target.value }))
  const saveProfile = (event) => {
    event.preventDefault()
    localStorage.setItem(
      'midas-shop-profile',
      JSON.stringify({ ...data, documents, verificationStatus: status }),
    )
    notify('Shop profile saved')
  }
  const selectDocument = (field) => (event) => {
    const file = event.target.files[0]
    setDocuments((current) => ({ ...current, [field]: file?.name || '' }))
  }
  const submitVerification = (event) => {
    event.preventDefault()
    const complete =
      data.tradeLicense.trim() && data.taxId.trim() && Object.keys(documents).length === 3
    if (!complete) return notify('Complete all business fields and upload all three documents')
    setStatus('pending')
    localStorage.setItem(
      'midas-shop-profile',
      JSON.stringify({ ...data, documents, verificationStatus: 'pending' }),
    )
    notify('Verification application submitted for MIDAS review')
  }

  return (
    <div className="shop-profile-page">
      <section className={`shop-verification-banner ${status}`}>
        <div className="shop-verification-icon" aria-hidden="true">
          {status === 'verified' ? '✓' : status === 'pending' ? '◷' : '!'}
        </div>
        <div>
          <span className="shop-dashboard-kicker">Partner eligibility</span>
          <h2>
            {status === 'verified'
              ? 'Verified MIDAS Partner'
              : status === 'pending'
                ? 'Verification under review'
                : 'Verification required'}
          </h2>
          <p>
            {status === 'verified'
              ? 'Your business identity is approved. Partner tools and marketplace publishing are enabled.'
              : status === 'pending'
                ? 'MIDAS is reviewing your business documents. Partner tools remain locked until approval.'
                : 'Only verified jewelry businesses can become MIDAS partners and access shop operations.'}
          </p>
        </div>
        <div className="shop-verification-actions">
          <span className={`badge ${status === 'verified' ? 'badge-green' : 'badge-warn'}`}>
            {status === 'verified'
              ? 'Verified'
              : status === 'pending'
                ? 'Pending review'
                : 'Not verified'}
          </span>
          {!verified && (
            <button
              className="btn btn-gold btn-sm"
              type="button"
              onClick={() =>
                document.getElementById('verification-application')?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                })
              }
            >
              {status === 'pending' ? 'View application' : 'Get verified'}
            </button>
          )}
        </div>
      </section>

      <div className="shop-profile-layout practical-shop-profile">
        <form className="card" onSubmit={saveProfile}>
          <div className="card-head">
            <div>
              <div className="card-title">Business profile</div>
              <div className="card-sub">Information customers see after your shop is verified</div>
            </div>
          </div>
          <div className="card-pad">
            <div className="field-grid">
              <div className="field-row">
                <label className="field-label" htmlFor="shop-name">
                  Registered shop name
                </label>
                <input
                  className="field"
                  id="shop-name"
                  value={data.name}
                  onChange={update('name')}
                  required
                />
              </div>
              <div className="field-row">
                <label className="field-label" htmlFor="owner-name">
                  Owner or authorized person
                </label>
                <input
                  className="field"
                  id="owner-name"
                  value={data.ownerName}
                  onChange={update('ownerName')}
                  required
                />
              </div>
              <div className="field-row">
                <label className="field-label" htmlFor="shop-phone">
                  Business phone
                </label>
                <input
                  className="field"
                  id="shop-phone"
                  value={data.phone}
                  onChange={update('phone')}
                  required
                />
              </div>
              <div className="field-row">
                <label className="field-label" htmlFor="shop-email">
                  Business email
                </label>
                <input
                  className="field"
                  id="shop-email"
                  type="email"
                  value={data.email}
                  onChange={update('email')}
                  required
                />
              </div>
              <div className="field-row">
                <label className="field-label" htmlFor="trade-license">
                  Trade license number
                </label>
                <input
                  className="field mono"
                  id="trade-license"
                  value={data.tradeLicense}
                  onChange={update('tradeLicense')}
                  placeholder="Enter license number"
                  required
                />
              </div>
              <div className="field-row">
                <label className="field-label" htmlFor="tax-id">
                  BIN / TIN
                </label>
                <input
                  className="field mono"
                  id="tax-id"
                  value={data.taxId}
                  onChange={update('taxId')}
                  placeholder="Enter BIN or TIN"
                  required
                />
              </div>
            </div>
            <div className="field-row">
              <label className="field-label" htmlFor="shop-address">
                Full business address
              </label>
              <textarea
                className="field"
                id="shop-address"
                rows="3"
                value={data.area}
                onChange={update('area')}
                required
              />
            </div>
            <div className="field-row">
              <label className="field-label" htmlFor="shop-hours">
                Opening hours
              </label>
              <input
                className="field"
                id="shop-hours"
                value={data.hours}
                onChange={update('hours')}
                required
              />
            </div>
            <div className="field-row">
              <label className="field-label" htmlFor="shop-description">
                Customer-facing description
              </label>
              <textarea
                className="field"
                id="shop-description"
                rows="4"
                value={data.description}
                onChange={update('description')}
                maxLength="300"
                required
              />
              <small className="field-help">{data.description.length}/300 characters</small>
            </div>
            <button className="btn btn-gold">Save business profile</button>
          </div>
        </form>

        <aside className="shop-profile-side practical-verification-side">
          <form className="card" id="verification-application" onSubmit={submitVerification}>
            <div className="card-head">
              <div>
                <div className="card-title">Verification documents</div>
                <div className="card-sub">Required before partner access is granted</div>
              </div>
            </div>
            <div className="card-pad verification-upload-list">
              {[
                ['tradeLicenseFile', 'Trade license'],
                ['taxFile', 'BIN / TIN certificate'],
                ['identityFile', 'Owner identity document'],
              ].map(([field, label]) => (
                <label className="verification-upload" key={field}>
                  <span>
                    <b>{label}</b>
                    <small>{documents[field] || 'PDF, JPG or PNG'}</small>
                  </span>
                  <input
                    type="file"
                    accept=".pdf,image/png,image/jpeg"
                    onChange={selectDocument(field)}
                    disabled={verified}
                  />
                  <span
                    className={`badge ${documents[field] || verified ? 'badge-green' : 'badge-muted'}`}
                  >
                    {documents[field] || verified ? 'Added' : 'Required'}
                  </span>
                </label>
              ))}
              {!verified && (
                <button className="btn btn-dark btn-block" disabled={status === 'pending'}>
                  {status === 'pending' ? 'Application under review' : 'Submit for verification'}
                </button>
              )}
            </div>
          </form>

          <article className="card card-pad partner-access-card">
            <h3>Partner access</h3>
            <ul>
              <li className={verified ? 'complete' : ''}>Publish marketplace products</li>
              <li className={verified ? 'complete' : ''}>Accept customer purchase requests</li>
              <li className={verified ? 'complete' : ''}>Record installment payments</li>
              <li className={verified ? 'complete' : ''}>Access commissions and AI insights</li>
            </ul>
            {!verified && (
              <small>These tools unlock only after MIDAS approves your application.</small>
            )}
          </article>
        </aside>
      </div>
    </div>
  )
}
