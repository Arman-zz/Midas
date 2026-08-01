import StatisticCard from '../../components/cards/StatisticCard'
import { confirmations, formatBDT, requests } from '../../data/appData'
export default function Dashboard() {
  return (
    <>
      <div className="grid g-3">
        <StatisticCard
          label="Active Agreements"
          value="48"
          detail="Ongoing customer installment arrangements with confirmed gold progress."
        />
        <StatisticCard
          label="Pending Confirmations"
          value="7"
          detail="Customer payment records waiting for your receipt verification."
        />
        <StatisticCard
          label="Commission Due"
          value={formatBDT(18500)}
          detail="MIDAS platform fees recorded from qualifying transactions; not auto-deducted."
        />
      </div>
      <div className="notice dashboard-workflow">
        Customer selects jewelry → Shop accepts request → Agreement starts → Customer pays shop
        directly → Customer submits payment record → Shop confirms it → Gold progress increases →
        MIDAS records commission
      </div>
      <div className="grid g-2 dashboard-bottom">
        <article className="card">
          <div className="card-head">
            <div>
              <div className="card-title">Payment confirmations</div>
              <div className="card-sub">Verify only payments you received.</div>
            </div>
            <a href="#/shop/confirmations">View all</a>
          </div>
          <div className="card-pad activity-list">
            {confirmations.slice(0, 3).map((row) => (
              <div key={row.agreement}>
                <span>
                  <b>{row.customer}</b>
                  <small>{row.agreement}</small>
                </span>
                <b>{formatBDT(row.amount)}</b>
              </div>
            ))}
          </div>
        </article>
        <article className="card">
          <div className="card-head">
            <div>
              <div className="card-title">Purchase requests</div>
              <div className="card-sub">Requests awaiting shop review.</div>
            </div>
          </div>
          <div className="card-pad activity-list">
            {requests.map((row) => (
              <div key={row.product}>
                <span>
                  <b>{row.customer}</b>
                  <small>{row.product}</small>
                </span>
                <b>{formatBDT(row.amount)}</b>
              </div>
            ))}
          </div>
        </article>
      </div>
    </>
  )
}
