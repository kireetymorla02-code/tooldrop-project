import { motion } from "framer-motion";

const RECOMMENDATIONS = [
  {
    title: "Ceramic Coating",
    reason: "Low mileage + premium vehicle history",
    savings: "Save ~12%",
  },
  {
    title: "ToolDrop Premium Hub",
    reason: "Highest rating near you · pickup available",
    savings: "ETA 2.4 km",
  },
  {
    title: "Brake Inspection",
    reason: "AI detected wear pattern from last service",
    savings: "Preventive",
  },
];

export default function AiAssist() {
  return (
    <div>
      <header className="page-header">
        <h1>AI Assist</h1>
        <p>Dynamic pricing · center matching · failure insights</p>
      </header>

      <div className="service-card-grid">
        {RECOMMENDATIONS.map((item, i) => (
          <motion.div
            key={item.title}
            className="luxury-card"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            style={{ cursor: "default" }}
          >
            <span className="ai-tag">AI Recommended</span>
            <h3 style={{ margin: "12px 0 8px" }}>{item.title}</h3>
            <p style={{ margin: 0, color: "var(--text-secondary)" }}>{item.reason}</p>
            <p style={{ margin: "10px 0 0", color: "var(--accent-gold)" }}>{item.savings}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
