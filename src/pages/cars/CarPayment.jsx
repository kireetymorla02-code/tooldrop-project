import PaymentPage from "../../components/PaymentPage";

export default function CarPayment() {
  return (
    <PaymentPage
      type="car"
      title="Payment"
      buildPayload={({ brand, model }, booking) => ({
        brand,
        model,
        vehicle: `${brand} ${model}`,
        service: booking?.service?.name || "Service",
        center: booking?.center,
      })}
    />
  );
}
