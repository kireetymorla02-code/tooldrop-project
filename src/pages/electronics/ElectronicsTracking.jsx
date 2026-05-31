import StatusTimeline from "../../components/StatusTimeline";
import { TRACKING_STEPS } from "../../data/cars";

export default function ElectronicsTracking() {
  return (
    <div>
      <header className="page-header">
        <h1>Device Tracking</h1>
        <p>Repair progress</p>
      </header>
      <StatusTimeline steps={TRACKING_STEPS.slice(0, 6)} activeIndex={1} />
    </div>
  );
}
