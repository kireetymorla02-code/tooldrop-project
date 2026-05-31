import { useAuth } from "../../context/AuthProvider";

export default function Profile() {
  const { phone, role } = useAuth();

  return (
    <div>
      <header className="page-header">
        <h1>Profile</h1>
        <p>Account & vehicle preferences</p>
      </header>
      <div className="glass-box" style={{ maxWidth: 420, textAlign: "left" }}>
        <p>
          <strong>Role:</strong> {role}
        </p>
        <p>
          <strong>Phone:</strong> {phone || "—"}
        </p>
      </div>
    </div>
  );
}
