import PublicPage from '../../components/common/PublicPage'
export default function Legal() {
  return (
    <PublicPage
      eyebrow="Legal & policies"
      title="Terms built around clear responsibility"
      intro="These principles explain how MIDAS records marketplace activity."
    >
      <div className="legal-copy">
        <h2>Non-custodial marketplace policy</h2>
        <p>
          MIDAS does not receive, hold, transfer, guarantee, or refund customer payments or gold.
        </p>
        <h2>Partner and product policy</h2>
        <p>
          Marketplace jewelry must be uploaded by a recognized partner shop. Shops are responsible
          for accurate photos, weight, purity, price, and availability.
        </p>
        <h2>Record integrity</h2>
        <p>
          A customer submission is not proof of receipt. Gold credit is applied only after shop
          confirmation.
        </p>
        <h2>Privacy policy</h2>
        <p>
          Account, location, product, and transaction information is used only to operate and secure
          the marketplace.
        </p>
        <h2>Terms of use</h2>
        <p>
          Users must provide accurate information, protect their account access, obey applicable
          law, and independently verify products.
        </p>
      </div>
    </PublicPage>
  )
}
