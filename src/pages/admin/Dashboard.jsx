import StatisticCard from '../../components/cards/StatisticCard'
import { formatBDT } from '../../data/appData'
export default function Dashboard() {
  return (
    <>
      <div className="grid g-4">
        <StatisticCard label="Customers" value="5,248" detail="128 joined this month" />
        <StatisticCard label="Partner Shops" value="126" detail="5 awaiting review" />
        <StatisticCard
          label="Active Agreements"
          value="1,842"
          detail="Gold progress is being recorded"
        />
        <StatisticCard
          label="Commission Due"
          value={formatBDT(485000)}
          detail="Recorded across partner shops"
        />
      </div>
      <div className="grid g-2 dashboard-bottom">
        <article className="card card-pad">
          <h3>Marketplace health</h3>
          <div className="activity-list">
            <div>
              <span>Published products</span>
              <b>1,436</b>
            </div>
            <div>
              <span>Payment confirmations pending</span>
              <b>42</b>
            </div>
            <div>
              <span>Open disputes</span>
              <b>8</b>
            </div>
          </div>
        </article>
        <article className="card card-pad">
          <h3>Platform principle</h3>
          <p>
            MIDAS records marketplace activity and agreement progress. It never holds customer
            funds.
          </p>
        </article>
      </div>
    </>
  )
}
