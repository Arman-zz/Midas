export function filterProducts(products, { query = '', category = 'All' } = {}) {
  const needle = query.trim().toLowerCase()
  return products.filter((product) => {
    const matchesCategory = category === 'All' || product.category === category
    const matchesQuery = !needle || `${product.name} ${product.shop} ${product.purity}`.toLowerCase().includes(needle)
    return matchesCategory && matchesQuery
  })
}
export function getProductById(products, id) { return products.find((product) => product.id === id) || null }
