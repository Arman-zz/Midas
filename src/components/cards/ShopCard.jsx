export default function ShopCard({ shop }) {
  return <article className="card card-pad"><strong>{shop.name}</strong><p>{shop.area}</p><span>{shop.rating} ★</span></article>
}
