import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { updateUserProfile } from "../../services/authService";
import { useCustomer } from "../../context/CustomerProvider";
import { getPostAuthRoute } from "../../constants/routes";

export default function ProfileSetup() {
  const navigate = useNavigate();
  const { token, user, establishSession, role } = useAuth();
  const { hasLocation } = useCustomer();
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: user?.city || "",
    state: user?.state || "",
    pincode: user?.pincode || "",
    profile_image: user?.profile_image || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError("Name is required");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const { user: updated } = await updateUserProfile(token, form);
      establishSession({ token, user: updated });
      navigate(getPostAuthRoute(role, true, hasLocation), { replace: true });
    } catch (err) {
      setError(err.message || "Could not save profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <header className="page-header">
        <h1>Complete Your Profile</h1>
        <p>Secure storage · deployment-ready user records</p>
      </header>

      <form className="form-panel" onSubmit={handleSubmit}>
        <label htmlFor="name">Full name *</label>
        <input id="name" value={form.name} onChange={(e) => update("name", e.target.value)} required />

        <label htmlFor="email">Email</label>
        <input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} />

        <label htmlFor="phone">Phone</label>
        <input id="phone" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} />

        <label htmlFor="address">Address</label>
        <input id="address" value={form.address} onChange={(e) => update("address", e.target.value)} />

        <label htmlFor="city">City</label>
        <input id="city" value={form.city} onChange={(e) => update("city", e.target.value)} />

        <label htmlFor="state">State</label>
        <input id="state" value={form.state} onChange={(e) => update("state", e.target.value)} />

        <label htmlFor="pincode">Pincode</label>
        <input id="pincode" value={form.pincode} onChange={(e) => update("pincode", e.target.value)} />

        <label htmlFor="profile_image">Profile image URL</label>
        <input
          id="profile_image"
          value={form.profile_image}
          onChange={(e) => update("profile_image", e.target.value)}
          placeholder="https://..."
        />

        {error && <p className="auth-error">{error}</p>}

        <button type="submit" className="glass-btn" style={{ marginTop: 20 }} disabled={loading}>
          {loading ? "Saving…" : "Save & Continue"}
        </button>
      </form>
    </div>
  );
}
