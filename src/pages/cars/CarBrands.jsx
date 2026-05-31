import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import BrandLogo from "../../components/BrandLogo";
import PageHeader, { SearchFilterBar } from "../../components/PageHeader";
import { CAR_BRANDS } from "../../data/cars";
import { useCustomer } from "../../context/CustomerProvider";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function CarBrands() {
  const navigate = useNavigate();
  const { globalSearch } = useCustomer();
  const [search, setSearch] = useState("");
  const [letter, setLetter] = useState("all");

  const filtered = useMemo(() => {
    const q = (search || globalSearch).toLowerCase();
    return CAR_BRANDS.filter((b) => {
      const matchSearch = !q || b.name.toLowerCase().includes(q);
      const matchLetter = letter === "all" || b.name[0].toUpperCase() === letter;
      return matchSearch && matchLetter;
    });
  }, [search, globalSearch, letter]);

  return (
    <div>
      <PageHeader
        eyebrow="Cars"
        title="Premium Automotive Brands"
        subtitle={`${CAR_BRANDS.length} brands · A–Z luxury service partners`}
      />

      <SearchFilterBar
        search={search}
        onSearch={setSearch}
        filters={[{ id: "all", label: "All" }, ...LETTERS.slice(0, 6).map((l) => ({ id: l, label: l }))]}
        activeFilter={letter}
        onFilter={setLetter}
      />

      <div className="alpha-bar">
        {LETTERS.map((l) => (
          <button
            key={l}
            type="button"
            className={`alpha-chip ${letter === l ? "active" : ""}`}
            onClick={() => setLetter(letter === l ? "all" : l)}
          >
            {l}
          </button>
        ))}
      </div>

      <div className="brand-grid premium-brand-grid">
        {filtered.map((brand, i) => (
          <motion.div
            key={brand.id}
            className="brand-card premium-brand-card"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: Math.min(i * 0.02, 0.4) }}
            whileHover={{ scale: 1.04, boxShadow: "var(--shadow-glow)" }}
            whileTap={{ scale: 1.12 }}
            onClick={() => navigate(`/app/cars/${brand.id}`)}
            role="button"
            tabIndex={0}
          >
            <div className="brand-card-banner" style={{ backgroundImage: `url(${brand.banner})` }} />
            <div className="brand-card-body">
              <BrandLogo name={brand.name} logo={brand.logo} size={40} />
              <h3>{brand.name}</h3>
              <p>{brand.country}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
