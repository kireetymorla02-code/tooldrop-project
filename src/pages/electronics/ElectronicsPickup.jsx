import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import { PICKUP_FEE } from "../../data/cars";
import { useCustomer } from "../../context/CustomerProvider";

export default function ElectronicsPickup() {
  const { category } = useParams();
  const navigate = useNavigate();
  const { activeBooking, startBooking } = useCustomer();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    startBooking({
      ...activeBooking,
      pickup: { address: form.get("address"), date: form.get("date"), slot: form.get("slot"), notes: form.get("notes") },
    });
    navigate(`/app/electronics/${category}/payment`);
  };

  return (
    <div>
      <PageHeader title="Schedule Pickup" subtitle="Device collection · ₹200 pickup fee" />
      <form className="form-panel" onSubmit={handleSubmit}>
        <label htmlFor="address">Address</label>
        <input id="address" name="address" required />
        <label htmlFor="date">Date</label>
        <input id="date" name="date" type="date" required />
        <label htmlFor="slot">Slot</label>
        <select id="slot" name="slot" required>
          <option value="">Select</option>
          <option>09:00 – 11:00</option>
          <option>14:00 – 16:00</option>
        </select>
        <label htmlFor="notes">Device notes</label>
        <textarea id="notes" name="notes" rows={2} placeholder="Model, issue description…" />
        <div className="fee-banner">Pickup fee: <strong>₹{PICKUP_FEE}</strong></div>
        <button type="submit" className="glass-btn">Continue</button>
      </form>
    </div>
  );
}
