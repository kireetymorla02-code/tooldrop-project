import { buildBikeModels } from "../utils/modelFactory";

export const BIKE_BRANDS = [
  { id: "aprilia", name: "Aprilia", country: "Italy", banner: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80" },
  { id: "bajaj", name: "Bajaj", country: "India", banner: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80" },
  { id: "benelli", name: "Benelli", country: "Italy", banner: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80" },
  { id: "bmw-motorrad", name: "BMW Motorrad", country: "Germany", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg", banner: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80" },
  { id: "ducati", name: "Ducati", country: "Italy", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Ducati_red_logo.svg", banner: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80" },
  { id: "harley-davidson", name: "Harley Davidson", country: "USA", banner: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80" },
  { id: "hero", name: "Hero", country: "India", banner: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80" },
  { id: "honda", name: "Honda", country: "Japan", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Honda_Logo.svg", banner: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80" },
  { id: "husqvarna", name: "Husqvarna", country: "Sweden", banner: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80" },
  { id: "kawasaki", name: "Kawasaki", country: "Japan", logo: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Kawasaki_logo.svg", banner: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80" },
  { id: "ktm", name: "KTM", country: "Austria", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3f/KTM-Logo.svg", banner: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80" },
  { id: "royal-enfield", name: "Royal Enfield", country: "India", logo: "https://upload.wikimedia.org/wikipedia/en/8/8b/Royal_Enfield_logo.svg", banner: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80" },
  { id: "suzuki", name: "Suzuki", country: "Japan", logo: "https://upload.wikimedia.org/wikipedia/commons/1/12/Suzuki_logo_2.svg", banner: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80" },
  { id: "triumph", name: "Triumph", country: "UK", banner: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80" },
  { id: "tvs", name: "TVS", country: "India", banner: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80" },
  { id: "yamaha", name: "Yamaha", country: "Japan", logo: "https://upload.wikimedia.org/wikipedia/commons/4/41/Yamaha_Motor_Logo.svg", banner: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80" },
].sort((a, b) => a.name.localeCompare(b.name));

export const BIKE_MODELS = {
  "royal-enfield": buildBikeModels("royal-enfield", "Royal Enfield", [
    { id: "classic", name: "Classic 350", year: 2023, fuel: "Petrol", mileage: "8k km", health: "Good", popular: true, image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=600&q=80" },
    { id: "himalayan", name: "Himalayan", year: 2022, fuel: "Petrol", mileage: "15k km", health: "Good", recent: true, image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=600&q=80" },
    { id: "interceptor", name: "Interceptor 650", year: 2024, fuel: "Petrol", mileage: "4k km", health: "Excellent", popular: true, image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=600&q=80" },
  ]),
  ktm: buildBikeModels("ktm", "KTM", [
    { id: "duke-390", name: "Duke 390", year: 2023, fuel: "Petrol", mileage: "6k km", health: "Excellent", popular: true, image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=600&q=80" },
  ]),
};

export function getBikeBrand(id) {
  return BIKE_BRANDS.find((b) => b.id === id);
}

export function getBikeModels(brandId) {
  const brand = getBikeBrand(brandId);
  if (BIKE_MODELS[brandId]) return BIKE_MODELS[brandId];
  return buildBikeModels(brandId, brand?.name || brandId);
}

export const BIKE_SERVICES = [
  { id: "full", name: "Full Service", time: "3 hrs", price: "₹2k–5k", aiTag: "Recommended" },
  { id: "chain", name: "Chain & Sprocket", time: "2 hrs", price: "₹1.5k–4k" },
  { id: "oil", name: "Oil Change", time: "45 min", price: "₹800–1.5k" },
  { id: "brake", name: "Brake Service", time: "1.5 hrs", price: "₹1k–3k" },
  { id: "tyre", name: "Tyre Change", time: "1 hr", price: "₹1.5k–4k" },
  { id: "electrical", name: "Electrical Repair", time: "2 hrs", price: "₹1k–5k" },
  { id: "roadside", name: "Roadside Assistance", time: "30 min", price: "₹800+", aiTag: "Urgent" },
];
