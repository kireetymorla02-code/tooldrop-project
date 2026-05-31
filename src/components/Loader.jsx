export default function Loader({ label = "Loading...", inline = false }) {
  const spinner = (
    <div
      style={{
        width: inline ? 16 : 48,
        height: inline ? 16 : 48,
        border: "3px solid var(--border-subtle)",
        borderTopColor: "var(--accent)",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
        display: inline ? "inline-block" : "block",
        verticalAlign: inline ? "middle" : undefined,
      }}
    />
  );

  if (inline) {
    return (
      <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
        {spinner}
        {label}
      </span>
    );
  }

  return (
    <div
      className="loader"
      role="status"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        padding: 48,
      }}
    >
      {spinner}
      <span style={{ color: "var(--text-secondary)", letterSpacing: 1 }}>{label}</span>
    </div>
  );
}
