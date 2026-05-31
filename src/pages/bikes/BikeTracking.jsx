import StatusTimeline from "../../components/StatusTimeline";
import { TRACKING_STEPS } from "../../data/cars";

export default function BikeTracking() {
  return (
    <div>
      <header className="page-header">
        <h1>Bike Tracking</h1>
        <p>Live status updates</p>
      </header>
      <StatusTimeline steps={TRACKING_STEPS} activeIndex={2} />
    </div>
  );
}
