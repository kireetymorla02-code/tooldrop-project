import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import PageHeader from "../components/PageHeader";

export default function Settings() {
  return (
    <div>
      <PageHeader eyebrow="Preferences" title="Settings" subtitle="Theme · notifications · account" />

      <div className="settings-sections">
        <section className="form-panel">
          <h3>Appearance</h3>
          <ThemeToggle />
        </section>

        <section className="form-panel">
          <h3>Language</h3>
          <select defaultValue="en">
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="te">Telugu</option>
          </select>
        </section>

        <section className="form-panel">
          <h3>Notifications</h3>
          <label><input type="checkbox" defaultChecked /> Pickup & delivery updates</label>
          <label><input type="checkbox" defaultChecked /> Inspection & repair status</label>
          <label><input type="checkbox" /> Promotions & rewards</label>
          <Link to="/app/notifications" className="tab-btn" style={{ marginTop: 12, display: "inline-block" }}>
            Open notification center
          </Link>
        </section>

        <section className="form-panel">
          <h3>Help & account</h3>
          <Link to="/profile/setup" className="tab-btn">Edit profile</Link>
          <Link to="/app/support" className="tab-btn" style={{ marginLeft: 8 }}>Support</Link>
          <Link to="/app/faq" className="tab-btn" style={{ marginLeft: 8 }}>FAQ</Link>
        </section>
      </div>
    </div>
  );
}
