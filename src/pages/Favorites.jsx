import { SERVICE_CENTERS } from "../data/centers";

export default function Favorites() {
  const favorites = SERVICE_CENTERS.filter((c) => c.aiRecommended);

  return (
    <div>
      <header className="page-header">
        <h1>Favorites</h1>
        <p>Saved centers & services</p>
      </header>
      <div className="center-grid">
        {favorites.map((center) => (
          <div key={center.id} className="luxury-card" style={{ cursor: "default" }}>
            <h3>{center.name}</h3>
            <p style={{ color: "var(--text-secondary)" }}>★ {center.rating} · {center.distance}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
