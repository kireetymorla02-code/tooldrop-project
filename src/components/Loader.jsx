export default function Loader({ label = "Loading..." }) {
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
      <div
        style={{
          width: 48,
          height: 48,
          border: "3px solid var(--border-subtle)",
          borderTopColor: "var(--accent)",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <span style={{ color: "var(--text-secondary)", letterSpacing: 1 }}>{label}</span>
    </div>
  );
}
