const express = require("express");
const { requireAuth } = require("../middleware/auth");
const { requireRole } = require("../middleware/roles");
const { getCenterOrders } = require("../services/order.service");
const {
  createPartVerification,
  getPartsForOrderCenter,
} = require("../services/partVerification.service");
const { pool } = require("../config/db");

const router = express.Router();

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

router.post("/orders/:orderId/advance", async (req, res) => {
  try {
    const { advanceOrderStatus } = require("../services/order.service");
    const order = await advanceOrderStatus(req.params.orderId, "center_admin", req.user.center_id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json({ order });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
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
