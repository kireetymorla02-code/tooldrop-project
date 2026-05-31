import { Link } from "react-router-dom";
import EmptyState from "../../components/EmptyState";
import Loader from "../../components/Loader";
import PageHeader from "../../components/PageHeader";
import { useCustomer } from "../../context/CustomerProvider";

export default function History() {
  const { orderHistory, syncing } = useCustomer();

  return (
    <div>
      <PageHeader eyebrow="Archive" title="Order History" subtitle="Completed services & invoices" />

      <div className="tab-row">
        <Link to="/app/orders" className="tab-btn">Current</Link>
        <span className="tab-btn active">History</span>
      </div>

      {syncing && !orderHistory.length && <Loader label="Loading history…" />}

      {orderHistory.map((order) => (
        <div key={order.id} className="order-card">
          <div>
            <strong>{order.id}</strong>
            <p className="muted">{order.vehicle} · {order.service}</p>
            <p className="muted">{order.status}</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontWeight: 700 }}>{order.amount || "Completed"}</p>
            <Link to={`/app/orders/${order.id}/track`} className="tab-btn" style={{ marginTop: 8, display: "inline-block" }}>
              View details
            </Link>
          </div>
        </div>
      ))}

      {!syncing && !orderHistory.length && (
        <EmptyState title="No completed orders yet" message="Your delivered services will appear here." />
      )}
    </div>
  );
}
