export function getVerifiedShops(shops) { return shops.filter((shop) => shop.verified) }
export function getShopById(shops, id) { return shops.find((shop) => shop.id === id) || null }
