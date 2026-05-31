import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { SERVICE_CENTERS } from "../../data/centers";

export default function CarCenters() {
  const { brand } = useParams();
  const navigate = useNavigate();
  const [mode, setMode] = useState("ai");

  const list =
    mode === "ai"
      ? SERVICE_CENTERS.filter((c) => c.aiRecommended)
      : SERVICE_CENTERS;

  return (
    <div>
      <header className="page-header">
        <h1>Service Centers</h1>
        <p>Verified partners · {brand}</p>
      </header>

      <div className="tab-row">
        <button
          type="button"
          className={`tab-btn ${mode === "ai" ? "active" : ""}`}
          onClick={() => setMode("ai")}
        >
          AI Recommended
        </button>
        <button
          type="button"
          className={`tab-btn ${mode === "manual" ? "active" : ""}`}
          onClick={() => setMode("manual")}
        >
          Manual Selection
        </button>
      </div>

      <div className="center-grid">
        {list.map((center, i) => (
          <motion.div
            key={center.id}
            className="center-card"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.02, boxShadow: "var(--shadow-glow)" }}
            onClick={() =>
              navigate(`/app/cars/${brand}/pickup`, { state: { centerId: center.id } })
            }
            role="button"
            tabIndex={0}
          >
            <img
              src={center.image}
              alt={center.name}
              style={{ width: "100%", height: 150, objectFit: "cover" }}
            />
            <div style={{ padding: 18 }}>
              <h3 style={{ margin: "0 0 6px" }}>
                {center.name}
                {center.aiRecommended && (
                  <span className="ai-tag">AI Pick</span>
                )}
              </h3>
              <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                ★ {center.rating} ({center.reviews} reviews) · {center.distance}
              </p>
              <p style={{ margin: "6px 0", fontSize: "0.8rem" }}>{center.address}</p>
              <p style={{ margin: 0, fontSize: "0.78rem", color: "var(--text-muted)" }}>
                {center.open ? "Open now" : "Closed"} ·{" "}
                {center.pickup ? "Pickup available" : "Drop-off only"}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
