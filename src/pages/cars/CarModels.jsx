import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { CAR_BRANDS, CAR_MODELS, DEFAULT_MODEL } from "../../data/cars";

export default function CarModels() {
  const { brand } = useParams();
  const navigate = useNavigate();
  const brandInfo = CAR_BRANDS.find((b) => b.id === brand);
  const models =
    CAR_MODELS[brand] ||
    [DEFAULT_MODEL(brandInfo?.name || brand, brandInfo?.banner)];

  return (
    <div>
      <header className="page-header">
        <h1>{brandInfo?.name || brand} Models</h1>
        <p>Select your vehicle for transparent service</p>
      </header>
      <div className="model-grid">
        {models.map((model, i) => (
          <motion.div
            key={model.id}
            className="model-card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -8, boxShadow: "var(--shadow-glow)" }}
            onClick={() => navigate(`/app/cars/${brand}/services`)}
            role="button"
            tabIndex={0}
          >
            {model.image && <img src={model.image} alt={model.name} />}
            <div style={{ padding: 16 }}>
              <h3 style={{ margin: "0 0 8px" }}>{model.name}</h3>
              <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                {model.year} · {model.fuel} · {model.mileage}
              </p>
              <span className="health-badge">{model.health}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
