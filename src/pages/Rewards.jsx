import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import { REWARDS_TIERS } from "../data/customer";
import { useCustomer } from "../context/CustomerProvider";

export default function Rewards() {
  const { loyaltyPoints } = useCustomer();
  const currentTier = [...REWARDS_TIERS].reverse().find((t) => loyaltyPoints >= t.points) || REWARDS_TIERS[0];
  const nextTier = REWARDS_TIERS.find((t) => t.points > loyaltyPoints);

  return (
    <div>
      <PageHeader eyebrow="Loyalty" title="Rewards" subtitle="Earn points on every booking · unlock premium perks" />

      <motion.div className="rewards-hero" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div>
          <span className="muted">Your balance</span>
          <h2>{loyaltyPoints.toLocaleString()} pts</h2>
          <p>Current tier: <strong>{currentTier.name}</strong></p>
        </div>
        {nextTier && (
          <div className="tier-progress">
            <span>{nextTier.points - loyaltyPoints} pts to {nextTier.name}</span>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${Math.min(100, (loyaltyPoints / nextTier.points) * 100)}%` }}
              />
            </div>
          </div>
        )}
      </motion.div>

      <div className="tier-grid">
        {REWARDS_TIERS.map((tier, i) => (
          <motion.div
            key={tier.name}
            className={`tier-card ${currentTier.name === tier.name ? "active" : ""}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <h3>{tier.name}</h3>
            <p className="muted">{tier.points.toLocaleString()}+ points</p>
            <ul>
              {tier.perks.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
