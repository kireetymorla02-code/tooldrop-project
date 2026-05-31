import { useNavigate } from "react-router-dom";
import ServiceCard from "../components/ServiceCard";

const SERVICES = [
  {
    id: "cars",
    title: "Cars",
    subtitle: "Premium automotive care",
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80",
    path: "/app/cars",
  },
  {
    id: "bikes",
    title: "Bikes",
    subtitle: "Performance bike servicing",
    image:
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80",
    path: "/app/bikes",
  },
  {
    id: "electronics",
    title: "Electronics",
    subtitle: "Smart device experts",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1200&q=80",
    path: "/app/electronics",
  },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-page">
      <div className="dashboard-ambient" aria-hidden />
      <header className="dashboard-hero">
        <p className="dashboard-eyebrow">ToolDrop</p>
        <h1>AI Powered Premium Service Ecosystem</h1>
        <p className="dashboard-lead">
          Mercedes-inspired clarity. Rolls Royce luxury. Choose your service
          universe.
        </p>
      </header>
      <div className="service-grid">
        {SERVICES.map((service, index) => (
          <ServiceCard
            key={service.id}
            title={service.title}
            subtitle={service.subtitle}
            image={service.image}
            index={index}
            onClick={() => navigate(service.path)}
          />
        ))}
      </div>
    </div>
  );
}
