import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHeader from "../components/PageHeader";
import { FAQ_ITEMS } from "../data/customer";

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <div>
      <PageHeader eyebrow="Knowledge" title="FAQ" subtitle="Everything about ToolDrop transparency & service" />

      <div className="faq-list">
        {FAQ_ITEMS.map((item, i) => (
          <motion.div key={item.q} className="faq-item" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}>
            <button type="button" className="faq-question" onClick={() => setOpen(open === i ? null : i)}>
              {item.q}
              <span>{open === i ? "−" : "+"}</span>
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.p
                  className="faq-answer muted"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  {item.a}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
