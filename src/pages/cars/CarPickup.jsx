import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import { PICKUP_FEE } from "../../data/cars";
import { useCustomer } from "../../context/CustomerProvider";

export default function CarPickup() {
  const { brand, model } = useParams();
  const navigate = useNavigate();
  const { activeBooking, startBooking } = useCustomer();
  const [emergency, setEmergency] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    startBooking({
      ...activeBooking,
      pickup: {
        address: form.get("address"),
        date: form.get("date"),
        slot: form.get("slot"),
        notes: form.get("notes"),
        emergency,
      },
    });
    navigate(`/app/cars/${brand}/${model}/payment`);
  };

  return (
    <div>
      <PageHeader title="Schedule Pickup" subtitle="Doorstep collection · live transparency from pickup to delivery" />

      <div className="pickup-status-banner">
        <p><strong>Driver:</strong> Will be assigned after payment</p>
        <p><strong>Pickup fee:</strong> ₹{PICKUP_FEE} only (remaining after inspection)</p>
      </div>

      <form className="form-panel" onSubmit={handleSubmit}>
        <label htmlFor="address">Pickup address</label>
        <input id="address" name="address" required placeholder="Full address with landmark" />

        <label htmlFor="date">Date</label>
        <input id="date" name="date" type="date" required />

        <label htmlFor="slot">Time slot</label>
        <select id="slot" name="slot" required>
          <option value="">Select slot</option>
          <option>09:00 – 11:00</option>
          <option>11:00 – 13:00</option>
          <option>14:00 – 16:00</option>
          <option>16:00 – 18:00</option>
        </select>

        <label htmlFor="notes">Vehicle notes</label>
        <textarea id="notes" name="notes" rows={3} placeholder="Keys location, dents, special instructions…" />

        <label style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 16 }}>
          <input type="checkbox" checked={emergency} onChange={(e) => setEmergency(e.target.checked)} />
          Emergency / priority pickup
        </label>

        <div className="fee-banner">
          Pickup fee: <strong>₹{PICKUP_FEE}</strong> · Final service cost generated after inspection
        </div>

        <button type="submit" className="glass-btn" style={{ marginTop: 20 }}>
          Continue to Payment
        </button>
      </form>
    </div>
  );
}
