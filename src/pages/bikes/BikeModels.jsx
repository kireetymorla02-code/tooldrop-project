import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader, { SearchFilterBar } from "../../components/PageHeader";
import { getBikeBrand, getBikeModels } from "../../data/bikes";

export default function BikeModels() {
  const { brand } = useParams();
  const navigate = useNavigate();
  const brandInfo = getBikeBrand(brand);
  const models = getBikeModels(brand);
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () => models.filter((m) => m.name.toLowerCase().includes(search.toLowerCase())),
    [models, search]
  );

  return (
    <div>
      <PageHeader title={`${brandInfo?.name || brand} Models`} subtitle="Select your motorcycle" />
      <SearchFilterBar search={search} onSearch={setSearch} filters={[]} activeFilter="" onFilter={() => {}} />
      <div className="model-grid">
        {filtered.map((model) => (
          <div
            key={model.id}
            className="model-card"
            onClick={() => navigate(`/app/bikes/${brand}/${model.id}/services`)}
            role="button"
            tabIndex={0}
          >
            {model.image && <img src={model.image} alt={model.name} />}
            <div style={{ padding: 16 }}>
              <h3>{model.name}</h3>
              <p className="muted">{model.year} · {model.mileage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
