import { useParams } from "react-router-dom";
import "./CarModels.css";

const models = {
  BMW: ["X5", "M3", "i8"],
  Audi: ["A4", "Q7", "R8"],
  Mercedes: ["C-Class", "E-Class", "S-Class"]
};

export default function CarModels() {
  const { brand } = useParams();

  return (
    <div className="models-container">
      <h1>{brand} Models</h1>

      <div className="models-grid">
        {models[brand]?.map((model, index) => (
          <div key={index} className="model-card">
            <p>{model}</p>
          </div>
        ))}
      </div>
    </div>
  );
}