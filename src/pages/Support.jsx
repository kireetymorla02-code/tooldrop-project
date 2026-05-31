import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { FAQ_ITEMS } from "../data/customer";

export default function Support() {
  return (
    <div>
      <PageHeader eyebrow="Help Center" title="Support" subtitle="Concierge support · FAQs · live assistance" />

      <div className="support-grid">
        <Link to="/app/ai-assist" className="luxury-card">
          <h3>AI Assistant</h3>
          <p className="muted">Instant answers for bookings, tracking & care tips</p>
        </Link>
        <Link to="/app/faq" className="luxury-card">
          <h3>FAQ</h3>
          <p className="muted">Pricing, pickup, transparency & part verification</p>
        </Link>
        <a href="mailto:support@tooldrop.in" className="luxury-card">
          <h3>Email Support</h3>
          <p className="muted">support@tooldrop.in · Response within 2 hours</p>
        </a>
        <a href="tel:18008665376" className="luxury-card">
          <h3>Phone</h3>
          <p className="muted">1800-TOOL-DROP · 24/7 premium line</p>
        </a>
      </div>

      <section className="dash-panel" style={{ marginTop: 28 }}>
        <h3>Popular Questions</h3>
        {FAQ_ITEMS.slice(0, 3).map((item) => (
          <div key={item.q} className="faq-preview">
            <strong>{item.q}</strong>
            <p className="muted">{item.a}</p>
          </div>
        ))}
        <Link to="/app/faq" className="tab-btn" style={{ marginTop: 12, display: "inline-block" }}>
          View all FAQs
        </Link>
      </section>
    </div>
  );
}
