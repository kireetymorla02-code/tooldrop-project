import { useNavigate, useParams } from "react-router-dom";
import { BIKE_BRANDS, BIKE_MODELS } from "../../data/bikes";

export default function BikeModels() {
  const { brand } = useParams();
  const navigate = useNavigate();
  const brandInfo = BIKE_BRANDS.find((b) => b.id === brand);
  const models = BIKE_MODELS[brand] || [
    { id: "default", name: `${brandInfo?.name} Standard`, year: 2023, fuel: "Petrol", mileage: "10k km", health: "Good" },
  ];

  return (
    <div>
      <header className="page-header">
        <h1>{brandInfo?.name || brand} Models</h1>
      </header>
      <div className="model-grid">
        {models.map((model) => (
          <div
            key={model.id}
            className="model-card"
            style={{ padding: 20 }}
            onClick={() => navigate(`/app/bikes/${brand}/services`)}
            role="button"
            tabIndex={0}
          >
            <h3>{model.name}</h3>
            <p style={{ color: "var(--text-secondary)" }}>
              {model.year} · {model.mileage} · {model.health}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
