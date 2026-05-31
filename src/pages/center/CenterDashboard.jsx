import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { fetchCenterDashboard } from "../../services/centerService";

export default function CenterDashboard() {
  const { token } = useAuth();
  const [data, setData] = useState({ stats: { active: 0, waiting: 0, completed: 0 }, orders: [] });

  useEffect(() => {
    fetchCenterDashboard(token).then(setData).catch(() => {});
  }, [token]);

  const { stats, orders } = data;

  return (
    <div>
      <header className="page-header">
        <h1>Service Center</h1>
        <p>ToolDrop Premium Hub · live operations</p>
      </header>

      <div className="admin-stats">
        <div className="admin-stat"><span className="muted">Active</span><h2>{stats.active}</h2></div>
        <div className="admin-stat"><span className="muted">Awaiting Approval</span><h2>{stats.waiting}</h2></div>
        <div className="admin-stat"><span className="muted">Completed</span><h2>{stats.completed}</h2></div>
      </div>

      <div className="admin-panel-grid">
        <Link to="/center/orders" className="admin-luxury-card">
          <h3>Current Orders</h3>
          <p style={{ color: "#aaa" }}>Advance status · assign mechanics</p>
        </Link>
        <Link to="/center/orders" className="admin-luxury-card">
          <h3>Part Verification</h3>
          <p style={{ color: "#aaa" }}>Upload old vs new part photos</p>
        </Link>
        <div className="admin-luxury-card">
          <h3>Pickup Requests</h3>
          <p style={{ color: "#aaa" }}>{orders.filter((o) => o.trackingStep <= 3).length} pending pickups</p>
        </div>
      </div>

      <section className="dash-panel" style={{ marginTop: 24 }}>
        <h3>Recent Orders</h3>
        {orders.slice(0, 5).map((o) => (
          <div key={o.id} className="order-card compact">
            <strong>{o.id}</strong>
            <span className="health-badge">{o.status}</span>
          </div>
        ))}
      </section>
    </div>
  );
}
