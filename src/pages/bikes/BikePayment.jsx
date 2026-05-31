import PaymentPage from "../../components/PaymentPage";

export default function BikePayment() {
  return (
    <PaymentPage
      type="bike"
      title="Payment"
      buildPayload={({ brand, model }, booking) => ({
        brand,
        model,
        vehicle: `${brand} ${model}`,
        service: booking?.service?.name,
        center: booking?.center,
      })}
    />
  );
}
