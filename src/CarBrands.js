import { useNavigate } from "react-router-dom";
import "./CarBrands.css";

const brands = [
  { name: "BMW", img: "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg" },
  { name: "Audi", img: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Audi_logo_detail.svg" },
  { name: "Mercedes", img: "https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg" }
];

export default function CarBrands() {
  const navigate = useNavigate();

  return (
    <div className="brands-container">
      <h1>Select Brand</h1>

      <div className="brands-grid">
        {brands.map((brand, index) => (
          <div
            key={index}
            className="brand-card"
            onClick={() => navigate(`/models/${brand.name}`)}
          >
            <img src={brand.img} alt={brand.name} />
            <p>{brand.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}