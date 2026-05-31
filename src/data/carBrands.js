/** Premium car brands A–Z with hero imagery */
const IMG = (id) =>
  `https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80&sig=${id}`;

export const CAR_BRAND_LIST = [
  { id: "acura", name: "Acura", country: "Japan", description: "Precision crafted performance luxury.", banner: IMG("acura") },
  { id: "audi", name: "Audi", country: "Germany", description: "Vorsprung durch Technik — advanced quattro engineering.", banner: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800&q=80", logo: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Audi_logo_detail.svg" },
  { id: "bentley", name: "Bentley", country: "UK", description: "Extraordinary journeys in handcrafted luxury.", banner: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7f/Bentley_logo.svg" },
  { id: "bmw", name: "BMW", country: "Germany", description: "The ultimate driving machine.", banner: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg" },
  { id: "bugatti", name: "Bugatti", country: "France", description: "Hypercar artistry and unmatched performance.", banner: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=800&q=80" },
  { id: "chevrolet", name: "Chevrolet", country: "USA", description: "Find new roads with American engineering.", banner: IMG("chevrolet") },
  { id: "ferrari", name: "Ferrari", country: "Italy", description: "Racing DNA for the road.", banner: "https://images.unsplash.com/photo-1583121274602-3b283a1e81f4?auto=format&fit=crop&w=800&q=80", logo: "https://upload.wikimedia.org/wikipedia/en/d/d1/Ferrari-Logo.svg" },
  { id: "ford", name: "Ford", country: "USA", description: "Built Ford tough — trusted worldwide.", banner: IMG("ford") },
  { id: "genesis", name: "Genesis", country: "Korea", description: "Athletic elegance redefined.", banner: IMG("genesis") },
  { id: "honda", name: "Honda", country: "Japan", description: "Reliability meets refined engineering.", banner: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=800&q=80", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Honda_Logo.svg" },
  { id: "hyundai", name: "Hyundai", country: "Korea", description: "Smart mobility for modern India.", banner: "https://images.unsplash.com/photo-1617814076668-8f0ca57593b4?auto=format&fit=crop&w=800&q=80", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Hyundai_Motor_Company_logo.svg" },
  { id: "infiniti", name: "Infiniti", country: "Japan", description: "Inspired performance luxury.", banner: IMG("infiniti") },
  { id: "jaguar", name: "Jaguar", country: "UK", description: "Grace, space, pace.", banner: "https://images.unsplash.com/photo-1614200179396-2bdb8eb6f737?auto=format&fit=crop&w=800&q=80", logo: "https://upload.wikimedia.org/wikipedia/en/3/3e/Jaguar_logo.svg" },
  { id: "jeep", name: "Jeep", country: "USA", description: "Go anywhere capability.", banner: IMG("jeep") },
  { id: "kia", name: "Kia", country: "Korea", description: "Movement that inspires.", banner: IMG("kia"), logo: "https://upload.wikimedia.org/wikipedia/commons/b/b6/KIA_logo3.svg" },
  { id: "lamborghini", name: "Lamborghini", country: "Italy", description: "Expect the unexpected.", banner: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=800&q=80", logo: "https://upload.wikimedia.org/wikipedia/en/d/df/Lamborghini_Logo.svg" },
  { id: "land-rover", name: "Land Rover", country: "UK", description: "Above and beyond.", banner: IMG("landrover") },
  { id: "lexus", name: "Lexus", country: "Japan", description: "Experience amazing.", banner: IMG("lexus") },
  { id: "mahindra", name: "Mahindra", country: "India", description: "Rise — rugged Indian engineering.", banner: IMG("mahindra") },
  { id: "maruti", name: "Maruti Suzuki", country: "India", description: "India's most trusted automotive brand.", banner: IMG("maruti") },
  { id: "mercedes", name: "Mercedes-Benz", country: "Germany", description: "The best or nothing.", banner: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80", logo: "https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg" },
  { id: "mg", name: "MG", country: "UK/China", description: "Morris Garages — modern electric mobility.", banner: IMG("mg") },
  { id: "mitsubishi", name: "Mitsubishi", country: "Japan", description: "Drive your ambition.", banner: IMG("mitsubishi") },
  { id: "nissan", name: "Nissan", country: "Japan", description: "Innovation that excites.", banner: IMG("nissan"), logo: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Nissan_logo.svg" },
  { id: "porsche", name: "Porsche", country: "Germany", description: "There is no substitute.", banner: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80", logo: "https://upload.wikimedia.org/wikipedia/de/1/1f/Porsche_Logo.svg" },
  { id: "renault", name: "Renault", country: "France", description: "Passion for life.", banner: IMG("renault") },
  { id: "rolls-royce", name: "Rolls-Royce", country: "UK", description: "Effortless, everywhere.", banner: "https://images.unsplash.com/photo-1631290243538-127af49d4b1e?auto=format&fit=crop&w=800&q=80", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Rolls-royce.svg" },
  { id: "skoda", name: "Skoda", country: "Czech", description: "Simply clever.", banner: IMG("skoda") },
  { id: "suzuki", name: "Suzuki", country: "Japan", description: "Way of life!", banner: IMG("suzuki") },
  { id: "tata", name: "Tata", country: "India", description: "Connecting aspirations.", banner: IMG("tata") },
  { id: "tesla", name: "Tesla", country: "USA", description: "Accelerating sustainable transport.", banner: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=80", logo: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Tesla_T_symbol.svg" },
  { id: "toyota", name: "Toyota", country: "Japan", description: "Let's go places.", banner: "https://images.unsplash.com/photo-1621007947382-bcb904e1d3d5?auto=format&fit=crop&w=800&q=80", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Toyota.svg" },
  { id: "volkswagen", name: "Volkswagen", country: "Germany", description: "Das Auto.", banner: IMG("vw"), logo: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Volkswagen_logo_2019.svg" },
  { id: "volvo", name: "Volvo", country: "Sweden", description: "For life.", banner: IMG("volvo"), logo: "https://upload.wikimedia.org/wikipedia/commons/0/09/Volvo_iron_mark.svg" },
].sort((a, b) => a.name.localeCompare(b.name));

export function getCarBrand(id) {
  return CAR_BRAND_LIST.find((b) => b.id === id);
}
