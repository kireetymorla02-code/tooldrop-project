import { useState } from "react";
import "./OTP.css";

export default function OTP({ onVerified }) {
  const [fade, setFade] = useState(false);

  const handleVerify = () => {
    setFade(true);
    setTimeout(onVerified, 700);
  };

  return (
    <div className={`center ${fade ? "fade-out-box" : ""}`}>
      <div className="glass-box">
        <h1 className="brand">TOOLDROP</h1>
        <p>Enter OTP</p>

        <input placeholder="Enter OTP" />
        <button onClick={handleVerify}>Verify</button>
      </div>
    </div>
  );
}