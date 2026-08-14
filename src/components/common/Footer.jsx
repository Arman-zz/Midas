import { Icon } from '../../utils/icons'
export default function Footer() {
  return (
    <footer className="pub-footer">
      <div className="foot-top">
        <div className="footer-about">
          <a className="u-flex u-gap-10 brand-home-link" href="#/public/landing">
            <Icon name="diamond" />
            <span>MIDAS</span>
          </a>
          <p>
            A location aware marketplace connecting customers with approved partner jewelry shops.
            MIDAS records agreements and progress. It never receives, holds, or moves customer
            money.
          </p>
        </div>
        <div className="foot-cols">
          <div className="foot-col">
            <h4>Platform</h4>
            <a href="#/public/marketplace">Marketplace</a>
            <a href="#/public/partner">Become a Partner</a>
            <a href="#/public/how-it-works">How it works</a>
          </div>
          <div className="foot-col">
            <h4>Support</h4>
            <a href="#/public/help">Payment Help</a>
            <a href="#/public/help">FAQ</a>
          </div>
          <div className="foot-col">
            <h4>Company</h4>
            <a href="#/public/about">About Us</a>
            <a href="#/public/legal">Legal &amp; policies</a>
            <a href="#/public/legal">Terms</a>
          </div>
        </div>
      </div>
      <div className="foot-bottom">
        <span>© 2026 MIDAS. Bangladesh · v3.1</span>
        <span>
          MIDAS is noncustodial. Payments are completed directly between customers and partner
          shops.
        </span>
      </div>
    </footer>
  )
}
