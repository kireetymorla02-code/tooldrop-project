import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import { PICKUP_FEE } from "../../data/cars";
import { useCustomer } from "../../context/CustomerProvider";

export default function BikePickup() {
  const { brand, model } = useParams();
  const navigate = useNavigate();
  const { activeBooking, startBooking } = useCustomer();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    startBooking({
      ...activeBooking,
      pickup: { address: form.get("address"), date: form.get("date"), slot: form.get("slot"), notes: form.get("notes") },
    });
    navigate(`/app/bikes/${brand}/${model}/payment`);
  };

  return (
    <div>
      <PageHeader title="Schedule Pickup" subtitle="Bike collection · ₹200 pickup fee" />
      <form className="form-panel" onSubmit={handleSubmit}>
        <label htmlFor="address">Pickup address</label>
        <input id="address" name="address" required />
        <label htmlFor="date">Date</label>
        <input id="date" name="date" type="date" required />
        <label htmlFor="slot">Time slot</label>
        <select id="slot" name="slot" required>
          <option value="">Select</option>
          <option>09:00 – 11:00</option>
          <option>14:00 – 16:00</option>
        </select>
        <div className="fee-banner">Pickup fee: <strong>₹{PICKUP_FEE}</strong></div>
        <button type="submit" className="glass-btn">Continue to Payment</button>
      </form>
    </div>
  );
}
