import { Link } from "react-router-dom";
import { ORDER_HISTORY } from "../../data/orders";

export default function History() {
  return (
    <div>
      <header className="page-header">
        <h1>Order History</h1>
        <p>Past services · bills · favorite centers</p>
      </header>

      <Link to="/app/orders" className="tab-btn" style={{ display: "inline-block", marginBottom: 20 }}>
        ← Current Orders
      </Link>

      {ORDER_HISTORY.map((order) => (
        <div key={order.id} className="order-card">
          <div>
            <strong>{order.id}</strong>
            <p style={{ margin: "6px 0 0", color: "var(--text-muted)" }}>{order.date}</p>
            <p style={{ margin: "4px 0 0" }}>
              {order.vehicle} · {order.service}
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ margin: 0, fontWeight: 700 }}>{order.amount}</p>
            {order.invoice && (
              <button type="button" className="tab-btn" style={{ marginTop: 8 }}>
                Invoice
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
