export function filterProducts(products, { query = '', category = 'All' } = {}) {
  const needle = query.trim().toLowerCase()
  return products.filter(
    (product) =>
      (category === 'All' || product.category === category) &&
      (!needle ||
        `${product.name} ${product.shop} ${product.purity}`.toLowerCase().includes(needle)),
  )
}
export function getProductById(products, id) {
  return products.find((product) => product.id === id) || null
}
