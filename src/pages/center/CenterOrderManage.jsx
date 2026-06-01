import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import PageHeader from "../../components/PageHeader";
import { useAuth } from "../../context/AuthProvider";
import { resolveUploadUrl } from "../../services/api";
import {
  advanceCenterOrder,
  fetchCenterOrder,
  submitInspectionReport,
  uploadCenterPhotos,
  uploadPartVerification,
} from "../../services/centerService";

export default function CenterOrderManage() {
  const { orderId } = useParams();
  const { token } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState("");

  const [reportForm, setReportForm] = useState({ summary: "", findings: "" });
  const [reportPhotos, setReportPhotos] = useState([]);
  const [partForm, setPartForm] = useState({
    partName: "",
    oldImageUrl: "",
    newImageUrl: "",
    estimatedCost: "",
  });
  const [partOldFile, setPartOldFile] = useState(null);
  const [partNewFile, setPartNewFile] = useState(null);

  const load = () => {
    setLoading(true);
    fetchCenterOrder(token, orderId)
      .then(setData)
      .catch((err) => setError(err.message || "Could not load order"))
      .finally(() => setLoading(false));
  };

  useEffect(load, [token, orderId]);

  const advance = async () => {
    setBusy("advance");
    try {
      await advanceCenterOrder(token, orderId);
      load();
    } catch (err) {
      alert(err.message || "Could not advance");
    } finally {
      setBusy("");
    }
  };

  const uploadFiles = async (files) => {
    if (!files?.length) return [];
    const result = await uploadCenterPhotos(token, orderId, files);
    return result.urls || [];
  };

  const submitReport = async (e) => {
    e.preventDefault();
    setBusy("report");
    setError("");
    try {
      const uploaded = await uploadFiles(reportPhotos);
      await submitInspectionReport(token, orderId, {
        summary: reportForm.summary,
        findings: reportForm.findings,
        imageUrls: uploaded,
      });
      setReportForm({ summary: "", findings: "" });
      setReportPhotos([]);
      load();
    } catch (err) {
      setError(err.message || "Report failed");
    } finally {
      setBusy("");
    }
  };

  const submitPart = async (e) => {
    e.preventDefault();
    setBusy("part");
    setError("");
    try {
      let oldImageUrl = partForm.oldImageUrl;
      let newImageUrl = partForm.newImageUrl;
      if (partOldFile) {
        const [url] = await uploadFiles([partOldFile]);
        oldImageUrl = url;
      }
      if (partNewFile) {
        const [url] = await uploadFiles([partNewFile]);
        newImageUrl = url;
      }
      await uploadPartVerification(token, orderId, {
        partName: partForm.partName,
        oldImageUrl,
        newImageUrl,
        estimatedCost: Number(partForm.estimatedCost) || 0,
      });
      setPartForm({ partName: "", oldImageUrl: "", newImageUrl: "", estimatedCost: "" });
      setPartOldFile(null);
      setPartNewFile(null);
      load();
    } catch (err) {
      setError(err.message || "Part upload failed");
    } finally {
      setBusy("");
    }
  };

  if (loading) return <Loader label="Loading order…" />;

  if (!data?.order) {
    return (
      <div>
        <PageHeader title="Order not found" subtitle={orderId} />
        <p className="muted">This order is not assigned to your service center.</p>
        <Link to="/center/orders" className="tab-btn">Back to orders</Link>
      </div>
    );
  }

  const { order, parts = [], reports = [] } = data;

  return (
    <div className="center-manage-page">
      <PageHeader
        eyebrow="Service Center Admin"
        title={order.id}
        subtitle={`${order.vehicle} · ${order.service} · ${order.status}`}
        action={
          <Link to="/center/orders" className="tab-btn">
            All orders
          </Link>
        }
      />

      <div className="center-order-meta">
        <div>
          <span className="admin-meta-label">Customer</span>
          <p>{order.customer?.name || "—"}</p>
          <p className="muted">{order.customer?.phone || "—"}</p>
        </div>
        <div>
          <span className="admin-meta-label">Pickup</span>
          <p>{order.pickup?.date || "—"} · {order.pickup?.slot || "—"}</p>
          <p className="muted">{order.pickup?.address || "—"}</p>
        </div>
        <div>
          <span className="admin-meta-label">Status</span>
          <p>{order.status}</p>
          <button
            type="button"
            className="glass-btn"
            style={{ marginTop: 8, width: "auto", padding: "8px 14px", fontSize: "0.85rem" }}
            disabled={busy === "advance" || order.status === "Delivered"}
            onClick={advance}
          >
            {busy === "advance" ? "Updating…" : "Advance status"}
          </button>
        </div>
      </div>

      {error && <p className="auth-error">{error}</p>}

      <section className="dash-panel compact">
        <h3>Inspection report & photos</h3>
        <p className="muted">Send findings and photos to the customer before repair approval.</p>

        {reports.map((r) => (
          <div key={r.id} className="center-report-card">
            <strong>{r.summary}</strong>
            {r.findings && <p className="muted">{r.findings}</p>}
            <div className="part-images">
              {r.imageUrls.map((url) => (
                <img key={url} src={resolveUploadUrl(url)} alt="Inspection" />
              ))}
            </div>
          </div>
        ))}

        <form className="form-panel" onSubmit={submitReport}>
          <label htmlFor="summary">Report summary</label>
          <textarea
            id="summary"
            required
            rows={2}
            value={reportForm.summary}
            onChange={(e) => setReportForm({ ...reportForm, summary: e.target.value })}
            placeholder="Brake pads worn · AC filter clogged"
          />

          <label htmlFor="findings">Detailed findings</label>
          <textarea
            id="findings"
            rows={3}
            value={reportForm.findings}
            onChange={(e) => setReportForm({ ...reportForm, findings: e.target.value })}
            placeholder="Technician notes for the customer"
          />

          <label htmlFor="reportPhotos">Upload photos</label>
          <input
            id="reportPhotos"
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setReportPhotos(Array.from(e.target.files || []))}
          />

          <button type="submit" className="glass-btn" disabled={busy === "report"}>
            {busy === "report" ? "Sending…" : "Send report to customer"}
          </button>
        </form>
      </section>

      <section className="dash-panel compact">
        <h3>Part verification (old vs new)</h3>
        <p className="muted">Customer must approve parts before repair cost is charged.</p>

        {parts.map((p) => (
          <div key={p.id} className="center-report-card">
            <strong>{p.partName}</strong>
            <p className="muted">₹{Number(p.estimatedCost || 0).toLocaleString("en-IN")}</p>
            <div className="part-images">
              {p.oldPartImageUrl && <img src={resolveUploadUrl(p.oldPartImageUrl)} alt="Old part" />}
              {p.newPartImageUrl && <img src={resolveUploadUrl(p.newPartImageUrl)} alt="New part" />}
            </div>
          </div>
        ))}

        <form className="form-panel" onSubmit={submitPart}>
          <label htmlFor="partName">Part name</label>
          <input
            id="partName"
            required
            value={partForm.partName}
            onChange={(e) => setPartForm({ ...partForm, partName: e.target.value })}
            placeholder="Front brake pads"
          />

          <label htmlFor="partOld">Old part photo</label>
          <input id="partOld" type="file" accept="image/*" onChange={(e) => setPartOldFile(e.target.files?.[0] || null)} />

          <label htmlFor="partNew">New part photo</label>
          <input id="partNew" type="file" accept="image/*" onChange={(e) => setPartNewFile(e.target.files?.[0] || null)} />

          <label htmlFor="cost">Estimated cost (₹)</label>
          <input
            id="cost"
            type="number"
            required
            value={partForm.estimatedCost}
            onChange={(e) => setPartForm({ ...partForm, estimatedCost: e.target.value })}
          />

          <button type="submit" className="glass-btn" disabled={busy === "part"}>
            {busy === "part" ? "Submitting…" : "Submit for customer approval"}
          </button>
        </form>
      </section>
    </div>
  );
}
