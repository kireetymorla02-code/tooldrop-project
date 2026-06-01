const express = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const { requireAuth } = require("../middleware/auth");
const { requireRole } = require("../middleware/roles");
const { getCenterOrders, getCenterOrderDetail, advanceOrderStatus } = require("../services/order.service");
const {
  createPartVerification,
  getPartsForOrderCenter,
} = require("../services/partVerification.service");
const {
  createInspectionReport,
  getReportsForOrderCenter,
} = require("../services/inspectionReport.service");
const { pool } = require("../config/db");

const router = express.Router();

const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (_req, file, cb) => {
    const safe = `${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
    cb(null, safe);
  },
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024, files: 6 } });

router.use(requireAuth, requireRole("center_admin"));

router.get("/me", async (req, res) => {
  try {
    if (!req.user.center_id) return res.json({ center: null });
    const result = await pool.query(
      `SELECT center_id, slug, name, address, city, rating FROM service_centers WHERE center_id = $1`,
      [req.user.center_id]
    );
    res.json({ center: result.rows[0] || null });
  } catch (err) {
    res.status(500).json({ error: "Failed to load center" });
  }
});

function requireCenterAssigned(req, res, next) {
  if (!req.user.center_id) {
    return res.status(403).json({
      error: "center_not_assigned",
      message: "Your account is not linked to a service center. Run npm run server:seed or contact support.",
    });
  }
  next();
}

router.use(requireCenterAssigned);

router.get("/dashboard", async (req, res) => {
  try {
    const orders = await getCenterOrders(req.user.center_id);
    const stats = {
      active: orders.filter((o) => !["Delivered", "Waiting Approval"].includes(o.status)).length,
      waiting: orders.filter((o) => o.status === "Waiting Approval").length,
      completed: orders.filter((o) => o.status === "Delivered").length,
    };
    res.json({ stats, orders: orders.slice(0, 10) });
  } catch (err) {
    res.status(500).json({ error: "Failed to load dashboard" });
  }
});

router.get("/orders", async (req, res) => {
  try {
    const orders = await getCenterOrders(req.user.center_id, req.query.status);
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ error: "Failed to load orders" });
  }
});

router.get("/orders/:orderId", async (req, res) => {
  try {
    const detail = await getCenterOrderDetail(req.params.orderId, req.user.center_id);
    if (!detail) return res.status(404).json({ error: "Order not found at your center" });
    const [parts, reports] = await Promise.all([
      getPartsForOrderCenter(req.params.orderId, req.user.center_id),
      getReportsForOrderCenter(req.params.orderId, req.user.center_id),
    ]);
    res.json({ ...detail, parts, reports });
  } catch (err) {
    res.status(500).json({ error: "Failed to load order" });
  }
});

router.post("/orders/:orderId/advance", async (req, res) => {
  try {
    const order = await advanceOrderStatus(req.params.orderId, "center_admin", req.user.center_id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json({ order });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

router.post("/orders/:orderId/upload", upload.array("photos", 6), (req, res) => {
  const urls = (req.files || []).map((f) => `/api/uploads/${f.filename}`);
  res.json({ urls });
});

router.post("/orders/:orderId/reports", async (req, res) => {
  try {
    const { summary, findings, imageUrls } = req.body;
    if (!summary?.trim()) return res.status(400).json({ error: "Summary is required" });
    const report = await createInspectionReport({
      orderPublicId: req.params.orderId,
      uploadedBy: req.user.user_id,
      centerId: req.user.center_id,
      summary: summary.trim(),
      findings,
      imageUrls: imageUrls || [],
    });
    res.status(201).json({ report });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || "Report failed" });
  }
});

router.get("/orders/:orderId/reports", async (req, res) => {
  try {
    const reports = await getReportsForOrderCenter(req.params.orderId, req.user.center_id);
    res.json({ reports });
  } catch (err) {
    res.status(500).json({ error: "Failed to load reports" });
  }
});

router.post("/orders/:orderId/parts", async (req, res) => {
  try {
    const { partName, oldImageUrl, newImageUrl, estimatedCost } = req.body;
    const part = await createPartVerification({
      orderPublicId: req.params.orderId,
      uploadedBy: req.user.user_id,
      centerId: req.user.center_id,
      partName,
      oldImageUrl,
      newImageUrl,
      estimatedCost,
    });
    res.status(201).json({ part });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || "Upload failed" });
  }
});

router.get("/orders/:orderId/parts", async (req, res) => {
  try {
    const parts = await getPartsForOrderCenter(req.params.orderId, req.user.center_id);
    res.json({ parts });
  } catch (err) {
    res.status(500).json({ error: "Failed to load parts" });
  }
});

module.exports = router;
