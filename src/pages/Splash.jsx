import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Splash() {
  const navigate = useNavigate();
  const [entered, setEntered] = useState(false);

  const handleEnter = () => {
    if (entered) return;
    setEntered(true);
    setTimeout(() => navigate("/login"), 1800);
  };

  return (
    <div className="splash-screen" onClick={handleEnter} role="presentation">
      {!entered ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="splash-logo">TOOLDROP</h1>
          <p className="splash-sub">Precision Service. Delivered.</p>
          <p className="splash-tagline">AI Powered Transparency Platform</p>
          <p className="splash-tap">Tap to Enter</p>
        </motion.div>
      ) : (
        <div className="splash-zoom">TOOLDROP</div>
      )}
    </div>
  );
}
