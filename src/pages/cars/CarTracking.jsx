import StatusTimeline from "../../components/StatusTimeline";
import { TRACKING_STEPS } from "../../data/cars";

export default function CarTracking() {
  return (
    <div>
      <header className="page-header">
        <h1>Live Tracking</h1>
        <p>Real-time transparency · old vs new parts verification enabled</p>
      </header>

      <div className="tracking-layout">
        <div className="map-sim">
          <div className="eta-banner">ETA · 28 min</div>
          <div className="map-dot partner" title="Pickup partner" />
          <div className="map-dot center" title="Service center" />
          <p
            style={{
              position: "absolute",
              bottom: 20,
              left: 20,
              right: 20,
              color: "var(--text-muted)",
              fontSize: "0.85rem",
            }}
          >
            Live map simulation — partner moving toward center
          </p>
        </div>

        <div>
          <StatusTimeline steps={TRACKING_STEPS} activeIndex={4} />
          <div className="luxury-card" style={{ marginTop: 20, cursor: "default" }}>
            <h4 style={{ margin: "0 0 8px" }}>AI Failure Analysis</h4>
            <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: "0.9rem" }}>
              Preliminary report: brake pad wear detected. Digital bill & part photos
              will appear at Quality Check.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
