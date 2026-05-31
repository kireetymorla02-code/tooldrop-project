import PageHeader from "../components/PageHeader";
import { useCustomer } from "../context/CustomerProvider";
import { getNearbyCenters } from "../data/centers";

export default function Favorites() {
  const { favorites, toggleFavorite, location } = useCustomer();
  const centers = getNearbyCenters(location?.city || "Hyderabad");
  const saved = centers.filter((c) => favorites.includes(c.id));

  return (
    <div>
      <PageHeader eyebrow="Saved" title="Favorites" subtitle="Your preferred service centers" />

      {saved.length ? (
        <div className="center-grid">
          {saved.map((center) => (
            <div key={center.id} className="center-card">
              <img src={center.image} alt={center.name} style={{ width: "100%", height: 120, objectFit: "cover" }} />
              <div style={{ padding: 16 }}>
                <h3>{center.name}</h3>
                <p className="muted">★ {center.rating} · {center.distance}</p>
                <button type="button" className="tab-btn" onClick={() => toggleFavorite(center.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="muted">Save centers while booking to see them here.</p>
      )}
    </div>
  );
}
