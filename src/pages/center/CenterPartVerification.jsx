import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import { useAuth } from "../../context/AuthProvider";
import { uploadPartVerification } from "../../services/centerService";

export default function CenterPartVerification() {
  const { orderId } = useParams();
  const { token } = useAuth();
  const [form, setForm] = useState({
    partName: "",
    oldImageUrl: "",
    newImageUrl: "",
    estimatedCost: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await uploadPartVerification(token, orderId, {
        partName: form.partName,
        oldImageUrl: form.oldImageUrl,
        newImageUrl: form.newImageUrl,
        estimatedCost: Number(form.estimatedCost) || 0,
      });
      setSuccess(true);
    } catch (err) {
      setError(err.message || "Upload failed");
    }
  };

  if (success) {
    return (
      <div className="success-panel">
        <div className="success-icon">✓</div>
        <h2>Part Verification Submitted</h2>
        <p>Customer notified for approval at Waiting Approval step.</p>
        <Link to="/center/orders" className="glass-btn" style={{ marginTop: 16, display: "inline-block", width: "auto" }}>
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        eyebrow="Transparency"
        title="Part Verification"
        subtitle={`Order ${orderId} · old vs new part photos`}
      />

      <form className="form-panel" onSubmit={submit}>
        <label htmlFor="partName">Part name</label>
        <input id="partName" required value={form.partName} onChange={(e) => setForm({ ...form, partName: e.target.value })} placeholder="Front brake pads" />

        <label htmlFor="oldImage">Old part image URL</label>
        <input id="oldImage" required value={form.oldImageUrl} onChange={(e) => setForm({ ...form, oldImageUrl: e.target.value })} placeholder="https://..." />

        <label htmlFor="newImage">New part image URL</label>
        <input id="newImage" required value={form.newImageUrl} onChange={(e) => setForm({ ...form, newImageUrl: e.target.value })} placeholder="https://..." />

        <label htmlFor="cost">Estimated cost (₹)</label>
        <input id="cost" type="number" required value={form.estimatedCost} onChange={(e) => setForm({ ...form, estimatedCost: e.target.value })} />

        {error && <p className="auth-error">{error}</p>}

        <button type="submit" className="glass-btn">Submit for Customer Approval</button>
      </form>
    </div>
  );
}
