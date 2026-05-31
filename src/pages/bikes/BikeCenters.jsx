import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { AiExplanationBanner } from "../../components/AiInsightCard";
import PageHeader from "../../components/PageHeader";
import { useCustomer } from "../../context/CustomerProvider";
import { rankCenters } from "../../utils/recommendationEngine";

export default function BikeCenters() {
  const { brand, model } = useParams();
  const navigate = useNavigate();
  const { nearbyCenters, favorites, toggleFavorite, activeBooking, startBooking } = useCustomer();
  const [mode, setMode] = useState("ai");
  const ranked = rankCenters(nearbyCenters);
  const list = mode === "ai" ? ranked.filter((c) => c.aiScore >= 70).slice(0, 6) : ranked;

  const selectCenter = (center) => {
    startBooking({ ...activeBooking, center });
    navigate(`/app/bikes/${brand}/${model}/pickup`);
  };

  return (
    <div>
      <PageHeader title="Service Centers" subtitle="Motorcycle specialists near you" />
      {mode === "ai" && ranked[0] && <AiExplanationBanner text={ranked[0].aiExplanation} />}
      <div className="tab-row">
        <button type="button" className={`tab-btn ${mode === "ai" ? "active" : ""}`} onClick={() => setMode("ai")}>AI Recommended</button>
        <button type="button" className={`tab-btn ${mode === "manual" ? "active" : ""}`} onClick={() => setMode("manual")}>Manual Selection</button>
      </div>
      <div className="center-grid">
        {list.map((center, i) => (
          <motion.div key={center.id} className="center-card" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <img src={center.image} alt={center.name} style={{ width: "100%", height: 150, objectFit: "cover" }} />
            <div style={{ padding: 18 }}>
              <h3>{center.name}{center.aiScore >= 80 && <span className="ai-tag">AI {center.aiScore}</span>}</h3>
              <p className="muted">★ {center.rating} · {center.distance}</p>
              <button type="button" className="glass-btn" style={{ marginTop: 12, width: "100%" }} onClick={() => selectCenter(center)}>Select</button>
              <button type="button" className="tab-btn" style={{ marginTop: 8 }} onClick={() => toggleFavorite(center.id)}>
                {favorites.includes(center.id) ? "★ Saved" : "Save"}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
