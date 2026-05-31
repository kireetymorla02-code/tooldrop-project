import { CURRENT_ORDERS } from "../../data/orders";

export default function CurrentOrders() {
  return (
    <div className="admin-panel-grid">
      {CURRENT_ORDERS.map((order) => (
        <div key={order.id} className="admin-luxury-card">
          <strong>{order.id}</strong>
          <p style={{ color: "#bbb", margin: "8px 0" }}>
            {order.vehicle} · {order.service}
          </p>
          <span className="ai-tag">{order.status}</span>
          <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
            <button type="button" className="tab-btn active" style={{ fontSize: "0.75rem" }}>
              Update Status
            </button>
            <button type="button" className="tab-btn" style={{ fontSize: "0.75rem" }}>
              Assign Mechanic
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
