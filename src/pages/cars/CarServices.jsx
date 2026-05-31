import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { CAR_SERVICES } from "../../data/cars";

export default function CarServices() {
  const { brand } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <header className="page-header">
        <h1>Service Types</h1>
        <p>AI-tagged options · dynamic pricing demo</p>
      </header>
      <div className="service-card-grid">
        {CAR_SERVICES.map((service, i) => (
          <motion.div
            key={service.id}
            className="luxury-card"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            onClick={() => navigate(`/app/cars/${brand}/centers`)}
            role="button"
            tabIndex={0}
          >
            <h3 style={{ margin: "0 0 8px" }}>
              {service.name}
              {service.aiTag && <span className="ai-tag">AI · {service.aiTag}</span>}
            </h3>
            <p style={{ margin: 0, color: "var(--text-secondary)" }}>
              {service.time} · {service.price}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
