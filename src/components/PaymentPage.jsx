import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader";
import PageHeader from "./PageHeader";
import { PICKUP_FEE } from "../data/cars";
import { useCustomer } from "../context/CustomerProvider";

const METHODS = ["UPI", "Credit Card", "Wallet", "Net Banking"];

export default function PaymentPage({ type, title, buildPayload }) {
  const params = useParams();
  const navigate = useNavigate();
  const { activeBooking, createOrder } = useCustomer();
  const [method, setMethod] = useState("UPI");
  const [paying, setPaying] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!activeBooking?.center) {
      navigate(-1);
    }
  }, [activeBooking, navigate]);

  const handlePay = async () => {
    setError("");
    setPaying(true);
    try {
      const order = await createOrder({
        type,
        ...buildPayload(params, activeBooking),
        paymentMethod: method,
        pickupFeePaid: PICKUP_FEE,
      });
      setOrderId(order.id);
      setSuccess(true);
      setTimeout(() => navigate(`/app/orders/${order.id}/track`), 2200);
    } catch (err) {
      setError(err.message || "Payment failed. Please try again.");
    } finally {
      setPaying(false);
    }
  };

  if (success) {
    return (
      <div className="success-panel">
        <div className="success-icon">✓</div>
        <h2>Pickup Fee Received</h2>
        <p className="muted">Order ID: {orderId}</p>
        <p>Redirecting to live tracking…</p>
        <p className="inspection-note">Final service cost will be generated after inspection.</p>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title={title || "Payment"} subtitle="Secure checkout · pickup fee only" />

      <div className="form-panel">
        <div className="payment-summary">
          <span className="muted">Due now</span>
          <h2>₹{PICKUP_FEE}</h2>
          <p className="inspection-note">
            Final service cost after inspection. You approve repairs before paying the balance.
          </p>
        </div>

        <div className="booking-recap">
          <p><strong>Service:</strong> {activeBooking?.service?.name || "—"}</p>
          <p><strong>Center:</strong> {activeBooking?.center?.name || "—"}</p>
          <p><strong>Pickup:</strong> {activeBooking?.pickup?.slot || "—"} · {activeBooking?.pickup?.date || "—"}</p>
        </div>

        <div className="payment-methods">
          {METHODS.map((m) => (
            <button
              key={m}
              type="button"
              className={`payment-method ${method === m ? "active" : ""}`}
              onClick={() => setMethod(m)}
              disabled={paying}
            >
              {m}
            </button>
          ))}
        </div>

        {error && <p className="auth-error">{error}</p>}

        <button type="button" className="glass-btn" onClick={handlePay} disabled={paying}>
          {paying ? <Loader label="Processing…" inline /> : `Pay ₹${PICKUP_FEE} via ${method}`}
        </button>

        <Link to="/app/orders" className="tab-btn" style={{ display: "inline-block", marginTop: 14 }}>
          View existing orders
        </Link>
      </div>
    </div>
  );
}
