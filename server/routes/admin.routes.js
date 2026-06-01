const express = require("express");
const { requireAuth } = require("../middleware/auth");
const { requireRole } = require("../middleware/roles");
const {
  getAllOrders,
  getAdminOrderDetail,
  getAdminStats,
  advanceOrderStatus,
} = require("../services/order.service");
const { getNotificationsForUser } = require("../services/notification.service");
const { pool } = require("../config/db");

const router = express.Router();

router.use(requireAuth, requireRole("super_admin"));

router.get("/stats", async (_req, res) => {
  try {
    const stats = await getAdminStats();
    res.json({ stats });
  } catch (err) {
    res.status(500).json({ error: "Failed to load stats" });
  }
});

router.get("/orders", async (_req, res) => {
  try {
    const orders = await getAllOrders();
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ error: "Failed to load orders" });
  }
});

router.get("/feed", async (req, res) => {
  try {
    const [stats, orders, notifications] = await Promise.all([
      getAdminStats(),
      getAllOrders(),
      getNotificationsForUser(req.user.user_id),
    ]);
    res.json({
      stats,
      recentOrders: orders.slice(0, 12),
      notifications: notifications.slice(0, 25),
      unreadCount: notifications.filter((n) => !n.read).length,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to load feed" });
  }
});

router.get("/orders/:orderId", async (req, res) => {
  try {
    const detail = await getAdminOrderDetail(req.params.orderId);
    if (!detail) return res.status(404).json({ error: "Order not found" });
    res.json(detail);
  } catch (err) {
    res.status(500).json({ error: "Failed to load order" });
  }
});

router.post("/orders/:orderId/advance", async (req, res) => {
  try {
    const order = await advanceOrderStatus(req.params.orderId, "super_admin", null);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json({ order });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || "Advance failed" });
  }
});

router.get("/payments", async (_req, res) => {
  try {
    const result = await pool.query(
      `SELECT p.payment_id, p.amount, p.method, p.status, p.created_at,
              o.public_id AS order_id, u.name AS customer_name
       FROM payments p
       JOIN orders o ON o.order_id = p.order_id
       JOIN users u ON u.user_id = p.user_id
       ORDER BY p.created_at DESC LIMIT 100`
    );
    res.json({ payments: result.rows });
  } catch (err) {
    res.status(500).json({ error: "Failed to load payments" });
  }
});

module.exports = router;
