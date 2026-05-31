const REVIEWS = [
  { user: "Arjun K.", rating: 5, text: "Transparent part verification — excellent." },
  { user: "Priya M.", rating: 4, text: "Pickup on time, live tracking was smooth." },
];

export default function Reviews() {
  return (
    <div className="admin-panel-grid">
      {REVIEWS.map((r) => (
        <div key={r.user} className="admin-luxury-card">
          <strong>{r.user}</strong>
          <p style={{ color: "#c40000", margin: "6px 0" }}>{"★".repeat(r.rating)}</p>
          <p style={{ color: "#ccc", margin: 0, lineHeight: 1.5 }}>{r.text}</p>
        </div>
      ))}
    </div>
  );
}
