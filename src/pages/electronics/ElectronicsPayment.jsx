import PaymentPage from "../../components/PaymentPage";
import { getElectronicsCategory } from "../../data/electronics";

export default function ElectronicsPayment() {
  return (
    <PaymentPage
      type="electronics"
      title="Payment"
      buildPayload={({ category }, booking) => {
        const cat = getElectronicsCategory(category);
        return {
          category,
          vehicle: cat?.name || category,
          service: booking?.service?.name,
          center: booking?.center,
        };
      }}
    />
  );
}
