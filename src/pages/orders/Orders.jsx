import { Link } from "react-router-dom";
import EmptyState from "../../components/EmptyState";
import Loader from "../../components/Loader";
import PageHeader from "../../components/PageHeader";
import { useCustomer } from "../../context/CustomerProvider";

export default function Orders() {
  const { orders, syncing, syncError } = useCustomer();

  return (
    <div>
      <PageHeader eyebrow="Bookings" title="My Orders" subtitle="Live tracking · invoices · inspection reports" />

      {syncError && <p className="auth-error">{syncError}</p>}
      {syncing && orders.length === 0 && <Loader label="Syncing orders…" />}

      <div className="tab-row">
        <span className="tab-btn active">Current</span>
        <Link to="/app/orders/history" className="tab-btn">History</Link>
      </div>

      {orders.map((order) => (
        <div key={order.id} className="order-card">
          <div>
            <strong>{order.id}</strong>
            <p className="muted">{order.vehicle || order.service} · {order.service}</p>
            <p style={{ fontSize: "0.85rem" }}>{order.center}</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <span className="health-badge">{order.status}</span>
            <p style={{ margin: "8px 0 0" }}>ETA {order.eta || "—"}</p>
            <p style={{ margin: 0, fontWeight: 700 }}>
              {order.amount || `₹${order.pickupFee || 200} paid`}
            </p>
            <Link
              to={`/app/orders/${order.id}/track`}
              className="tab-btn active"
              style={{ marginTop: 10, display: "inline-block" }}
            >
              Track Live
            </Link>
          </div>
        </div>
      ))}

      {!syncing && !orders.length && (
        <EmptyState
          title="No active orders"
          message="Book a car, bike, or electronics service to get started."
          action={
            <Link to="/app/cars" className="glass-btn" style={{ width: "auto", display: "inline-block", marginTop: 12 }}>
              Browse services
            </Link>
          }
        />
      )}
    </div>
  );
}
