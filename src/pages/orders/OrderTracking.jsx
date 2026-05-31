import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import OrderTimeline from "../../components/OrderTimeline";
import PageHeader from "../../components/PageHeader";
import { useAuth } from "../../context/AuthProvider";
import { useCustomer } from "../../context/CustomerProvider";
import { fetchOrder, fetchPartVerifications, respondToPartApi } from "../../services/orderService";

export default function OrderTracking() {
  const { orderId } = useParams();
  const { token } = useAuth();
  const { orders, trackingSteps, syncFromApi } = useCustomer();
  const [order, setOrder] = useState(orders.find((o) => o.id === orderId) || null);
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [responding, setResponding] = useState(false);

  useEffect(() => {
    if (!token || !orderId) return;
    setLoading(true);
    setError("");
    Promise.all([fetchOrder(token, orderId), fetchPartVerifications(token, orderId)])
      .then(([{ order: o }, partList]) => {
        setOrder(o);
        setParts(partList);
      })
      .catch((err) => setError(err.message || "Could not load order"))
      .finally(() => setLoading(false));
  }, [token, orderId]);

  const respond = async (partId, approved) => {
    setResponding(true);
    setError("");
    try {
      await respondToPartApi(token, partId, { approved, note: approved ? "Approved" : "Need review" });
      await syncFromApi();
      const [{ order: o }, partList] = await Promise.all([
        fetchOrder(token, orderId),
        fetchPartVerifications(token, orderId),
      ]);
      setOrder(o);
      setParts(partList);
    } catch (err) {
      setError(err.message || "Could not submit response");
    } finally {
      setResponding(false);
    }
  };

  if (loading) return <Loader label="Loading live tracking…" />;

  if (error && !order) {
    return (
      <div>
        <PageHeader title="Tracking" subtitle={orderId} />
        <p className="auth-error">{error}</p>
        <Link to="/app/orders" className="glass-btn" style={{ width: "auto", display: "inline-block" }}>
          Back to orders
        </Link>
      </div>
    );
  }

  const activeStep = order?.trackingStep ?? 0;

  return (
    <div>
      <PageHeader
        eyebrow="Live Tracking"
        title={order?.id || orderId}
        subtitle={`${order?.vehicle || "Service"} · ETA ${order?.eta || "—"}`}
        action={
          <Link to="/app/orders" className="tab-btn">
            All Orders
          </Link>
        }
      />

      {error && <p className="auth-error">{error}</p>}

      <div className="tracking-layout">
        <div className="map-sim">
          <div className="eta-banner">ETA · {order?.eta || "Calculating…"}</div>
          <div className="map-dot partner" title="Pickup partner" />
          <div className="map-dot center" title="Service center" />
          <p className="map-caption">
            {order?.status} · {order?.center || "Service center"}
          </p>
        </div>

        <div>
          <OrderTimeline steps={trackingSteps} activeIndex={activeStep} />
          <div className="luxury-card" style={{ marginTop: 20 }}>
            <h4>{order?.status}</h4>
            <p className="muted">Pickup fee ₹{order?.pickupFee || 200} paid</p>
            <p className="muted">{order?.pendingAmount || "Balance pending inspection"}</p>
          </div>

          {parts.length > 0 && (
            <div className="dash-panel" style={{ marginTop: 20 }}>
              <h3>Part Verification</h3>
              <p className="muted">Compare old vs new parts before approving repair cost.</p>
              {parts.map((p) => (
                <div key={p.id} className="part-verify-card">
                  <strong>{p.partName}</strong>
                  <p className="muted">Est. ₹{Number(p.estimatedCost || 0).toLocaleString("en-IN")}</p>
                  <div className="part-images">
                    {p.oldPartImageUrl && <img src={p.oldPartImageUrl} alt="Old part" />}
                    {p.newPartImageUrl && <img src={p.newPartImageUrl} alt="New part" />}
                  </div>
                  {p.customerApproved == null ? (
                    <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                      <button
                        type="button"
                        className="glass-btn"
                        style={{ width: "auto" }}
                        disabled={responding}
                        onClick={() => respond(p.id, true)}
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        className="tab-btn"
                        disabled={responding}
                        onClick={() => respond(p.id, false)}
                      >
                        Request Changes
                      </button>
                    </div>
                  ) : (
                    <p className="muted">{p.customerApproved ? "✓ Approved" : "Changes requested"}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
