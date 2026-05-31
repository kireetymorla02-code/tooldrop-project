import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiOutlineSparkles } from "react-icons/hi2";

export default function AiInsightCard({ center, rank }) {
  return (
    <motion.div
      className="ai-insight-card"
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: rank * 0.08 }}
    >
      <div className="ai-insight-header">
        <HiOutlineSparkles size={18} />
        <span>AI Pick #{rank}</span>
        <strong>{center.aiScore}/100</strong>
      </div>
      <h4>{center.name}</h4>
      <p className="ai-explanation">{center.aiExplanation}</p>
      <div className="ai-meta">
        ★ {center.rating} · {center.distance} · ETA {center.etaHours}h
      </div>
    </motion.div>
  );
}

export function AiExplanationBanner({ text }) {
  return (
    <div className="ai-banner">
      <HiOutlineSparkles size={20} />
      <p>{text}</p>
    </div>
  );
}
