import { CAR_BRAND_LIST } from "./carBrands";
import { buildCarModels } from "../utils/modelFactory";

export { CAR_BRAND_LIST as CAR_BRANDS, getCarBrand } from "./carBrands";

export const CAR_MODELS = {
  audi: buildCarModels("audi", "Audi", [
    { id: "a4", name: "A4", year: 2022, fuel: "Petrol", mileage: "18k km", health: "Good", popular: true, recent: true, image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=600&q=80" },
    { id: "a6", name: "A6", year: 2023, fuel: "Diesel", mileage: "12k km", health: "Excellent", popular: true, image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=600&q=80" },
    { id: "q5", name: "Q5", year: 2021, fuel: "Petrol", mileage: "24k km", health: "Good", popular: true, image: "https://images.unsplash.com/photo-1617814076668-8f0ca57593b4?auto=format&fit=crop&w=600&q=80" },
    { id: "q7", name: "Q7", year: 2020, fuel: "Diesel", mileage: "35k km", health: "Fair", image: "https://images.unsplash.com/photo-1617814076668-8f0ca57593b4?auto=format&fit=crop&w=600&q=80" },
    { id: "r8", name: "R8", year: 2024, fuel: "Petrol", mileage: "5k km", health: "Excellent", image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=600&q=80" },
    { id: "rs7", name: "RS7", year: 2023, fuel: "Petrol", mileage: "9k km", health: "Excellent", popular: true, recent: true, image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=600&q=80" },
  ]),
  mercedes: buildCarModels("mercedes", "Mercedes-Benz", [
    { id: "c-class", name: "C-Class", year: 2023, fuel: "Petrol", mileage: "14k km", health: "Excellent", popular: true, image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=600&q=80" },
    { id: "e-class", name: "E-Class", year: 2022, fuel: "Diesel", mileage: "22k km", health: "Good", recent: true, image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=600&q=80" },
    { id: "s-class", name: "S-Class", year: 2024, fuel: "Petrol", mileage: "6k km", health: "Excellent", popular: true, image: "https://images.unsplash.com/photo-1631290243538-127af49d4b1e?auto=format&fit=crop&w=600&q=80" },
  ]),
  bmw: buildCarModels("bmw", "BMW", [
    { id: "x5", name: "X5", year: 2022, fuel: "Diesel", mileage: "20k km", health: "Good", popular: true, image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=600&q=80" },
    { id: "m4", name: "M4", year: 2024, fuel: "Petrol", mileage: "6k km", health: "Excellent", popular: true, recent: true, image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=600&q=80" },
  ]),
};

export function getCarModels(brandId) {
  const brand = CAR_BRAND_LIST.find((b) => b.id === brandId);
  if (CAR_MODELS[brandId]) return CAR_MODELS[brandId];
  return buildCarModels(brandId, brand?.name || brandId);
}

export const VEHICLE_SERVICES = [
  { id: "full", name: "Full Service", time: "4–6 hrs", price: "₹8k–15k", aiTag: "Recommended", category: "vehicle" },
  { id: "oil", name: "Oil Change", time: "1 hr", price: "₹2k–4k", category: "vehicle" },
  { id: "brake", name: "Brake Service", time: "2–3 hrs", price: "₹3k–8k", category: "vehicle" },
  { id: "tire", name: "Tyre Change", time: "2 hrs", price: "₹3k–8k", category: "vehicle" },
  { id: "battery", name: "Battery Replacement", time: "45 min", price: "₹2k–6k", category: "vehicle" },
  { id: "engine", name: "Engine Repair", time: "2–4 days", price: "₹10k–80k", category: "vehicle" },
  { id: "electrical", name: "Electrical Repair", time: "3–6 hrs", price: "₹2k–15k", category: "vehicle" },
  { id: "checkup", name: "General Checkup", time: "2 hrs", price: "₹1.5k–3k", aiTag: "Smart", category: "vehicle" },
  { id: "alignment", name: "Wheel Alignment", time: "1.5 hrs", price: "₹1k–2.5k", category: "vehicle" },
  { id: "ac", name: "AC Service", time: "3 hrs", price: "₹2k–8k", category: "vehicle" },
  { id: "insurance", name: "Insurance Inspection", time: "2 hrs", price: "As per policy", category: "vehicle" },
  { id: "roadside", name: "Roadside Assistance", time: "30–60 min", price: "₹1.5k+", aiTag: "Urgent", category: "vehicle" },
];

export const CAR_SERVICES = VEHICLE_SERVICES;

export const ORDER_TRACKING_STEPS = [
  "Order Created",
  "Pickup Assigned",
  "Pickup En Route",
  "Collected",
  "At Service Center",
  "Inspection",
  "Waiting Approval",
  "Repair Started",
  "Repair Completed",
  "Ready For Delivery",
  "Delivered",
];

export const PICKUP_FEE = 200;

export const DEFAULT_MODEL = (brandName, banner) => ({
  id: "default",
  name: `${brandName} Series`,
  year: 2023,
  fuel: "Petrol",
  mileage: "15k km",
  health: "Good",
  image: banner,
});
