import PageHeader from "../../components/PageHeader";

const MECHANICS = [
  { name: "Arjun Reddy", specialty: "Luxury · German cars", status: "Available", rating: 4.9 },
  { name: "Priya Sharma", specialty: "EV · Diagnostics", status: "On job", rating: 4.8 },
  { name: "Rahul Verma", specialty: "Body shop · Insurance", status: "Available", rating: 4.7 },
  { name: "Kiran Das", specialty: "Electronics · ECU", status: "Break", rating: 4.6 },
];

export default function CenterMechanics() {
  return (
    <div>
      <PageHeader eyebrow="Workforce" title="Mechanics" subtitle="Certified technicians · live availability" />

      <div className="admin-panel-grid">
        {MECHANICS.map((m) => (
          <div key={m.name} className="admin-luxury-card">
            <h3 style={{ margin: "0 0 8px" }}>{m.name}</h3>
            <p style={{ color: "#bbb", margin: "0 0 8px" }}>{m.specialty}</p>
            <span className="health-badge">{m.status}</span>
            <p style={{ margin: "12px 0 0", color: "#888" }}>★ {m.rating}</p>
            <button type="button" className="tab-btn" style={{ marginTop: 12 }}>
              Assign to order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
