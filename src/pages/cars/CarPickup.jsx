import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function CarPickup() {
  const { brand } = useParams();
  const navigate = useNavigate();
  const [emergency, setEmergency] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/app/cars/${brand}/payment`);
  };

  return (
    <div>
      <header className="page-header">
        <h1>Schedule Pickup</h1>
        <p>Doorstep collection with live transparency</p>
      </header>

      <form className="form-panel" onSubmit={handleSubmit}>
        <label htmlFor="address">Pickup address</label>
        <input id="address" type="text" placeholder="Full address" required />

        <label htmlFor="date">Date</label>
        <input id="date" type="date" required />

        <label htmlFor="time">Time slot</label>
        <select id="time" required>
          <option value="">Select slot</option>
          <option>09:00 – 11:00</option>
          <option>11:00 – 13:00</option>
          <option>14:00 – 16:00</option>
          <option>16:00 – 18:00</option>
        </select>

        <label htmlFor="notes">Vehicle notes</label>
        <textarea id="notes" rows={3} placeholder="Keys, dents, special instructions..." />

        <label style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 16 }}>
          <input
            type="checkbox"
            checked={emergency}
            onChange={(e) => setEmergency(e.target.checked)}
          />
          Emergency request
        </label>

        <div className="fee-banner">
          Pickup fee (demo): <strong>₹200</strong>
          {emergency && " · Priority surcharge may apply"}
        </div>

        <button type="submit" className="glass-btn" style={{ marginTop: 20 }}>
          Continue to Payment
        </button>
      </form>
    </div>
  );
}
