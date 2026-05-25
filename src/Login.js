import "./Login.css";

export default function Login({ onNext }) {
  return (
    <div className="center">
      <div className="glass-box">
        <h1 className="brand">TOOLDROP</h1>
        <p>Sign in to continue</p>

        <input placeholder="Phone or Email" />
        <button onClick={onNext}>Send OTP</button>
      </div>
    </div>
  );
}