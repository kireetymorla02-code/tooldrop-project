import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ELECTRONICS_CATEGORIES } from "../../data/electronics";

export default function Electronics() {
  const navigate = useNavigate();

  return (
    <div>
      <header className="page-header">
        <h1>Electronics</h1>
        <p>Phones · laptops · appliances · smart home</p>
      </header>
      <div className="brand-grid">
        {ELECTRONICS_CATEGORIES.map((cat, i) => (
          <motion.div
            key={cat.id}
            className="luxury-card"
            style={{ textAlign: "center" }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.04 }}
            whileHover={{ scale: 1.04, boxShadow: "var(--shadow-glow)" }}
            onClick={() => navigate("/app/electronics/brands")}
            role="button"
            tabIndex={0}
          >
            <span style={{ fontSize: "2.5rem" }}>{cat.icon}</span>
            <h3 style={{ margin: "14px 0 0" }}>{cat.name}</h3>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
