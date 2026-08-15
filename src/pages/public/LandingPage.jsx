import ProductGrid from '../../components/marketplace/ProductGrid'
import { useProducts } from '../../hooks/useProducts'
export default function LandingPage() {
  const { products } = useProducts()
  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <div>
            <h1>
              Gold ownership,
              <br />
              <em>recorded</em>, not held.
            </h1>
            <p>
              MIDAS connects you with partner jewelry shops nearby for direct or installment
              purchases. We track every agreement and payment record, but your money always moves
              directly between you and the shop.
            </p>
            <div className="hero-note">
              ⓘ{' '}
              <span>
                MIDAS does not process, hold, guarantee, or refund money. All payments are made
                directly between customers and partner shops.
              </span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hallmark-ring">
              <div className="hallmark-core">
                <div className="big">22K</div>
                <div className="small">Verified Purity</div>
              </div>
              <div className="orbit-tag" style={{ top: -10, left: -40 }}>
                Gold progress
                <br />
                <b>41.0% secured</b>
              </div>
              <div className="orbit-tag" style={{ bottom: 0, right: -50 }}>
                Partner shops
                <br />
                <b>126 approved</b>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pub-section">
        <h2>One platform, two roles, one ledger.</h2>
        <p className="lead">
          Customers discover and buy. Shop owners accept and confirm. Every action lands in the same
          noncustodial record.
        </p>
        <div className="feature-grid">
          <article className="feature-card">
            <div className="num">For Customers</div>
            <h3>Discover, compare, buy</h3>
            <p>
              Find partner shops near you, compare products and installment terms, and track every
              payment record.
            </p>
          </article>
          <article className="feature-card">
            <div className="num">For Shop Owners</div>
            <h3>Confirm, manage, grow</h3>
            <p>
              Upload your catalog, accept purchase requests, confirm payments, and review commission
              statements.
            </p>
          </article>
        </div>
      </section>
      <section className="pub-section landing-marketplace-dark">
        <div className="landing-section-inner">
          <div className="section-h">
            <div>
              <h2>Explore the marketplace</h2>
              <p className="lead">Jewelry uploaded by MIDAS partner shops.</p>
            </div>
            <a href="#/public/marketplace">View all jewelry →</a>
          </div>
          <ProductGrid products={products.slice(0, 4)} />
        </div>
      </section>
      <section className="pub-section">
        <h2>Every record, honestly labelled.</h2>
        <p className="lead">Submitted isn't the same as Confirmed. We never blur that line.</p>
        <div className="grid g-4">
          {[
            ['Scheduled', 'An installment is due. Nothing has happened yet.'],
            ['Submitted', 'The customer recorded a direct payment.'],
            ['Confirmed', 'The shop verified receipt. Gold progress increases.'],
            ['Disputed', 'Either party flagged a mismatch for review.'],
          ].map(([title, text]) => (
            <article className="card card-pad" key={title}>
              <span className="badge badge-gold">{title}</span>
              <p className="tmeta">{text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
