import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import { BIKE_SERVICES } from "../../data/bikes";
import { useCustomer } from "../../context/CustomerProvider";

export default function BikeServices() {
  const { brand, model } = useParams();
  const navigate = useNavigate();
  const { startBooking } = useCustomer();

  return (
    <div>
      <PageHeader title="Bike Services" subtitle="Performance care & roadside support" />
      <div className="service-card-grid">
        {BIKE_SERVICES.map((s) => (
          <div
            key={s.id}
            className="luxury-card"
            onClick={() => {
              startBooking({ type: "bike", brand, model, service: s });
              navigate(`/app/bikes/${brand}/${model}/centers`);
            }}
            role="button"
            tabIndex={0}
          >
            <h3>{s.name}{s.aiTag && <span className="ai-tag">{s.aiTag}</span>}</h3>
            <p className="muted">{s.time} · {s.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
