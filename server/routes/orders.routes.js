const express = require("express");
const { requireAuth } = require("../middleware/auth");
const { requireRole } = require("../middleware/roles");
const {
  createOrder,
  getOrdersForUser,
  getOrderByPublicId,
  getStatusEvents,
  getOrderRowByPublicId,
  advanceOrderStatus,
  updateOrderStatus,
} = require("../services/order.service");

const router = express.Router();

router.post("/", requireAuth, requireRole("customer"), async (req, res) => {
  try {
    const order = await createOrder(req.user.user_id, req.body);
    res.status(201).json({ order });
  } catch (err) {
    console.error("create order:", err.message);
    res.status(500).json({ error: "Failed to create order" });
  }
});

router.get("/", requireAuth, async (req, res) => {
  try {
    const history = req.query.history === "true";
    const orders = await getOrdersForUser(req.user.user_id, { history });
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ error: "Failed to load orders" });
  }
});

router.get("/:orderId", requireAuth, async (req, res) => {
  try {
    const order = await getOrderByPublicId(req.params.orderId, req.user.user_id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    const row = await getOrderRowByPublicId(req.params.orderId);
    const events = await getStatusEvents(row.order_id);
    res.json({ order, events });
  } catch (err) {
    res.status(500).json({ error: "Failed to load order" });
  }
});

router.patch("/:orderId/status", requireAuth, async (req, res) => {
  try {
    const { status, trackingStep, note } = req.body;
    const order = await updateOrderStatus(req.params.orderId, {
      status,
      trackingStep,
      note,
      actorRole: req.user.role,
      userId: req.user.user_id,
      centerId: req.user.center_id,
    });
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json({ order });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || "Update failed" });
  }
});

router.post("/:orderId/advance", requireAuth, requireRole("center_admin", "super_admin"), async (req, res) => {
  try {
    const order = await advanceOrderStatus(req.params.orderId, req.user.role, req.user.center_id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json({ order });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || "Advance failed" });
  }
});

module.exports = router;
