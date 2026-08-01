import { useState } from 'react'
import { useToast } from '../../context/ToastContext'

const defaults = {
  commissionRate: '2.0',
  minimumInstallment: '1000',
  paymentEditWindow: '24',
  verificationSla: '3',
  documentExpiryWarning: '30',
  maxImageSize: '5',
  goldRateSource: 'shop-invoice',
  uniqueInvoices: true,
  requireGoldConversion: true,
  preserveRateHistory: true,
  moderateProducts: true,
  allowC2C: true,
  verifiedGoldSellersOnly: true,
  verificationAlerts: true,
  integrityAlerts: true,
  commissionAlerts: true,
}

function savedSettings() {
  try {
    return JSON.parse(localStorage.getItem('midas-platform-settings') || '{}')
  } catch {
    return {}
  }
}

export default function Settings() {
  const [data, setData] = useState(() => ({ ...defaults, ...savedSettings() }))
  const [savedAt, setSavedAt] = useState('')
  const notify = useToast()
  const update = (field) => (event) =>
    setData((current) => ({
      ...current,
      [field]: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
    }))
  const submit = (event) => {
    event.preventDefault()
    localStorage.setItem('midas-platform-settings', JSON.stringify(data))
    setSavedAt(new Date().toLocaleTimeString('en-BD', { hour: 'numeric', minute: '2-digit' }))
    notify('Platform settings saved')
  }

  return (
    <form className="platform-settings practical-platform-settings" onSubmit={submit}>
      <div className="platform-settings-header platform-settings-hero">
        <div>
          <span className="shop-dashboard-kicker">Administration controls</span>
          <h2>Platform Settings</h2>
          <p>
            Configure the rules that govern partner access, payment records, and marketplace safety.
          </p>
        </div>
        <div className="u-flex u-gap-10">
          {savedAt && <span className="settings-save-state">Saved at {savedAt}</span>}
          <button className="btn btn-gold">Save changes</button>
        </div>
      </div>

      <div className="platform-policy-banner">
        <span>✓</span>
        <div>
          <b>Verified-partner policy is enforced</b>
          <small>
            Only MIDAS-approved shops can publish products, accept requests, record payments, or
            access partner operations. This mandatory control cannot be disabled.
          </small>
        </div>
        <span className="badge badge-green">Protected</span>
      </div>

      <div className="platform-settings-layout">
        <section className="card settings-section">
          <div className="card-head">
            <div>
              <div className="card-title">Fees and installment rules</div>
              <div className="card-sub">Commercial defaults applied across partner shops</div>
            </div>
          </div>
          <div className="card-pad settings-control-grid">
            <div className="settings-control">
              <label className="field-label" htmlFor="commission-rate">
                Partner commission
              </label>
              <div className="settings-input-suffix">
                <input
                  className="field"
                  id="commission-rate"
                  type="number"
                  min="0"
                  max="20"
                  step="0.1"
                  value={data.commissionRate}
                  onChange={update('commissionRate')}
                  required
                />
                <span>%</span>
              </div>
              <small>Applied to qualifying shop-recorded payment value.</small>
            </div>
            <div className="settings-control">
              <label className="field-label" htmlFor="minimum-installment">
                Minimum installment
              </label>
              <div className="settings-input-prefix">
                <span>BDT</span>
                <input
                  className="field"
                  id="minimum-installment"
                  type="number"
                  min="1"
                  value={data.minimumInstallment}
                  onChange={update('minimumInstallment')}
                  required
                />
              </div>
              <small>Lowest payment amount a partner may configure.</small>
            </div>
            <div className="settings-control">
              <label className="field-label" htmlFor="gold-rate-source">
                Gold conversion source
              </label>
              <select
                className="field"
                id="gold-rate-source"
                value={data.goldRateSource}
                onChange={update('goldRateSource')}
              >
                <option value="shop-invoice">Rate printed on shop invoice</option>
                <option value="market-reference">MIDAS market reference</option>
              </select>
              <small>The selected source must be stored with every payment.</small>
            </div>
            <div className="settings-control">
              <label className="field-label" htmlFor="edit-window">
                Payment edit window
              </label>
              <div className="settings-input-suffix">
                <input
                  className="field"
                  id="edit-window"
                  type="number"
                  min="0"
                  max="168"
                  value={data.paymentEditWindow}
                  onChange={update('paymentEditWindow')}
                  required
                />
                <span>hours</span>
              </div>
              <small>After this period, administrators must correct a record.</small>
            </div>
          </div>
        </section>

        <section className="card settings-section">
          <div className="card-head">
            <div>
              <div className="card-title">Partner verification</div>
              <div className="card-sub">Review timing and document lifecycle</div>
            </div>
          </div>
          <div className="card-pad settings-control-grid">
            <div className="settings-control">
              <label className="field-label" htmlFor="verification-sla">
                Review target
              </label>
              <div className="settings-input-suffix">
                <input
                  className="field"
                  id="verification-sla"
                  type="number"
                  min="1"
                  max="30"
                  value={data.verificationSla}
                  onChange={update('verificationSla')}
                  required
                />
                <span>days</span>
              </div>
              <small>Internal target for deciding a complete application.</small>
            </div>
            <div className="settings-control">
              <label className="field-label" htmlFor="expiry-warning">
                Expiry warning
              </label>
              <div className="settings-input-suffix">
                <input
                  className="field"
                  id="expiry-warning"
                  type="number"
                  min="1"
                  max="180"
                  value={data.documentExpiryWarning}
                  onChange={update('documentExpiryWarning')}
                  required
                />
                <span>days</span>
              </div>
              <small>Notify partners before a business document expires.</small>
            </div>
            <div className="settings-requirements">
              <span className="stat-label">Required verification evidence</span>
              <span>Trade license</span>
              <span>BIN / TIN certificate</span>
              <span>Owner identity document</span>
            </div>
          </div>
        </section>

        <section className="card settings-section">
          <div className="card-head">
            <div>
              <div className="card-title">Payment record integrity</div>
              <div className="card-sub">Mandatory evidence and audit-history controls</div>
            </div>
          </div>
          <div className="card-pad settings-toggle-list">
            <SettingToggle
              checked={data.uniqueInvoices}
              onChange={update('uniqueInvoices')}
              title="Require unique invoice IDs"
              description="Reject an invoice number already used in any customer agreement."
            />
            <SettingToggle
              checked={data.requireGoldConversion}
              onChange={update('requireGoldConversion')}
              title="Require gold rate and converted amount"
              description="Every payment must retain the applied BDT-per-gram rate and credited gold."
            />
            <SettingToggle
              checked={data.preserveRateHistory}
              onChange={update('preserveRateHistory')}
              title="Preserve conversion history"
              description="Keep the original rate even when the market reference changes later."
            />
          </div>
        </section>

        <section className="card settings-section">
          <div className="card-head">
            <div>
              <div className="card-title">Marketplace safety</div>
              <div className="card-sub">Publishing, C2C, and media controls</div>
            </div>
          </div>
          <div className="card-pad settings-toggle-list">
            <SettingToggle
              checked={data.moderateProducts}
              onChange={update('moderateProducts')}
              title="Review newly published products"
              description="Flag new partner listings for administrative moderation."
            />
            <SettingToggle
              checked={data.allowC2C}
              onChange={update('allowC2C')}
              title="Enable C2C marketplace"
              description="Allow members to publish jewelry and eligible gold-by-weight listings."
            />
            <SettingToggle
              checked={data.verifiedGoldSellersOnly}
              onChange={update('verifiedGoldSellersOnly')}
              title="Restrict gold-by-weight listings"
              description="Only members with confirmed MIDAS gold balances may list gold by weight."
            />
            <div className="settings-control settings-inline-control">
              <label className="field-label" htmlFor="image-size">
                Maximum listing image
              </label>
              <div className="settings-input-suffix">
                <input
                  className="field"
                  id="image-size"
                  type="number"
                  min="1"
                  max="20"
                  value={data.maxImageSize}
                  onChange={update('maxImageSize')}
                  required
                />
                <span>MB</span>
              </div>
            </div>
          </div>
        </section>

        <section className="card settings-section settings-wide-section">
          <div className="card-head">
            <div>
              <div className="card-title">Administrator notifications</div>
              <div className="card-sub">
                Choose which operational events appear in the admin queue
              </div>
            </div>
          </div>
          <div className="card-pad settings-notification-grid">
            <SettingToggle
              checked={data.verificationAlerts}
              onChange={update('verificationAlerts')}
              title="Verification applications"
              description="Notify administrators when a shop submits complete documents."
            />
            <SettingToggle
              checked={data.integrityAlerts}
              onChange={update('integrityAlerts')}
              title="Record integrity issues"
              description="Alert when invoices or gold-conversion evidence are incomplete."
            />
            <SettingToggle
              checked={data.commissionAlerts}
              onChange={update('commissionAlerts')}
              title="Commission thresholds"
              description="Notify administrators when recorded commission becomes due."
            />
          </div>
        </section>
      </div>

      <div className="platform-settings-footer">
        <span>Changes affect future platform activity unless stated otherwise.</span>
        <button className="btn btn-gold">Save platform settings</button>
      </div>
    </form>
  )
}

function SettingToggle({ checked, onChange, title, description }) {
  return (
    <label className="setting-toggle practical-setting-toggle">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span>
        <b>{title}</b>
        <small>{description}</small>
      </span>
      <i aria-hidden="true" />
    </label>
  )
}
