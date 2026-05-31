import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AiExplanationBanner } from "../../components/AiInsightCard";
import PageHeader from "../../components/PageHeader";
import { useCustomer } from "../../context/CustomerProvider";
import { rankCenters } from "../../utils/recommendationEngine";

export default function ElectronicsCenters() {
  const { category } = useParams();
  const navigate = useNavigate();
  const { nearbyCenters, activeBooking, startBooking } = useCustomer();
  const [mode, setMode] = useState("ai");
  const ranked = rankCenters(nearbyCenters.filter((c) => c.specializations?.includes("Electronics") || c.type === "electronics"));
  const list = (ranked.length ? ranked : rankCenters(nearbyCenters)).slice(0, mode === "ai" ? 6 : 20);

  const selectCenter = (center) => {
    startBooking({ ...activeBooking, center });
    navigate(`/app/electronics/${category}/pickup`);
  };

  return (
    <div>
      <PageHeader title="Service Centers" subtitle="Electronics specialists" />
      {mode === "ai" && list[0] && <AiExplanationBanner text={list[0].aiExplanation} />}
      <div className="tab-row">
        <button type="button" className={`tab-btn ${mode === "ai" ? "active" : ""}`} onClick={() => setMode("ai")}>AI Recommended</button>
        <button type="button" className={`tab-btn ${mode === "manual" ? "active" : ""}`} onClick={() => setMode("manual")}>Manual</button>
      </div>
      <div className="center-grid">
        {list.map((center) => (
          <div key={center.id} className="center-card">
            <img src={center.image} alt={center.name} style={{ width: "100%", height: 140, objectFit: "cover" }} />
            <div style={{ padding: 16 }}>
              <h3>{center.name}</h3>
              <p className="muted">★ {center.rating} · {center.distance}</p>
              <button type="button" className="glass-btn" style={{ width: "100%", marginTop: 8 }} onClick={() => selectCenter(center)}>Select</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
