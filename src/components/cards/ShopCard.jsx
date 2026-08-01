export default function ShopCard({ shop }) {
  const map=`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${shop.name}, ${shop.area}`)}`
  return <article className="shop-card"><div className="shop-thumb"><img src={shop.image} alt={`${shop.name} shop`} referrerPolicy="no-referrer"/></div><div className="shop-name">{shop.name}</div><div className="shop-meta"><span>⌖ {shop.area}</span><span>★ {shop.rating} ({shop.reviews})</span>{shop.distance!=null&&<span>{shop.distance.toFixed(1)} km away</span>}</div><a className="btn btn-outline btn-block btn-sm" href={map}>View Shop</a></article>
}
