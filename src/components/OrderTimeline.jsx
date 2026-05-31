import { motion } from "framer-motion";

export default function OrderTimeline({ steps, activeIndex = 0 }) {
  return (
    <ol className="order-timeline">
      {steps.map((step, index) => {
        const done = index <= activeIndex;
        const active = index === activeIndex;
        return (
          <motion.li
            key={step}
            className={`timeline-step ${done ? "done" : ""} ${active ? "active" : ""}`}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <span className="timeline-dot" />
            <div>
              <strong>{step}</strong>
              {active && <span className="timeline-live">Live</span>}
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}
