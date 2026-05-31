import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useCustomer } from "../context/CustomerProvider";
import { useWelcomeSound } from "../hooks/useWelcomeSound";
import { getPostAuthRoute } from "../constants/routes";

export default function Welcome() {
  const navigate = useNavigate();
  const { role, profileComplete, setVideoFading } = useAuth();
  const { hasLocation } = useCustomer();
  const [fadeOut, setFadeOut] = useState(false);

  useWelcomeSound();

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setVideoFading(true);
      setFadeOut(true);
    }, 2600);

    const navTimer = setTimeout(() => {
      navigate(getPostAuthRoute(role, profileComplete, hasLocation), { replace: true });
    }, 4200);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(navTimer);
    };
  }, [navigate, role, profileComplete, hasLocation, setVideoFading]);

  return (
    <div className={`welcome-screen ${fadeOut ? "welcome-fade-out" : ""}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.88, filter: "blur(12px)" }}
        animate={{ opacity: 1, scale: 1.06, filter: "blur(0px)" }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1>WELCOME TO TOOLDROP</h1>
        <p style={{ color: "var(--text-secondary)", marginTop: 16, letterSpacing: 2 }}>
          Precision Service. Delivered.
        </p>
      </motion.div>
    </div>
  );
}
