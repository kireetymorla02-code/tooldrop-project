export const NOTIFICATION_TEMPLATES = [
  { id: "n1", type: "pickup", title: "Pickup Assigned", message: "Partner Rahul is assigned to collect your vehicle.", read: false, time: "2 min ago" },
  { id: "n2", type: "collected", title: "Vehicle Collected", message: "Your vehicle has been picked up safely.", read: false, time: "18 min ago" },
  { id: "n3", type: "arrived", title: "Vehicle Arrived", message: "Vehicle reached ToolDrop Premium Hub.", read: true, time: "1 hr ago" },
  { id: "n4", type: "inspection", title: "Inspection Started", message: "Certified mechanic is diagnosing your vehicle.", read: true, time: "2 hr ago" },
  { id: "n5", type: "report", title: "Report Generated", message: "AI failure analysis report is ready for review.", read: false, time: "3 hr ago" },
  { id: "n6", type: "progress", title: "Service In Progress", message: "Repair work has started on your booking.", read: true, time: "5 hr ago" },
  { id: "n7", type: "ready", title: "Ready For Delivery", message: "Quality check passed. Delivery scheduled.", read: false, time: "Yesterday" },
  { id: "n8", type: "delivered", title: "Delivered", message: "Your vehicle was delivered. Rate your experience.", read: true, time: "2 days ago" },
];

export const AI_ASSISTANT_PROMPTS = [
  { label: "Book a service", prompt: "Help me book a car service" },
  { label: "Maintenance tips", prompt: "Give me maintenance tips for my BMW" },
  { label: "Nearest center", prompt: "Find nearest service center" },
  { label: "Track order", prompt: "Where is my current order?" },
  { label: "Phone repair", prompt: "My iPhone screen is broken" },
];

export const AI_DEMO_RESPONSES = {
  "Help me book a car service":
    "I'd recommend starting with Cars → select your brand → choose a model → pick Full Service. I can pre-filter AI-recommended centers near you with 4.8+ ratings.",
  "Give me maintenance tips for my BMW":
    "For BMW ownership: schedule oil changes every 10k km, inspect brake fluid annually, and use OEM filters. ToolDrop AI can predict your next service window based on mileage.",
  "Find nearest service center":
    "Based on your location, ToolDrop Premium Hub (2.1 km, 4.9★) is your best match. EV Care Hyderabad is ideal for Tesla/EV owners at 4.8 km.",
  "Where is my current order?":
    "Order TD-28491 is at 'Repair Started'. ETA for completion: 4h 20m. Open My Orders for live tracking.",
  "My iPhone screen is broken":
    "For screen damage, book Electronics → Phones → Repair. TechDrop Electronics Lab offers same-day screen replacement with warranty. Estimated: ₹8k–18k depending on model.",
  default:
    "I'm ToolDrop AI — your premium service concierge. I can help with bookings, maintenance advice, center recommendations, and order tracking. What would you like to do?",
};

export const FAQ_ITEMS = [
  { q: "What is ToolDrop?", a: "ToolDrop is an AI-powered transparency platform for pickup, repair, service and delivery of cars, bikes, and electronics." },
  { q: "How much do I pay upfront?", a: "Only ₹200 pickup fee at booking. Final service cost is generated after inspection and requires your approval." },
  { q: "Can I track my vehicle live?", a: "Yes. Swiggy-style live tracking with ETA, partner location, and status timeline is available in My Orders." },
  { q: "How does part verification work?", a: "Mechanics upload old vs new part photos. You compare before approving repairs — full transparency." },
  { q: "Is AI pricing accurate?", a: "AI dynamic pricing uses vehicle model, service type, parts, labor, and location. Final bill may vary after physical inspection." },
];

export const REWARDS_TIERS = [
  { name: "Silver", points: 0, perks: ["5% pickup discount", "Priority support"] },
  { name: "Gold", points: 2500, perks: ["10% service discount", "Free diagnostics", "Early slot access"] },
  { name: "Platinum", points: 7500, perks: ["15% discount", "Free pickup", "Dedicated concierge", "Annual ceramic wash"] },
];
