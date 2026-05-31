import { useNavigate } from "react-router-dom";
import { ELECTRONICS_SERVICES } from "../../data/electronics";

export default function ElectronicsServices() {
  const navigate = useNavigate();

  return (
    <div>
      <header className="page-header">
        <h1>Electronics Services</h1>
      </header>
      <div className="brand-grid">
        {ELECTRONICS_SERVICES.map((s) => (
          <div
            key={s.id}
            className="center-card"
            style={{ padding: 20 }}
            onClick={() => navigate("/app/electronics/tracking")}
            role="button"
            tabIndex={0}
          >
            <h3>{s.name}</h3>
            <p style={{ color: "var(--text-secondary)" }}>{s.time} · {s.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
