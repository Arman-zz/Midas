import ListingGrid from '../../components/c2c/ListingGrid'
import { c2cListings } from '../../data/appData'
export default function C2C(){return <><div className="section-h"><div><h2>C2C Listings</h2><p className="lead">Member listings are direct transactions. Inspect items and meet safely.</p></div><button className="btn btn-gold">Create listing</button></div><div className="notice">MIDAS does not inspect products, receive payment, or guarantee C2C transactions.</div><ListingGrid listings={c2cListings}/></>}
