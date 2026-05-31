import { useState } from "react";
import { motion } from "framer-motion";

export default function BrandLogo({ name, logo, size = 48 }) {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (logo && !failed) {
    return (
      <img
        src={logo}
        alt={name}
        style={{ width: size, height: size, objectFit: "contain" }}
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <motion.span
      whileHover={{ scale: 1.08 }}
      style={{
        width: size,
        height: size,
        display: "inline-grid",
        placeItems: "center",
        borderRadius: 12,
        background: "var(--accent-soft)",
        color: "var(--accent-gold)",
        fontWeight: 700,
        fontSize: size * 0.35,
        letterSpacing: 1,
      }}
    >
      {initials}
    </motion.span>
  );
}
