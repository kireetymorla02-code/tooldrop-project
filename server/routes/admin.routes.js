const express = require("express");
const { requireAuth } = require("../middleware/auth");
const { requireRole } = require("../middleware/roles");
const { getAllOrders, getAdminStats } = require("../services/order.service");
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
