import { motion } from "framer-motion";

export default function ProductCard({ name, icon, image, onClick, index = 0 }) {
  return (
    <motion.div
      className="brand-card premium-brand-card product-card"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.02, 0.3) }}
      whileHover={{ y: -4, boxShadow: "var(--shadow-glow)" }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
    >
      <div className="brand-card-banner" style={{ backgroundImage: `url(${image})` }} />
      <div className="brand-card-body">
        {icon && <span className="product-card-icon">{icon}</span>}
        <h3>{name}</h3>
      </div>
    </motion.div>
  );
}
