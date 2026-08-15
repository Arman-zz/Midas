import Modal from '../common/Modal'
import { formatCurrency } from '../../utils/format'
import { useToast } from '../../context/ToastContext'
import { useAuth } from '../../hooks/useAuth'
import { midasApi } from '../../services/midasApi'
import { usePlans } from '../../hooks/usePlans'
export default function ProductModal({ product, onClose }) {
  const notify = useToast()
  const { user } = useAuth()
  const { plans, reload } = usePlans()
  const activePlan = plans.find((plan) => plan.status === 'Active')
  const pendingPlan = plans.find((plan) => plan.status === 'Pending')
  return (
    <Modal open={!!product} onClose={onClose}>
      {product && (
        <div className="modal-product">
          <img className="product-photo" src={product.image} alt={product.name} />
          <div className="modal-product-body">
            <span className="badge badge-gold">{product.purity}</span>
            <h2>{product.name}</h2>
            <p className="product-shop">{product.shop}</p>
            <div className="grid g-2">
              <div>
                <span className="stat-label">Weight</span>
                <b>{product.weight}</b>
              </div>
              <div>
                <span className="stat-label">Price</span>
                <b>{formatCurrency(product.price)}</b>
              </div>
            </div>
            <div className="notice">
              Payments are made directly to the shop. MIDAS only records the agreement.
            </div>
            <button
              className="btn btn-gold btn-block"
              disabled={Boolean(activePlan || pendingPlan)}
              onClick={async () => {
                try {
                  if (!user) {
                    location.hash = '#/login'
                    return
                  }
                  if (user.role !== 'customer')
                    throw new Error('Only customer accounts can request plans')
                  await midasApi.requestPlan(product.id)
                  await reload()
                  notify('Installment request sent to the shop for approval')
                  onClose()
                } catch (error) {
                  notify(error.message)
                }
              }}
            >
              {activePlan
                ? 'Active plan already in progress'
                : pendingPlan
                  ? 'Request awaiting shop approval'
                  : 'Request Installment Plan'}
            </button>
          </div>
        </div>
      )}
    </Modal>
  )
}
