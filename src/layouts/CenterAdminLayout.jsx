import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { apiGet } from "../services/api";
import CenterSetupRequired from "../pages/center/CenterSetupRequired";

const NAV = [
  { to: "/center", label: "Dashboard", end: true },
  { to: "/center/orders", label: "Current Orders" },
  { to: "/center/pickups", label: "Pickup Requests" },
  { to: "/center/mechanics", label: "Mechanics" },
];

export default function CenterAdminLayout() {
  const navigate = useNavigate();
  const { logout, user, token } = useAuth();
  const [centerName, setCenterName] = useState("Service Center");

  useEffect(() => {
    if (!token) return;
    apiGet("/center/me", token)
      .then((data) => setCenterName(data.center?.name || "Service Center"))
      .catch(() => {});
  }, [token]);

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h1>TOOLDROP</h1>
        <p style={{ color: "#888", fontSize: "0.8rem", margin: "6px 0 28px" }}>
          Service Center Admin
        </p>
        <nav style={{ flex: 1 }}>
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `admin-link ${isActive ? "active" : ""}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => {
            logout();
            navigate("/splash");
          }}
          style={{
            marginTop: 20,
            padding: 12,
            border: "none",
            borderRadius: 10,
            background: "#222",
            color: "white",
            cursor: "pointer",
          }}
        >
          Sign out
        </button>
      </aside>
      <div className="admin-main">
        <header style={{ marginBottom: 24 }}>
          <h2 style={{ margin: "0 0 6px" }}>{user?.name || "Center Admin"}</h2>
          <p style={{ margin: 0, color: "#999" }}>{centerName} · Operations console</p>
        </header>
        <CenterSetupRequired />
        <Outlet />
      </div>
    </div>
  );
}
