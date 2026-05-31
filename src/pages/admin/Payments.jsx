const PAYMENTS = [
  { id: "PAY-901", center: "ToolDrop Premium Hub", amount: "₹42,000", status: "Settled" },
  { id: "PAY-902", center: "Elite Auto Care", amount: "₹18,500", status: "Pending" },
];

export default function Payments() {
  return (
    <div>
      <header className="page-header" style={{ color: "#fff" }}>
        <h1>Payments</h1>
        <p style={{ color: "#999" }}>Settlement & digital billing</p>
      </header>
      <div className="admin-panel-grid">
        {PAYMENTS.map((p) => (
          <div key={p.id} className="admin-luxury-card">
            <strong>{p.id}</strong>
            <p style={{ color: "#bbb", margin: "8px 0" }}>{p.center}</p>
            <p style={{ fontSize: "1.2rem", margin: "8px 0" }}>{p.amount}</p>
            <span className="ai-tag">{p.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
