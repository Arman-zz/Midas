import test from 'node:test'
import assert from 'node:assert/strict'
import { filterProducts, getProductById } from '../src/services/productService.js'

const products = [
  { id: 1, name: 'Gold Ring', shop: 'Aurelia', purity: '22K', category: 'Rings' },
  { id: 2, name: 'Gold Chain', shop: 'Midas', purity: '21K', category: 'Chains' },
]

test('marketplace filters combine search and category', () => {
  assert.deepEqual(filterProducts(products, { query: 'aurelia', category: 'Rings' }), [products[0]])
  assert.deepEqual(filterProducts(products, { query: '22k' }), [products[0]])
  assert.deepEqual(filterProducts(products, { category: 'Chains' }), [products[1]])
})

test('product lookup returns null for an unknown product', () => {
  assert.equal(getProductById(products, 2), products[1])
  assert.equal(getProductById(products, 99), null)
})
