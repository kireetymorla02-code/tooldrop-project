import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiOutlineBolt,
  HiOutlineMapPin,
  HiOutlinePhone,
  HiOutlineSparkles,
  HiOutlineTruck,
} from "react-icons/hi2";
import AiInsightCard from "../components/AiInsightCard";
import ServiceCard from "../components/ServiceCard";
import { useAuth } from "../context/AuthProvider";
import { useCustomer } from "../context/CustomerProvider";

const QUICK_ACTIONS = [
  { label: "Book Car Service", path: "/app/cars", Icon: HiOutlineTruck },
  { label: "AI Assistant", path: "/app/ai-assist", Icon: HiOutlineSparkles },
  { label: "Track Order", path: "/app/orders", Icon: HiOutlineMapPin },
  { label: "Emergency", path: "/app/emergency", Icon: HiOutlineBolt },
];

const CATEGORIES = [
  { id: "cars", title: "Cars", subtitle: "Premium automotive care", image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80", path: "/app/cars" },
  { id: "bikes", title: "Bikes", subtitle: "Performance bike servicing", image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80", path: "/app/bikes" },
  { id: "electronics", title: "Electronics", subtitle: "Smart device experts", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1200&q=80", path: "/app/electronics" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    orders,
    aiRecommendations,
    nearbyCenters,
    loyaltyPoints,
    location,
    notifications,
  } = useCustomer();

  const upcoming = orders.slice(0, 2);

  return (
    <div className="dashboard-page phase2-dashboard">
      <div className="dashboard-ambient" aria-hidden />

      <header className="dashboard-hero-row">
        <div>
          <p className="dashboard-eyebrow">Good {new Date().getHours() < 12 ? "morning" : "evening"}, {user?.name?.split(" ")[0] || "Member"}</p>
          <h1>Your Premium Service Hub</h1>
          <p className="dashboard-lead">
            {location?.label || "Hyderabad"} · AI-powered transparency · Pickup & delivery
          </p>
        </div>
        <div className="loyalty-pill">
          <span>Loyalty Points</span>
          <strong>{loyaltyPoints.toLocaleString()}</strong>
        </div>
      </header>

      <div className="quick-actions-row">
        {QUICK_ACTIONS.map(({ label, path, Icon }, i) => (
          <motion.button
            key={label}
            type="button"
            className="quick-action-card"
            onClick={() => navigate(path)}
            whileHover={{ scale: 1.03, y: -4 }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <Icon size={22} />
            <span>{label}</span>
          </motion.button>
        ))}
      </div>

      <div className="dashboard-grid-2">
        <section className="dash-panel">
          <div className="panel-head">
            <h3>Recent Orders</h3>
            <Link to="/app/orders">View all</Link>
          </div>
          {upcoming.map((order) => (
            <div key={order.id} className="order-card compact">
              <div>
                <strong>{order.id}</strong>
                <p>{order.vehicle || order.service} · {order.status}</p>
              </div>
              <Link to={`/app/orders/${order.id}/track`} className="tab-btn active">
                Track
              </Link>
            </div>
          ))}
        </section>

        <section className="dash-panel profile-summary">
          <h3>Profile Summary</h3>
          <p><strong>{user?.name || "Complete profile"}</strong></p>
          <p className="muted">{user?.phone || user?.email}</p>
          <p className="muted">{location?.label}</p>
          <Link to="/app/profile" className="glass-btn" style={{ marginTop: 12, width: "auto", display: "inline-block", padding: "10px 18px" }}>
            Manage Profile
          </Link>
        </section>
      </div>

      <section className="dash-panel">
        <div className="panel-head">
          <h3>AI Recommendations</h3>
          <Link to="/app/ai-assist">Ask AI</Link>
        </div>
        <div className="ai-rec-grid">
          {aiRecommendations.map((c, i) => (
            <AiInsightCard key={c.id} center={c} rank={i + 1} />
          ))}
        </div>
      </section>

      <section className="dash-panel">
        <div className="panel-head">
          <h3>Nearby Service Centers</h3>
          <span>{nearbyCenters.length} within range</span>
        </div>
        <div className="center-grid compact-grid">
          {nearbyCenters.slice(0, 4).map((c) => (
            <div key={c.id} className="center-card" onClick={() => navigate("/app/cars")} role="button" tabIndex={0}>
              <img src={c.image} alt={c.name} style={{ width: "100%", height: 100, objectFit: "cover" }} />
              <div style={{ padding: 12 }}>
                <strong>{c.name}</strong>
                <p className="muted">★ {c.rating} · {c.distance}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="dash-panel">
        <div className="panel-head">
          <h3>Upcoming Pickups</h3>
        </div>
        {upcoming.length ? (
          upcoming.map((o) => (
            <div key={o.id} className="pickup-row">
              <HiOutlineTruck size={20} />
              <div>
                <strong>{o.id}</strong>
                <p>ETA {o.eta} · Partner assigned</p>
              </div>
            </div>
          ))
        ) : (
          <p className="muted">No upcoming pickups. Book a service to get started.</p>
        )}
      </section>

      <div className="emergency-row">
        <button type="button" className="emergency-btn" onClick={() => navigate("/app/emergency")}>
          <HiOutlineBolt size={20} /> Emergency Assistance
        </button>
        <button type="button" className="emergency-btn secondary" onClick={() => navigate("/app/emergency")}>
          <HiOutlinePhone size={20} /> Roadside 24/7
        </button>
      </div>

      <header className="dashboard-hero" style={{ marginTop: 40 }}>
        <p className="dashboard-eyebrow">Service Universe</p>
        <h2 style={{ margin: 0 }}>Choose your category</h2>
      </header>
      <div className="service-grid">
        {CATEGORIES.map((s, i) => (
          <ServiceCard key={s.id} {...s} index={i} onClick={() => navigate(s.path)} />
        ))}
      </div>
    </div>
  );
}
