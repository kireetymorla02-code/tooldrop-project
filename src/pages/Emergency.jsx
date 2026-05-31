import { useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineBolt, HiOutlinePhone, HiOutlineTruck } from "react-icons/hi2";
import PageHeader from "../components/PageHeader";

export default function Emergency() {
  const [requested, setRequested] = useState(false);

  const requestHelp = (type) => {
    setRequested(type);
    setTimeout(() => setRequested(false), 5000);
  };

  return (
    <div>
      <PageHeader
        eyebrow="24/7 Support"
        title="Emergency Assistance"
        subtitle="Roadside help · breakdown support · priority dispatch"
      />

      {requested && (
        <motion.div className="ai-banner" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {requested === "roadside"
            ? "Roadside partner dispatched · ETA 18 min · Call +91 1800-TOOL-DROP"
            : "Emergency concierge alerted · Stay safe · Help is on the way"}
        </motion.div>
      )}

      <div className="emergency-grid">
        <motion.button
          type="button"
          className="emergency-card primary"
          whileHover={{ scale: 1.02 }}
          onClick={() => requestHelp("emergency")}
        >
          <HiOutlineBolt size={36} />
          <h3>Emergency Assistance</h3>
          <p>Accident, breakdown, or unsafe situation</p>
          <span className="emergency-cta">Request Now</span>
        </motion.button>

        <motion.button
          type="button"
          className="emergency-card"
          whileHover={{ scale: 1.02 }}
          onClick={() => requestHelp("roadside")}
        >
          <HiOutlineTruck size={36} />
          <h3>Roadside Assistance</h3>
          <p>Flat tyre, battery jump, towing · 24/7</p>
          <span className="emergency-cta">Get Roadside Help</span>
        </motion.button>

        <motion.a href="tel:18008665376" className="emergency-card call-card">
          <HiOutlinePhone size={36} />
          <h3>Call Concierge</h3>
          <p>1800-TOOL-DROP · Premium support line</p>
        </motion.a>
      </div>

      <section className="dash-panel" style={{ marginTop: 28 }}>
        <h3>Safety Tips</h3>
        <ul className="tips-list">
          <li>Move to a safe location if possible</li>
          <li>Enable hazard lights and share live location</li>
          <li>ToolDrop partner will verify identity on arrival</li>
        </ul>
      </section>
    </div>
  );
}
