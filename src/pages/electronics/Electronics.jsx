import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PageHeader, { SearchFilterBar } from "../../components/PageHeader";
import { ELECTRONICS_CATEGORIES } from "../../data/electronics";
import { useCustomer } from "../../context/CustomerProvider";

export default function Electronics() {
  const navigate = useNavigate();
  const { globalSearch } = useCustomer();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = (search || globalSearch).toLowerCase();
    return ELECTRONICS_CATEGORIES.filter(
      (c) => !q || c.name.toLowerCase().includes(q) || c.description?.toLowerCase().includes(q)
    );
  }, [search, globalSearch]);

  return (
    <div>
      <PageHeader eyebrow="Electronics" title="Premium Device Care" subtitle={`${ELECTRONICS_CATEGORIES.length} categories · repair · install · warranty`} />
      <SearchFilterBar search={search} onSearch={setSearch} filters={[]} activeFilter="" onFilter={() => {}} />

      <div className="brand-grid premium-brand-grid">
        {filtered.map((cat, i) => (
          <motion.div
            key={cat.id}
            className="luxury-card electronics-category-card"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.03 }}
            whileHover={{ scale: 1.04, boxShadow: "var(--shadow-glow)" }}
            onClick={() => navigate(`/app/electronics/${cat.id}/services`)}
            role="button"
            tabIndex={0}
          >
            <div className="electronics-cat-banner" style={{ backgroundImage: `url(${cat.image})` }} />
            <div style={{ padding: 18 }}>
              <span style={{ fontSize: "1.8rem" }}>{cat.icon}</span>
              <h3>{cat.name}</h3>
              <p className="muted">{cat.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
