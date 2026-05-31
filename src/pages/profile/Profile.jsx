import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import { useAuth } from "../../context/AuthProvider";
import { useCustomer } from "../../context/CustomerProvider";

export default function Profile() {
  const { user, role, logout } = useAuth();
  const { vehicles, devices, location, loyaltyPoints, orders } = useCustomer();

  return (
    <div>
      <PageHeader eyebrow="Account" title="Profile" subtitle="Personal details · saved assets · rewards" />

      <div className="profile-grid">
        <section className="dash-panel">
          <h3>Personal Details</h3>
          {user?.profile_image && (
            <img src={user.profile_image} alt="" className="profile-avatar" />
          )}
          <p><strong>{user?.name || "—"}</strong></p>
          <p className="muted">{user?.email || user?.phone}</p>
          <p className="muted">{user?.address}, {user?.city}</p>
          <p className="muted">Service location: {location?.label || "Not set"}</p>
          {!user?.profile_complete && (
            <Link to="/profile/setup" className="glass-btn" style={{ marginTop: 12, display: "inline-block", width: "auto", padding: "10px 18px" }}>
              Complete Profile
            </Link>
          )}
        </section>

        <section className="dash-panel">
          <h3>Rewards</h3>
          <p><strong>{loyaltyPoints.toLocaleString()}</strong> loyalty points</p>
          <Link to="/app/rewards" className="tab-btn" style={{ marginTop: 8, display: "inline-block" }}>View Rewards</Link>
        </section>

        <section className="dash-panel">
          <h3>Saved Vehicles ({vehicles.length})</h3>
          {vehicles.length ? vehicles.map((v) => (
            <p key={v.id}>{v.brand} {v.model}</p>
          )) : <p className="muted">No vehicles saved yet</p>}
          <Link to="/app/cars" className="tab-btn" style={{ marginTop: 8, display: "inline-block" }}>Add via booking</Link>
        </section>

        <section className="dash-panel">
          <h3>Saved Devices ({devices.length})</h3>
          {devices.length ? devices.map((d) => (
            <p key={d.id}>{d.category} · {d.brand}</p>
          )) : <p className="muted">No devices saved yet</p>}
          <Link to="/app/electronics" className="tab-btn" style={{ marginTop: 8, display: "inline-block" }}>Book electronics service</Link>
        </section>

        <section className="dash-panel">
          <h3>Order History</h3>
          <p>{orders.length} active · view full history</p>
          <Link to="/app/orders/history" className="tab-btn" style={{ marginTop: 8, display: "inline-block" }}>Payment & Order History</Link>
        </section>

        <section className="dash-panel">
          <h3>Account</h3>
          <p className="muted">Role: {role}</p>
          <Link to="/app/settings" className="tab-btn" style={{ marginTop: 8, display: "inline-block" }}>Settings</Link>
          <button type="button" className="tab-btn" style={{ marginTop: 8, marginLeft: 8 }} onClick={logout}>Sign out</button>
        </section>
      </div>
    </div>
  );
}
