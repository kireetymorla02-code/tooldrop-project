export default function StatusTimeline({ steps, activeIndex = 2 }) {
  return (
    <ol
      className="status-timeline"
      style={{
        listStyle: "none",
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      {steps.map((step, index) => {
        const done = index <= activeIndex;
        return (
          <li
            key={step}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              opacity: done ? 1 : 0.45,
            }}
          >
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: done ? "var(--accent)" : "var(--border-strong)",
                boxShadow: done ? "var(--shadow-glow)" : "none",
              }}
            />
            <span style={{ fontSize: "0.95rem" }}>{step}</span>
          </li>
        );
      })}
    </ol>
  );
}
