import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function Welcome() {
  const navigate = useNavigate();
  const { role, setVideoFading } = useAuth();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setVideoFading(true);
      setFadeOut(true);
    }, 2400);

    const navTimer = setTimeout(() => {
      navigate(role === "admin" ? "/admin" : "/app/home", { replace: true });
    }, 4000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(navTimer);
    };
  }, [navigate, role, setVideoFading]);

  return (
    <div className={`welcome-screen ${fadeOut ? "welcome-fade-out" : ""}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
        animate={{ opacity: 1, scale: 1.02, filter: "blur(0px)" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1>WELCOME TO TOOLDROP</h1>
        <p style={{ color: "var(--text-secondary)", marginTop: 16, letterSpacing: 2 }}>
          Precision Service. Delivered.
        </p>
      </motion.div>
    </div>
  );
}
