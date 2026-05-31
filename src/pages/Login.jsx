import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MIN_PHONE_LENGTH } from "../constants/auth";
import { useAuth } from "../context/AuthProvider";

export default function Login() {
  const navigate = useNavigate();
  const { login, role, setRole, phone, setPhone } = useAuth();
  const [localPhone, setLocalPhone] = useState(phone);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (localPhone.replace(/\D/g, "").length < MIN_PHONE_LENGTH) {
      alert("Enter a valid 10-digit number");
      return;
    }
    login({ role, phone: localPhone });
    setPhone(localPhone);
    navigate("/otp");
  };

  return (
    <div className="auth-center">
      <form className="glass-box fade-up" onSubmit={handleSubmit}>
        <h1>TOOLDROP</h1>
        <p className="glass-tagline">Sign in to your premium service hub</p>
        <div className="role-row">
          <button
            type="button"
            className={`role-btn ${role === "user" ? "active" : ""}`}
            onClick={() => setRole("user")}
          >
            User
          </button>
          <button
            type="button"
            className={`role-btn ${role === "admin" ? "active" : ""}`}
            onClick={() => setRole("admin")}
          >
            Admin
          </button>
        </div>
        <input
          className="glass-input"
          type="tel"
          placeholder="Phone or email"
          value={localPhone}
          onChange={(e) => setLocalPhone(e.target.value)}
        />
        <button type="submit" className="glass-btn">
          Send OTP
        </button>
      </form>
    </div>
  );
}
