import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BIKE_BRANDS } from "../../data/bikes";

export default function BikeBrands() {
  const navigate = useNavigate();

  return (
    <div>
      <header className="page-header">
        <h1>Bike Brands</h1>
        <p>Premium motorcycle servicing</p>
      </header>
      <div className="brand-grid">
        {BIKE_BRANDS.map((brand, i) => (
          <motion.div
            key={brand.id}
            className="brand-card"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.05, boxShadow: "var(--shadow-glow)" }}
            onClick={() => navigate(`/app/bikes/${brand.id}`)}
            role="button"
            tabIndex={0}
          >
            <img src={brand.logo} alt={brand.name} />
            <p>{brand.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
