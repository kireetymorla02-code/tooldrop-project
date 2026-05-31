import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleSignInButton from "../components/GoogleSignInButton";
import { MIN_PHONE_LENGTH } from "../constants/auth";
import { ROLE_LABELS } from "../constants/roles";
import { useAuth } from "../context/AuthProvider";
import { sendOtp, loginWithGoogle } from "../services/authService";
import { checkApiHealth } from "../services/api";

export default function Login() {
  const navigate = useNavigate();
  const { login, role, setRole, phone, email, setPhone, setEmail, establishSession } =
    useAuth();
  const [method, setMethod] = useState("phone");
  const [localPhone, setLocalPhone] = useState(phone);
  const [localEmail, setLocalEmail] = useState(email);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (method === "phone") {
      if (localPhone.replace(/\D/g, "").length < MIN_PHONE_LENGTH) {
        setError("Enter a valid 10-digit phone number");
        return;
      }
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(localEmail)) {
      setError("Enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      const health = await checkApiHealth();
      if (!health.ok) {
        if (health.reason === "database") {
          setError("Database not connected. Run: npm run db:up && npm run server:migrate");
        } else if (health.reason === "network") {
          setError(
            "Cannot reach API at localhost:5001. Run npm run server once (only one terminal)."
          );
        } else {
          setError("API health check failed. Restart the backend.");
        }
        return;
      }

      await sendOtp({
        phone: method === "phone" ? localPhone : undefined,
        email: method === "email" ? localEmail : undefined,
        role,
      });

      login({
        role,
        phone: method === "phone" ? localPhone : "",
        email: method === "email" ? localEmail : "",
        method,
      });
      setPhone(method === "phone" ? localPhone : "");
      setEmail(method === "email" ? localEmail : "");
      navigate("/otp");
    } catch (err) {
      setError(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    setGoogleLoading(true);
    try {
      const { token, user } = await loginWithGoogle(role);
      establishSession({ token, user });
      navigate("/welcome");
    } catch (err) {
      setError(err.message || "Google sign-in failed");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="auth-center">
      <form className="glass-box fade-up" onSubmit={handleSubmit}>
        <h1>TOOLDROP</h1>
        <p className="glass-tagline">Precision Service. Delivered.</p>

        <div className="role-row">
          {Object.entries(ROLE_LABELS).map(([value, label]) => (
            <button
              key={value}
              type="button"
              className={`role-btn ${role === value ? "active" : ""}`}
              onClick={() => setRole(value)}
            >
              {label === "Customer" ? "Customer" : label.replace("Service Center ", "Center ")}
            </button>
          ))}
        </div>

        <div className="auth-method-row">
          <button
            type="button"
            className={`auth-method ${method === "phone" ? "active" : ""}`}
            onClick={() => setMethod("phone")}
          >
            Phone OTP
          </button>
          <button
            type="button"
            className={`auth-method ${method === "email" ? "active" : ""}`}
            onClick={() => setMethod("email")}
          >
            Email OTP
          </button>
        </div>

        {method === "phone" ? (
          <input
            className="glass-input"
            type="tel"
            placeholder="+91 XXXXXXXXXX"
            value={localPhone}
            onChange={(e) => setLocalPhone(e.target.value)}
          />
        ) : (
          <input
            className="glass-input"
            type="email"
            placeholder="you@email.com"
            value={localEmail}
            onChange={(e) => setLocalEmail(e.target.value)}
          />
        )}

        {error && <p className="auth-error">{error}</p>}

        <button type="submit" className="glass-btn" disabled={loading}>
          {loading ? "Sending OTP…" : "Send OTP"}
        </button>

        <GoogleSignInButton
          onClick={handleGoogle}
          loading={googleLoading}
          disabled={loading}
        />

        <p className="glass-hint">
          Real OTP via API · check server console in development
        </p>
      </form>
    </div>
  );
}
