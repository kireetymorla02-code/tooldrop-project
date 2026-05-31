import { useNavigate, useParams } from "react-router-dom";
import { BIKE_SERVICES } from "../../data/bikes";

export default function BikeServices() {
  const { brand } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <header className="page-header">
        <h1>Bike Services</h1>
        <p>{brand} service options</p>
      </header>
      <div className="brand-grid">
        {BIKE_SERVICES.map((s) => (
          <div
            key={s.id}
            className="center-card"
            style={{ padding: 20 }}
            onClick={() => navigate("/app/bikes/tracking")}
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
