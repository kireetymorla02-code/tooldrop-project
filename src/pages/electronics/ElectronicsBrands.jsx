import { useNavigate } from "react-router-dom";
import { ELECTRONICS_BRANDS } from "../../data/electronics";

export default function ElectronicsBrands() {
  const navigate = useNavigate();

  return (
    <div>
      <header className="page-header">
        <h1>Brands</h1>
        <p>Authorized service partners</p>
      </header>
      <div className="brand-grid">
        {ELECTRONICS_BRANDS.map((brand) => (
          <div
            key={brand.id}
            className="brand-card"
            onClick={() => navigate("/app/electronics/services")}
            role="button"
            tabIndex={0}
          >
            <p>{brand.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
