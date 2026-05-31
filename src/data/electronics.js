export const ELECTRONICS_CATEGORIES = [
  { id: "phones", name: "Phones", icon: "📱", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80", description: "Flagship smartphones & repairs" },
  { id: "tablets", name: "Tablets", icon: "📲", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80", description: "iPad, Galaxy Tab & more" },
  { id: "laptops", name: "Laptops", icon: "💻", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80", description: "MacBook, Dell XPS, ThinkPad" },
  { id: "computers", name: "Computers", icon: "🖥️", image: "https://images.unsplash.com/photo-1587831990712-54d4fbf12cb9?auto=format&fit=crop&w=800&q=80", description: "Desktops & workstations" },
  { id: "gaming", name: "Gaming Consoles", icon: "🎮", image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=800&q=80", description: "PlayStation, Xbox, Nintendo" },
  { id: "tvs", name: "TVs", icon: "📺", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80", description: "OLED, QLED & smart TVs" },
  { id: "speakers", name: "Speakers", icon: "🔊", image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80", description: "Home & portable audio" },
  { id: "earbuds", name: "Earbuds", icon: "🎧", image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80", description: "TWS & premium headphones" },
  { id: "smartwatches", name: "Smart Watches", icon: "⌚", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80", description: "Apple Watch, Galaxy Watch" },
  { id: "fridges", name: "Fridges", icon: "❄️", image: "https://images.unsplash.com/photo-1571175443880-49f1c88117cc?auto=format&fit=crop&w=800&q=80", description: "Refrigeration service" },
  { id: "ac", name: "ACs", icon: "🌡️", image: "https://images.unsplash.com/photo-1631545806606-0991c1e4b626?auto=format&fit=crop&w=800&q=80", description: "Split & central AC" },
  { id: "washing", name: "Washing Machines", icon: "🧺", image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80", description: "Front & top load" },
  { id: "microwave", name: "Microwaves", icon: "📻", image: "https://images.unsplash.com/photo-1585659722983-0686a8d8b2a4?auto=format&fit=crop&w=800&q=80", description: "Kitchen appliance care" },
  { id: "cameras", name: "Cameras", icon: "📷", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80", description: "DSLR & mirrorless" },
  { id: "printers", name: "Printers", icon: "🖨️", image: "https://images.unsplash.com/photo-1612815154850-62c9f4f8b8e8?auto=format&fit=crop&w=800&q=80", description: "Office & home printers" },
  { id: "monitors", name: "Monitors", icon: "🖥️", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80", description: "Gaming & professional displays" },
  { id: "routers", name: "Routers", icon: "📡", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80", description: "Networking equipment" },
  { id: "smart-home", name: "Smart Home", icon: "🏠", image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80", description: "IoT & automation devices" },
];

export const ELECTRONICS_SERVICES = [
  { id: "repair", name: "Repair", time: "1–3 days", price: "₹1k–15k", aiTag: "Popular" },
  { id: "install", name: "Installation", time: "Same day", price: "₹500–3k" },
  { id: "maintain", name: "Maintenance", time: "2–4 hrs", price: "₹800–5k" },
  { id: "upgrade", name: "Upgrade", time: "1 day", price: "₹2k–20k" },
  { id: "clean", name: "Cleaning", time: "1–2 hrs", price: "₹500–2k" },
  { id: "diagnostics", name: "Diagnostics", time: "1 hr", price: "₹500–1.5k", aiTag: "Smart" },
  { id: "warranty", name: "Warranty Support", time: "Varies", price: "As per policy" },
];

export const ELECTRONICS_BRANDS = [
  { id: "apple", name: "Apple" },
  { id: "samsung", name: "Samsung" },
  { id: "sony", name: "Sony" },
  { id: "lg", name: "LG" },
  { id: "dell", name: "Dell" },
  { id: "hp", name: "HP" },
  { id: "lenovo", name: "Lenovo" },
  { id: "oneplus", name: "OnePlus" },
  { id: "xiaomi", name: "Xiaomi" },
  { id: "bosch", name: "Bosch" },
];

export function getElectronicsCategory(id) {
  return ELECTRONICS_CATEGORIES.find((c) => c.id === id);
}
