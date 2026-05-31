import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const ADMIN_NAV = [
  { to: "/admin", label: "Overview", end: true },
  { to: "/admin/orders", label: "Current Orders" },
  { to: "/admin/payments", label: "Payments" },
  { to: "/admin/reviews", label: "Reviews" },
  { to: "/admin/analytics", label: "Analytics" },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const { logout, phone } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/splash", { replace: true });
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h1>TOOLDROP</h1>
        <p style={{ color: "#888", fontSize: "0.8rem", margin: "6px 0 28px" }}>
          Admin Control
        </p>
        <nav style={{ flex: 1 }}>
          {ADMIN_NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `admin-link ${isActive ? "active" : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button
          type="button"
          onClick={handleLogout}
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
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <div>
            <h2 style={{ margin: "0 0 6px" }}>Operations Dashboard</h2>
            <p style={{ margin: 0, color: "#999" }}>
              Signed in · {phone || "Admin session"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/app/home")}
            style={{
              padding: "10px 18px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.15)",
              background: "transparent",
              color: "white",
              cursor: "pointer",
            }}
          >
            User App
          </button>
        </header>
        <Outlet />
      </div>
    </div>
  );
}
