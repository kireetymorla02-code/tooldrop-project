import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import { ELECTRONICS_SERVICES, getElectronicsCategory } from "../../data/electronics";
import { useCustomer } from "../../context/CustomerProvider";

export default function ElectronicsServices() {
  const { category } = useParams();
  const navigate = useNavigate();
  const { startBooking } = useCustomer();
  const cat = getElectronicsCategory(category);

  return (
    <div>
      <PageHeader title={`${cat?.name || category} Services`} subtitle="Repair · installation · warranty support" />
      <div className="service-card-grid">
        {ELECTRONICS_SERVICES.map((s) => (
          <div
            key={s.id}
            className="luxury-card"
            onClick={() => {
              startBooking({ type: "electronics", category, service: s });
              navigate(`/app/electronics/${category}/centers`);
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
