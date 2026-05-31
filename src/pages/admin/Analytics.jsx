export default function Analytics() {
  return (
    <div className="admin-panel-grid">
      <div className="admin-luxury-card">
        <h3>Revenue Trend</h3>
        <p style={{ color: "#888" }}>Demo chart · +18% month over month</p>
        <div
          style={{
            marginTop: 16,
            height: 120,
            borderRadius: 12,
            background: "linear-gradient(90deg, #c40000 0%, transparent 100%)",
            opacity: 0.4,
          }}
        />
      </div>
      <div className="admin-luxury-card">
        <h3>Ratings</h3>
        <p style={{ fontSize: "2rem", margin: "12px 0" }}>4.8</p>
        <p style={{ color: "#888" }}>Across 2,400+ verified reviews</p>
      </div>
      <div className="admin-luxury-card">
        <h3>AI Diagnostics</h3>
        <p style={{ color: "#888" }}>142 reports generated this week</p>
      </div>
    </div>
  );
}
