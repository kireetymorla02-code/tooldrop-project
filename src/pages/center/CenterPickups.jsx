import { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import { useAuth } from "../../context/AuthProvider";
import { advanceCenterOrder, fetchCenterOrders } from "../../services/centerService";

export default function CenterPickups() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);

  const load = () => {
    fetchCenterOrders(token).then((data) => {
      const pickups = (data.orders || []).filter((o) => (o.trackingStep ?? 0) <= 3);
      setOrders(pickups);
    });
  };

  useEffect(load, [token]);

  return (
    <div>
      <PageHeader eyebrow="Logistics" title="Pickup Requests" subtitle="Doorstep collection queue" />

      {orders.map((order) => (
        <div key={order.id} className="order-card">
          <div>
            <strong>{order.id}</strong>
            <p className="muted">{order.vehicle} · {order.pickup?.slot || order.status}</p>
            <p>{order.pickup?.address || "Address on file"}</p>
          </div>
          <button type="button" className="tab-btn active" onClick={() => advanceCenterOrder(token, order.id).then(load)}>
            Mark collected
          </button>
        </div>
      ))}

      {!orders.length && <p className="muted">No pending pickups right now.</p>}
    </div>
  );
}
