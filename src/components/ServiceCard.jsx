import { motion } from "framer-motion";

export default function ServiceCard({
  title,
  subtitle,
  image,
  onClick,
  index = 0,
}) {
  return (
    <motion.article
      className="service-card-premium"
      custom={index}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        scale: 1.03,
        rotateX: 3,
        rotateY: -3,
        boxShadow: "0 0 50px rgba(196, 0, 0, 0.35)",
      }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
      style={{
        position: "relative",
        minHeight: 340,
        borderRadius: 28,
        overflow: "hidden",
        cursor: "pointer",
        border: "1px solid var(--border-subtle)",
        boxShadow: "var(--shadow-card)",
        transformStyle: "preserve-3d",
      }}
    >
      <img
        src={image}
        alt={title}
        style={{ width: "100%", height: "100%", minHeight: 340, objectFit: "cover" }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
        }}
      />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: 28 }}>
        <h2 style={{ margin: 0, fontSize: "2rem", letterSpacing: 2 }}>{title}</h2>
        <p style={{ margin: "10px 0 0", color: "#ccc", fontSize: "1rem" }}>{subtitle}</p>
      </div>
    </motion.article>
  );
}
