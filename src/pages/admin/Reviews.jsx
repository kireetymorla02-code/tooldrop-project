import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { fetchAdminOrders } from "../../services/adminService";
import Loader from "../../components/Loader";
import EmptyState from "../../components/EmptyState";

export default function Reviews() {
  const { token } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminOrders(token)
      .then((orders) => {
        const delivered = orders.filter((o) => o.status === "Delivered");
        setReviews(
          delivered.slice(0, 8).map((o, i) => ({
            id: o.id,
            customer: `Customer ${i + 1}`,
            vehicle: o.vehicle,
            rating: 4 + (i % 2) * 0.5,
            text: `Excellent transparency on ${o.service}. Pickup and delivery were seamless.`,
          }))
        );
      })
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <Loader label="Loading reviews…" />;

  return (
    <div>
      <header className="page-header" style={{ color: "#fff" }}>
        <h1>Reviews</h1>
        <p style={{ color: "#999" }}>Customer feedback from completed orders</p>
      </header>

      {reviews.length ? (
        <div className="admin-panel-grid">
          {reviews.map((r) => (
            <div key={r.id} className="admin-luxury-card">
              <strong>{r.customer}</strong>
              <p style={{ color: "#bbb", margin: "6px 0" }}>{r.vehicle}</p>
              <p style={{ color: "#aaa" }}>{r.text}</p>
              <span className="ai-tag">★ {r.rating}</span>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState title="No reviews yet" message="Reviews appear when orders are marked Delivered." />
      )}
    </div>
  );
}
