import { motion } from "framer-motion";

const STATS = [
  { label: "Current Orders", value: "24", trend: "+3 today" },
  { label: "Ongoing Repairs", value: "11", trend: "6 in QC" },
  { label: "Pending Pickups", value: "7", trend: "2 urgent" },
  { label: "Revenue (demo)", value: "₹4.2L", trend: "+18% MoM" },
];

const PANELS = [
  { title: "Assigned Mechanics", desc: "12 active · 3 available" },
  { title: "Customer Reports", desc: "8 pending review" },
  { title: "AI Diagnostics", desc: "5 new failure analyses" },
  { title: "Settlement Queue", desc: "₹1.1L awaiting payout" },
];

export default function AdminDashboard() {
  return (
    <div>
      <div className="admin-stats">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="admin-stat"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <span style={{ display: "block", fontSize: "0.8rem", color: "#999", marginBottom: 8 }}>
              {stat.label}
            </span>
            <strong style={{ fontSize: "1.6rem" }}>{stat.value}</strong>
            <p style={{ margin: "8px 0 0", fontSize: "0.78rem", color: "#888" }}>{stat.trend}</p>
          </motion.div>
        ))}
      </div>

      <div className="admin-panel-grid">
        {PANELS.map((panel, i) => (
          <motion.div
            key={panel.title}
            className="admin-luxury-card"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 + i * 0.08 }}
          >
            <h3 style={{ margin: "0 0 8px" }}>{panel.title}</h3>
            <p style={{ margin: 0, color: "#aaa" }}>{panel.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
