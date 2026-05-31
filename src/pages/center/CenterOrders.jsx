import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import { useAuth } from "../../context/AuthProvider";
import { advanceCenterOrder, fetchCenterOrders } from "../../services/centerService";

export default function CenterOrders() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    fetchCenterOrders(token)
      .then((data) => setOrders(data.orders || []))
      .finally(() => setLoading(false));
  };

  useEffect(load, [token]);

  const advance = async (orderId) => {
    await advanceCenterOrder(token, orderId);
    load();
  };

  return (
    <div>
      <PageHeader eyebrow="Center Admin" title="Current Orders" subtitle="Manage active repairs & pickups" />

      {loading && <p className="muted">Loading…</p>}

      {orders.map((order) => (
        <div key={order.id} className="order-card">
          <div>
            <strong>{order.id}</strong>
            <p className="muted">{order.vehicle} · {order.service}</p>
            <span className="health-badge">{order.status}</span>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button type="button" className="tab-btn active" onClick={() => advance(order.id)}>
              Advance Status
            </button>
            <Link to={`/center/orders/${order.id}/parts`} className="tab-btn">
              Part Verification
            </Link>
          </div>
        </div>
      ))}

      {!loading && !orders.length && (
        <p className="muted">No orders assigned to your center yet. Customer bookings will appear here.</p>
      )}
    </div>
  );
}
