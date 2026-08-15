import { useState } from 'react'
import Modal from '../../components/common/Modal'
import ProductGrid from '../../components/marketplace/ProductGrid'
import { useShopProducts } from '../../hooks/useShopProducts'
import { midasApi } from '../../services/midasApi'
import { useToast } from '../../context/ToastContext'
export default function Products() {
  const { products, reload, error } = useShopProducts()
  const [open, setOpen] = useState(false)
  const notify = useToast()
  const own = products
  const submit = async (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget))
    try {
      await midasApi.addProduct({
        name: data.name,
        category: data.category,
        price: Number(data.price),
        weightGrams: Number(data.weightGrams),
        purity: data.purity,
        image: data.image,
        inStock: data.inStock === 'yes',
      })
      await reload()
      setOpen(false)
      notify('Product added to the marketplace')
    } catch (submitError) {
      notify(submitError.message)
    }
  }
  const toggle = async (product) => {
    try {
      await midasApi.setProductStock(product.id, !product.inStock)
      await reload()
    } catch (toggleError) {
      notify(toggleError.message)
    }
  }
  return (
    <>
      <div className="section-h">
        <div>
          <h2>Marketplace Products</h2>
          <p className="lead">
            Upload products with a mandatory photo and keep stock availability current.
          </p>
        </div>
        <button className="btn btn-gold" onClick={() => setOpen(true)}>
          + Add Product
        </button>
      </div>
      {error && (
        <div className="notice" role="alert">
          {error}
        </div>
      )}
      <ProductGrid products={own} onSelect={toggle} />
      <p className="tmeta">Select a product card's stock button to update its availability.</p>
      <Modal open={open} onClose={() => setOpen(false)}>
        <form className="modal-form" onSubmit={submit}>
          <h2>Add marketplace product</h2>
          <div className="field-row">
            <label className="field-label">Product photo *</label>
            <input className="field" name="image" type="url" placeholder="https://…" required />
            <small>Use a permanent HTTPS image URL from your media storage.</small>
          </div>
          <div className="field-grid">
            <div className="field-row">
              <label className="field-label">Product name</label>
              <input className="field" name="name" required />
            </div>
            <div className="field-row">
              <label className="field-label">Category</label>
              <input className="field" name="category" required />
            </div>
            <div className="field-row">
              <label className="field-label">Price</label>
              <input className="field" name="price" type="number" required />
            </div>
            <div className="field-row">
              <label className="field-label">Weight</label>
              <input
                className="field"
                name="weightGrams"
                type="number"
                min="0.001"
                step="0.001"
                required
              />
            </div>
            <div className="field-row">
              <label className="field-label">Purity</label>
              <select className="field" name="purity">
                <option>22K</option>
                <option>21K</option>
                <option>18K</option>
              </select>
            </div>
            <div className="field-row">
              <label className="field-label">Stock status</label>
              <select className="field" name="inStock">
                <option value="yes">In Stock</option>
                <option value="no">Out of Stock</option>
              </select>
            </div>
          </div>
          <button className="btn btn-gold btn-block">Upload to marketplace</button>
        </form>
      </Modal>
    </>
  )
}
