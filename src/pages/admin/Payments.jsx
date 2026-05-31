import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { fetchAdminPayments } from "../../services/adminService";

export default function Payments() {
  const { token } = useAuth();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchAdminPayments(token).then(setPayments).catch(() => {});
  }, [token]);

  return (
    <div>
      <header className="page-header" style={{ color: "#fff" }}>
        <h1>Payments</h1>
        <p style={{ color: "#999" }}>Pickup fees & settlements · PostgreSQL</p>
      </header>
      <div className="admin-panel-grid">
        {payments.map((p) => (
          <div key={p.payment_id} className="admin-luxury-card">
            <strong>{p.order_id}</strong>
            <p style={{ color: "#bbb", margin: "8px 0" }}>{p.customer_name}</p>
            <p style={{ fontSize: "1.2rem", margin: "8px 0" }}>₹{Number(p.amount).toLocaleString("en-IN")}</p>
            <span className="ai-tag">{p.method} · {p.status}</span>
          </div>
        ))}
        {!payments.length && <p style={{ color: "#888" }}>No payments recorded yet.</p>}
      </div>
    </div>
  );
}
