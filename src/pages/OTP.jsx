import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { verifyOtp } from "../services/authService";

export default function OTP() {
  const navigate = useNavigate();
  const { phone, email, role, loginMethod, establishSession } = useAuth();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fadeOut, setFadeOut] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");

    if (otp.length < 4) {
      setError("Enter the OTP sent to your device");
      return;
    }

    setLoading(true);
    try {
      const { token, user } = await verifyOtp({
        phone: loginMethod === "phone" ? phone : undefined,
        email: loginMethod === "email" ? email : undefined,
        otp,
        role,
      });

      setFadeOut(true);
      setTimeout(() => {
        establishSession({ token, user });
        navigate("/welcome");
      }, 600);
    } catch (err) {
      setError(err.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-center">
      <motion.form
        className={`glass-box fade-up ${fadeOut ? "auth-fade-out" : ""}`}
        onSubmit={handleVerify}
        animate={fadeOut ? { opacity: 0, scale: 0.95, filter: "blur(8px)" } : {}}
        transition={{ duration: 0.6 }}
      >
        <h1>VERIFY</h1>
        <p className="glass-tagline">
          Code sent to {loginMethod === "phone" ? phone : email}
        </p>
        <input
          className="glass-input"
          type="text"
          inputMode="numeric"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
          maxLength={6}
          autoFocus
        />
        {error && <p className="auth-error">{error}</p>}
        <button type="submit" className="glass-btn" disabled={loading || fadeOut}>
          {loading ? "Verifying…" : "Verify OTP"}
        </button>

        <p className="glass-hint">
          Development: your 6-digit OTP is printed in the terminal running{" "}
          <strong>npm run server</strong> — look for{" "}
          <strong>[ToolDrop OTP]</strong>
        </p>
      </motion.form>
    </div>
  );
}
