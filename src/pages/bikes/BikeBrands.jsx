import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import BrandLogo from "../../components/BrandLogo";
import PageHeader, { SearchFilterBar } from "../../components/PageHeader";
import { BIKE_BRANDS } from "../../data/bikes";
import { useCustomer } from "../../context/CustomerProvider";

export default function BikeBrands() {
  const navigate = useNavigate();
  const { globalSearch } = useCustomer();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = (search || globalSearch).toLowerCase();
    return BIKE_BRANDS.filter((b) => !q || b.name.toLowerCase().includes(q));
  }, [search, globalSearch]);

  return (
    <div>
      <PageHeader eyebrow="Bikes" title="Premium Motorcycle Brands" subtitle={`${BIKE_BRANDS.length} brands · performance servicing`} />
      <SearchFilterBar search={search} onSearch={setSearch} filters={[]} activeFilter="" onFilter={() => {}} />
      <div className="brand-grid premium-brand-grid">
        {filtered.map((brand, i) => (
          <motion.div
            key={brand.id}
            className="brand-card premium-brand-card"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 1.1 }}
            onClick={() => navigate(`/app/bikes/${brand.id}`)}
            role="button"
            tabIndex={0}
          >
            <div className="brand-card-banner" style={{ backgroundImage: `url(${brand.banner})` }} />
            <div className="brand-card-body">
              <BrandLogo name={brand.name} logo={brand.logo} size={40} />
              <h3>{brand.name}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
