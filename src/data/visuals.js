/** Shared Unsplash imagery for empty areas & visual strips */
export const VISUALS = {
  service: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=900&q=80",
  mechanic: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=900&q=80",
  pickup: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=900&q=80",
  car: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=900&q=80",
  bike: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=900&q=80",
  electronics: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=900&q=80",
  delivery: "https://images.unsplash.com/photo-1601362840519-7cef79940341?auto=format&fit=crop&w=900&q=80",
  rewards: "https://images.unsplash.com/photo-1607083206869-4c7672f72a8a?auto=format&fit=crop&w=900&q=80",
  emptyOrders: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80",
  emptyInbox: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
  emptyCenter: "https://images.unsplash.com/photo-1625047509248-ec889cb0e3b5?auto=format&fit=crop&w=800&q=80",
  premium: "https://images.unsplash.com/photo-1631290243538-127af49d4b1e?auto=format&fit=crop&w=1200&q=80",
};

export const DASHBOARD_STRIP = [
  { src: VISUALS.mechanic, label: "Expert technicians" },
  { src: VISUALS.service, label: "Premium hubs" },
  { src: VISUALS.delivery, label: "Doorstep delivery" },
];

export const BOOKING_STRIP = [
  { src: VISUALS.car, label: "Cars" },
  { src: VISUALS.bike, label: "Bikes" },
  { src: VISUALS.electronics, label: "Devices" },
];
