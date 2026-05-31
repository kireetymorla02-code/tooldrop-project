import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineMapPin } from "react-icons/hi2";
import { useCustomer } from "../context/CustomerProvider";
import PageHeader from "../components/PageHeader";

export default function LocationSetup() {
  const navigate = useNavigate();
  const { setLocation } = useCustomer();
  const [manual, setManual] = useState({ city: "Hyderabad", area: "", pincode: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const saveAndContinue = (loc) => {
    setLocation(loc);
    navigate("/app/home", { replace: true });
  };

  const useGps = () => {
    setLoading(true);
    setError("");
    if (!navigator.geolocation) {
      setError("GPS not supported. Enter location manually.");
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      () => {
        saveAndContinue({
          label: "Current Location",
          city: "Hyderabad",
          area: "GPS Detected",
          lat: null,
          lng: null,
          source: "gps",
        });
        setLoading(false);
      },
      () => {
        setError("Location permission denied. Enter manually.");
        setLoading(false);
      },
      { timeout: 8000 }
    );
  };

  const submitManual = (e) => {
    e.preventDefault();
    if (!manual.city.trim()) {
      setError("City is required");
      return;
    }
    saveAndContinue({
      label: `${manual.area || manual.city}, ${manual.city}`,
      city: manual.city,
      area: manual.area,
      pincode: manual.pincode,
      source: "manual",
    });
  };

  return (
    <div className="location-page">
      <PageHeader
        eyebrow="Location"
        title="Where should we serve you?"
        subtitle="Used for nearby centers, pickup ETA, AI pricing & recommendations"
      />

      <div className="location-grid">
        <button type="button" className="location-card" onClick={useGps} disabled={loading}>
          <HiOutlineMapPin size={32} />
          <h3>Use GPS</h3>
          <p>Detect your current location automatically</p>
        </button>

        <form className="location-card form-panel" onSubmit={submitManual}>
          <h3>Enter Manually</h3>
          <label>City</label>
          <input value={manual.city} onChange={(e) => setManual({ ...manual, city: e.target.value })} />
          <label>Area / Locality</label>
          <input value={manual.area} onChange={(e) => setManual({ ...manual, area: e.target.value })} placeholder="Banjara Hills" />
          <label>Pincode</label>
          <input value={manual.pincode} onChange={(e) => setManual({ ...manual, pincode: e.target.value })} />
          {error && <p className="auth-error">{error}</p>}
          <button type="submit" className="glass-btn" style={{ marginTop: 16 }}>
            Save Location
          </button>
        </form>
      </div>
    </div>
  );
}
