import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader, { SearchFilterBar } from "../../components/PageHeader";
import { getCarBrand, getCarModels } from "../../data/cars";

export default function CarModels() {
  const { brand } = useParams();
  const navigate = useNavigate();
  const brandInfo = getCarBrand(brand);
  const allModels = getCarModels(brand);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = useMemo(() => {
    return allModels.filter((m) => {
      const q = search.toLowerCase();
      const matchSearch = !q || m.name.toLowerCase().includes(q);
      const matchFilter =
        filter === "all" ||
        (filter === "popular" && m.popular) ||
        (filter === "recent" && m.recent);
      return matchSearch && matchFilter;
    });
  }, [allModels, search, filter]);

  if (!brandInfo) {
    return <p>Brand not found</p>;
  }

  return (
    <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.45 }}>
      <div className="brand-hero" style={{ backgroundImage: `url(${brandInfo.banner})` }}>
        <div className="brand-hero-overlay">
          <h1>{brandInfo.name}</h1>
          <p>{brandInfo.description}</p>
        </div>
      </div>

      <PageHeader title="Select Model" subtitle={`${filtered.length} models available`} />

      <SearchFilterBar
        search={search}
        onSearch={setSearch}
        filters={[
          { id: "all", label: "All" },
          { id: "popular", label: "Popular" },
          { id: "recent", label: "Recently Serviced" },
        ]}
        activeFilter={filter}
        onFilter={setFilter}
      />

      <div className="model-grid">
        {filtered.map((model, i) => (
          <motion.div
            key={model.id}
            className="model-card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            whileHover={{ y: -8, boxShadow: "var(--shadow-glow)" }}
            onClick={() => navigate(`/app/cars/${brand}/${model.id}/services`)}
            role="button"
            tabIndex={0}
          >
            <img src={model.image} alt={model.name} />
            <div style={{ padding: 16 }}>
              <h3>{model.name}</h3>
              <p className="muted">{model.year} · {model.fuel} · {model.mileage}</p>
              <span className="health-badge">{model.health}</span>
              {model.popular && <span className="ai-tag">Popular</span>}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
