import ThemeToggle from "../components/ThemeToggle";

export default function Settings() {
  return (
    <div>
      <header className="page-header">
        <h1>Settings</h1>
        <p>Preferences & notifications</p>
      </header>
      <div className="form-panel">
        <h3 style={{ marginTop: 0 }}>Appearance</h3>
        <ThemeToggle />
        <label style={{ marginTop: 20 }}>Notifications</label>
        <select defaultValue="all">
          <option value="all">All updates</option>
          <option value="critical">Critical only</option>
        </select>
      </div>
    </div>
  );
}
