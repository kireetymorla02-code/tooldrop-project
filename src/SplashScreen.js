import { useState } from "react";
import "./Splash.css";

export default function SplashScreen({ onFinish }) {
  const [entered, setEntered] = useState(false);

  const handleEnter = () => {
    setEntered(true);

    setTimeout(() => {
      onFinish();
    }, 2000);
  };

  return (
    <div className="splash-root">
      {!entered ? (
        <div className="splash-content" onClick={handleEnter}>
          
          <div className="light-streak"></div>

          <h1 className="logo-text">TOOLDROP</h1>
          <p className="tagline">Precision Service. Delivered.</p>
          <span className="enter-text">Tap to Enter</span>

        </div>
      ) : (
        <div className="zoom-logo">
          <h1>TOOLDROP</h1>
        </div>
      )}
    </div>
  );
}