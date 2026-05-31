import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";

const METHODS = ["UPI", "Credit Card", "Wallet", "Net Banking"];

export default function CarPayment() {
  const { brand } = useParams();
  const navigate = useNavigate();
  const [method, setMethod] = useState("UPI");
  const [success, setSuccess] = useState(false);

  const handlePay = () => {
    setSuccess(true);
    setTimeout(() => navigate("/app/cars/tracking"), 2200);
  };

  if (success) {
    return (
      <motion.div
        className="success-panel"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="success-icon">✓</div>
        <h2>Payment Successful</h2>
        <p style={{ color: "var(--text-secondary)" }}>Order ID: TD-{Math.floor(Math.random() * 90000 + 10000)}</p>
        <p style={{ marginTop: 8 }}>Invoice generated · Redirecting to live tracking…</p>
      </motion.div>
    );
  }

  return (
    <div>
      <header className="page-header">
        <h1>Payment</h1>
        <p>Secure demo checkout</p>
      </header>

      <div className="form-panel">
        <p style={{ margin: "0 0 8px", color: "var(--text-secondary)" }}>Amount due</p>
        <h2 style={{ margin: "0 0 20px" }}>₹12,400</h2>

        <div className="payment-methods">
          {METHODS.map((m) => (
            <button
              key={m}
              type="button"
              className={`payment-method ${method === m ? "active" : ""}`}
              onClick={() => setMethod(m)}
            >
              {m}
            </button>
          ))}
        </div>

        <button type="button" className="glass-btn" onClick={handlePay}>
          Pay with {method}
        </button>
      </div>
    </div>
  );
}
