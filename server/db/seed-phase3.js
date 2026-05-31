require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const { pool } = require("../config/db");

const CENTERS = [
  { slug: "c1", name: "ToolDrop Premium Hub", address: "Road No 12, Banjara Hills, Hyderabad", rating: 4.9, reviews: 1240, distance: "2.1 km", image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=600&q=80", specs: ["Luxury Cars", "EV", "Ceramic Coating"] },
  { slug: "c2", name: "Elite Auto Care", address: "Gachibowli Main Rd, Hyderabad", rating: 4.7, reviews: 890, distance: "3.8 km", image: "https://images.unsplash.com/photo-1625047509248-ec889cb0e3b5?auto=format&fit=crop&w=600&q=80", specs: ["German Cars", "Performance"] },
  { slug: "c3", name: "Metro Service Center", address: "Madhapur, HITEC City, Hyderabad", rating: 4.5, reviews: 412, distance: "4.2 km", image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=600&q=80", specs: ["Mass Market", "Quick Service"] },
  { slug: "c4", name: "Precision Motors", address: "Jubilee Hills, Hyderabad", rating: 4.8, reviews: 620, distance: "2.9 km", image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=600&q=80", specs: ["Luxury", "Body Shop", "Insurance"] },
  { slug: "c5", name: "TechDrop Electronics Lab", address: "Kondapur, Hyderabad", rating: 4.6, reviews: 380, distance: "5.1 km", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=600&q=80", specs: ["Electronics", "Phones", "Laptops"] },
  { slug: "c6", name: "Velocity Bike Studio", address: "Secunderabad, Hyderabad", rating: 4.7, reviews: 510, distance: "6.2 km", image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=600&q=80", specs: ["Bikes", "Royal Enfield", "KTM"] },
  { slug: "c7", name: "EV Care Hyderabad", address: "Financial District, Nanakramguda", rating: 4.8, reviews: 290, distance: "4.8 km", image: "https://images.unsplash.com/photo-1593941707882-a5bac6861d2d?auto=format&fit=crop&w=600&q=80", specs: ["EV", "Tesla", "Battery"] },
  { slug: "c8", name: "Express Auto Works", address: "Kukatpally, Hyderabad", rating: 4.4, reviews: 780, distance: "7.5 km", image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=600&q=80", specs: ["Budget", "Quick Turnaround"] },
];

async function seed() {
  for (const c of CENTERS) {
    await pool.query(
      `INSERT INTO service_centers (slug, name, address, city, rating, review_count, distance_label, image_url, specializations)
       VALUES ($1, $2, $3, 'Hyderabad', $4, $5, $6, $7, $8)
       ON CONFLICT (slug) DO UPDATE SET
         name = EXCLUDED.name,
         address = EXCLUDED.address,
         rating = EXCLUDED.rating,
         review_count = EXCLUDED.review_count,
         distance_label = EXCLUDED.distance_label,
         image_url = EXCLUDED.image_url,
         specializations = EXCLUDED.specializations`,
      [c.slug, c.name, c.address, c.rating, c.reviews, c.distance, c.image, c.specs]
    );
  }

  const hub = await pool.query(`SELECT center_id FROM service_centers WHERE slug = 'c1' LIMIT 1`);
  if (hub.rows[0]) {
    await pool.query(
      `UPDATE users SET center_id = $1
       WHERE role = 'center_admin' AND center_id IS NULL`,
      [hub.rows[0].center_id]
    );
  }

  console.log("Phase 3 seed completed (service centers).");
  await pool.end();
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
