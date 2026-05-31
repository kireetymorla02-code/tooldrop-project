import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { useAuth } from "../../context/AuthProvider";
import { apiGet } from "../../services/api";

export default function CenterSetupRequired() {
  const { token } = useAuth();
  const [checking, setChecking] = useState(true);
  const [assigned, setAssigned] = useState(true);

  useEffect(() => {
    apiGet("/center/me", token)
      .then((data) => setAssigned(Boolean(data.center)))
      .catch(() => setAssigned(false))
      .finally(() => setChecking(false));
  }, [token]);

  if (checking) return <Loader label="Loading center profile…" />;

  if (assigned) return null;

  return (
    <div className="center-setup-banner">
      <h3>Center not linked</h3>
      <p className="muted">
        Your account needs a service center assignment. Run{" "}
        <code>npm run server:seed</code> in development, or contact ToolDrop support.
      </p>
      <Link to="/splash" className="tab-btn" style={{ marginTop: 12, display: "inline-block" }}>
        Sign out & try again
      </Link>
    </div>
  );
}
