import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { fetchAdminStats } from "../../services/adminService";

const PANELS = [
  { title: "Current Orders", desc: "Live pipeline across all centers", to: "/admin/orders" },
  { title: "Payments", desc: "Pickup fees & settlement ledger", to: "/admin/payments" },
  { title: "Analytics", desc: "Volume, revenue, completion rate", to: "/admin/analytics" },
  { title: "Reviews", desc: "Post-delivery customer feedback", to: "/admin/reviews" },
];

export default function AdminDashboard() {
  const { token } = useAuth();
  const [stats, setStats] = useState({ activeOrders: 0, deliveredOrders: 0, revenue: 0 });

  useEffect(() => {
    fetchAdminStats(token).then((d) => setStats(d.stats || stats)).catch(() => {});
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  const STAT_ITEMS = [
    { label: "Active Orders", value: String(stats.activeOrders), trend: "In progress" },
    { label: "Delivered", value: String(stats.deliveredOrders), trend: "Completed" },
    { label: "Pickup Revenue", value: `₹${stats.revenue.toLocaleString("en-IN")}`, trend: "Collected fees" },
    { label: "Platform Status", value: "Live", trend: "Production ready" },
  ];

  return (
    <div>
      <div className="admin-stats">
        {STAT_ITEMS.map((stat, i) => (
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
          <motion.div key={panel.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.05 }}>
            <Link to={panel.to} className="admin-luxury-card" style={{ display: "block", textDecoration: "none", color: "inherit" }}>
              <h3 style={{ margin: "0 0 8px" }}>{panel.title}</h3>
              <p style={{ margin: 0, color: "#aaa" }}>{panel.desc}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
