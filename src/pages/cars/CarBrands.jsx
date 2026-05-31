import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CAR_BRANDS } from "../../data/cars";

export default function CarBrands() {
  const navigate = useNavigate();

  return (
    <div>
      <header className="page-header">
        <h1>Select Brand</h1>
        <p>Luxury automotive partners · transparency built in</p>
      </header>
      <div className="brand-grid">
        {CAR_BRANDS.map((brand, i) => (
          <motion.div
            key={brand.id}
            className="brand-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.04, duration: 0.4 }}
            whileHover={{ scale: 1.05, boxShadow: "var(--shadow-glow)" }}
            whileTap={{ scale: 1.15 }}
            onClick={() => navigate(`/app/cars/${brand.id}`)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) =>
              e.key === "Enter" && navigate(`/app/cars/${brand.id}`)
            }
          >
            <img src={brand.logo} alt={brand.name} />
            <p>{brand.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
