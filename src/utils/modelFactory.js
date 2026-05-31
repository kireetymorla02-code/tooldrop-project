const CAR_SUFFIXES = ["Base", "Premium", "Sport", "Luxury", "EV", "Hybrid", "S", "X", "Pro"];
const BIKE_SUFFIXES = ["Standard", "Touring", "Adventure", "Sport", "Classic", "Pro"];

export function buildCarModels(brandId, brandName, custom = []) {
  if (custom.length) return custom;
  return CAR_SUFFIXES.map((suffix, i) => ({
    id: `${brandId}-${suffix.toLowerCase().replace(/\s/g, "-")}`,
    name: `${brandName} ${suffix}`,
    year: 2019 + (i % 6),
    fuel: i % 3 === 0 ? "Electric" : i % 2 ? "Petrol" : "Diesel",
    mileage: `${8 + i * 3}k km`,
    health: i > 5 ? "Excellent" : i > 3 ? "Good" : "Fair",
    popular: i < 3,
    recent: i === 2 || i === 5,
    image: `https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=600&q=80&sig=${brandId}${i}`,
  }));
}

export function buildBikeModels(brandId, brandName, custom = []) {
  if (custom.length) return custom;
  return BIKE_SUFFIXES.map((suffix, i) => ({
    id: `${brandId}-${suffix.toLowerCase()}`,
    name: `${brandName} ${suffix}`,
    year: 2020 + (i % 5),
    fuel: "Petrol",
    mileage: `${5 + i * 4}k km`,
    health: i > 3 ? "Good" : "Excellent",
    popular: i < 2,
    image: `https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=600&q=80&sig=${brandId}${i}`,
  }));
}
