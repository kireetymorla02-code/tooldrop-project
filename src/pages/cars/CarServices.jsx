import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import PageHeader from "../../components/PageHeader";
import { VEHICLE_SERVICES } from "../../data/cars";
import { useCustomer } from "../../context/CustomerProvider";

export default function CarServices() {
  const { brand, model } = useParams();
  const navigate = useNavigate();
  const { startBooking } = useCustomer();

  const selectService = (service) => {
    startBooking({ type: "car", brand, model, service });
    navigate(`/app/cars/${brand}/${model}/centers`);
  };

  return (
    <div>
      <PageHeader title="Service Types" subtitle="AI-tagged premium options · dynamic pricing after inspection" />
      <div className="service-card-grid">
        {VEHICLE_SERVICES.map((service, i) => (
          <motion.div
            key={service.id}
            className="luxury-card"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            onClick={() => selectService(service)}
            role="button"
            tabIndex={0}
          >
            <h3>
              {service.name}
              {service.aiTag && <span className="ai-tag">AI · {service.aiTag}</span>}
            </h3>
            <p className="muted">{service.time} · {service.price}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
