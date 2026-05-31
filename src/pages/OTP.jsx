import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DEMO_OTP } from "../constants/auth";
import { useAuth } from "../context/AuthProvider";

export default function OTP() {
  const navigate = useNavigate();
  const { completeAuth } = useAuth();
  const [otp, setOtp] = useState("");

  const handleVerify = (e) => {
    e.preventDefault();
    if (otp !== DEMO_OTP) {
      alert(`Use demo OTP: ${DEMO_OTP}`);
      return;
    }
    completeAuth();
    navigate("/welcome");
  };

  return (
    <div className="auth-center">
      <form className="glass-box fade-up" onSubmit={handleVerify}>
        <h1>VERIFY</h1>
        <p className="glass-tagline">Enter the one-time passcode</p>
        <input
          className="glass-input"
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
        />
        <button type="submit" className="glass-btn">
          Verify OTP
        </button>
        <p className="glass-hint">Demo OTP: {DEMO_OTP}</p>
      </form>
    </div>
  );
}
