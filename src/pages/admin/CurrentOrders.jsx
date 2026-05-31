import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { fetchAdminOrders } from "../../services/adminService";

export default function CurrentOrders() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchAdminOrders(token).then(setOrders).catch(() => {});
  }, [token]);

  return (
    <div>
      <header className="page-header" style={{ color: "#fff" }}>
        <h1>All Orders</h1>
        <p style={{ color: "#999" }}>Live data from PostgreSQL</p>
      </header>
      <div className="admin-panel-grid">
        {orders.map((order) => (
          <div key={order.id} className="admin-luxury-card">
            <strong>{order.id}</strong>
            <p style={{ color: "#bbb", margin: "8px 0" }}>
              {order.vehicle} · {order.service}
            </p>
            <p style={{ color: "#888", fontSize: "0.85rem" }}>{order.center}</p>
            <span className="ai-tag">{order.status}</span>
          </div>
        ))}
        {!orders.length && <p style={{ color: "#888" }}>No orders yet. Customer bookings will sync here.</p>}
      </div>
    </div>
  );
}
