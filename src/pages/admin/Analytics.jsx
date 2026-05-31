import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { fetchAdminOrders, fetchAdminStats } from "../../services/adminService";
import Loader from "../../components/Loader";

export default function Analytics() {
  const { token } = useAuth();
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchAdminStats(token), fetchAdminOrders(token)])
      .then(([s, o]) => {
        setStats(s.stats);
        setOrders(o);
      })
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <Loader label="Loading analytics…" />;

  const delivered = stats?.deliveredOrders || 0;
  const active = stats?.activeOrders || 0;
  const revenue = stats?.revenue || 0;

  return (
    <div>
      <header className="page-header" style={{ color: "#fff" }}>
        <h1>Analytics</h1>
        <p style={{ color: "#999" }}>Platform metrics from live order data</p>
      </header>

      <div className="admin-stats">
        <div className="admin-stat"><span style={{ color: "#999" }}>Active pipeline</span><h2>{active}</h2></div>
        <div className="admin-stat"><span style={{ color: "#999" }}>Delivered</span><h2>{delivered}</h2></div>
        <div className="admin-stat"><span style={{ color: "#999" }}>Pickup revenue</span><h2>₹{revenue.toLocaleString("en-IN")}</h2></div>
        <div className="admin-stat"><span style={{ color: "#999" }}>Total orders</span><h2>{orders.length}</h2></div>
      </div>

      <div className="admin-luxury-card" style={{ marginTop: 24 }}>
        <h3>Order volume</h3>
        <p style={{ color: "#888" }}>
          {orders.length
            ? `${orders.length} bookings in system · ${Math.round((delivered / Math.max(orders.length, 1)) * 100)}% completion rate`
            : "Bookings will appear as customers complete checkout."}
        </p>
      </div>
    </div>
  );
}
