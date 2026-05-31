import { Link } from "react-router-dom";
import { CURRENT_ORDERS } from "../../data/orders";

export default function Orders() {
  return (
    <div>
      <header className="page-header">
        <h1>Orders</h1>
        <p>Current bookings · invoices · AI reports</p>
      </header>

      <div className="tab-row">
        <span className="tab-btn active">Current</span>
        <Link to="/app/orders/history" className="tab-btn">
          History
        </Link>
      </div>

      {CURRENT_ORDERS.map((order) => (
        <div key={order.id} className="order-card">
          <div>
            <strong>{order.id}</strong>
            <p style={{ margin: "6px 0 0", color: "var(--text-secondary)" }}>
              {order.vehicle} · {order.service}
            </p>
            <p style={{ margin: "4px 0 0", fontSize: "0.85rem" }}>{order.center}</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <span className="health-badge">{order.status}</span>
            <p style={{ margin: "8px 0 0" }}>ETA {order.eta}</p>
            <p style={{ margin: 0, fontWeight: 700 }}>{order.amount}</p>
          </div>
        </div>
      ))}

      <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Link to="/app/cars/tracking" className="glass-btn" style={{ width: "auto", padding: "12px 24px" }}>
          Track Live
        </Link>
        <button type="button" className="tab-btn">
          Download Invoice
        </button>
        <button type="button" className="tab-btn">
          Reorder Service
        </button>
      </div>
    </div>
  );
}
