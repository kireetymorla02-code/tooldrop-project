const { pool } = require("../config/db");
const { createNotification, notifyRoleUsers } = require("./notification.service");

const TRACKING_STEPS = [
  "Order Created",
  "Pickup Assigned",
  "Pickup En Route",
  "Collected",
  "At Service Center",
  "Inspection",
  "Waiting Approval",
  "Repair Started",
  "Repair Completed",
  "Ready For Delivery",
  "Delivered",
];

function formatOrder(row, customer) {
  const base = {
    id: row.public_id,
    orderId: row.order_id,
    type: row.order_type,
    brand: row.brand,
    model: row.model,
    category: row.category,
    vehicle: row.vehicle_label,
    service: row.service_name,
    center: row.center_name,
    centerId: row.center_id,
    status: row.status,
    trackingStep: row.tracking_step,
    pickupFee: row.pickup_fee,
    pendingAmount: row.pending_amount,
    finalAmount: row.final_amount,
    amount: row.final_amount ? `₹${row.final_amount.toLocaleString("en-IN")}` : undefined,
    paymentMethod: row.payment_method,
    pickup: {
      address: row.pickup_address,
      date: row.pickup_date,
      slot: row.pickup_slot,
      notes: row.pickup_notes,
    },
    eta: row.eta,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
  if (customer || row.customer_name) {
    base.customer = {
      name: customer?.name || row.customer_name,
      phone: customer?.phone || row.customer_phone,
      email: customer?.email || row.customer_email,
    };
  }
  return base;
}

async function generatePublicId() {
  for (let i = 0; i < 10; i++) {
    const id = `TD-${Math.floor(10000 + Math.random() * 90000)}`;
    const exists = await pool.query(`SELECT 1 FROM orders WHERE public_id = $1`, [id]);
    if (!exists.rows.length) return id;
  }
  throw new Error("Could not generate order ID");
}

async function resolveCenter(centerPayload) {
  if (!centerPayload) return { centerId: null, centerName: null };
  const slug = centerPayload.id || centerPayload.slug;
  const name = centerPayload.name || null;
  if (slug) {
    const result = await pool.query(
      `SELECT center_id, name FROM service_centers WHERE slug = $1 LIMIT 1`,
      [slug]
    );
    if (result.rows[0]) {
      return { centerId: result.rows[0].center_id, centerName: result.rows[0].name };
    }
  }
  return { centerId: null, centerName: name };
}

async function addStatusEvent(client, orderId, status, trackingStep, note, actorRole) {
  await client.query(
    `INSERT INTO order_status_events (order_id, status, tracking_step, note, actor_role)
     VALUES ($1, $2, $3, $4, $5)`,
    [orderId, status, trackingStep, note, actorRole]
  );
}

async function createOrder(userId, payload) {
  const publicId = await generatePublicId();
  const { centerId, centerName } = await resolveCenter(payload.center);
  const status = "Pickup Assigned";
  const trackingStep = 1;
  const pickup = payload.pickup || {};

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const orderResult = await client.query(
      `INSERT INTO orders (
        public_id, user_id, center_id, center_name, order_type, brand, model, category,
        vehicle_label, service_name, status, tracking_step, pickup_fee, pending_amount,
        payment_method, pickup_address, pickup_date, pickup_slot, pickup_notes, eta, booking
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21)
      RETURNING *`,
      [
        publicId,
        userId,
        centerId,
        centerName || payload.center?.name,
        payload.type || "car",
        payload.brand,
        payload.model,
        payload.category,
        payload.vehicle || `${payload.brand || ""} ${payload.model || ""}`.trim(),
        payload.service?.name || payload.service,
        status,
        trackingStep,
        payload.pickupFeePaid || 200,
        "After inspection",
        payload.paymentMethod,
        pickup.address,
        pickup.date || null,
        pickup.slot,
        pickup.notes,
        payload.eta || "28 min",
        JSON.stringify(payload),
      ]
    );

    const order = orderResult.rows[0];
    await addStatusEvent(client, order.order_id, "Order Created", 0, "Booking confirmed", "customer");
    await addStatusEvent(client, order.order_id, status, trackingStep, "Pickup fee received", "system");

    await client.query(
      `INSERT INTO payments (order_id, user_id, amount, method, status)
       VALUES ($1, $2, $3, $4, 'completed')`,
      [order.order_id, userId, payload.pickupFeePaid || 200, payload.paymentMethod || "UPI"]
    );

    await client.query("COMMIT");

    await createNotification({
      userId,
      orderId: order.order_id,
      type: "pickup",
      title: "Pickup Assigned",
      message: `Order ${publicId} confirmed. Pickup fee ₹${payload.pickupFeePaid || 200} received.`,
    });

    const customerRow = await pool.query(
      `SELECT name, phone, email FROM users WHERE user_id = $1`,
      [userId]
    );
    const customer = customerRow.rows[0];
    const customerLabel = customer?.name || customer?.phone || "Customer";

    await notifyRoleUsers("super_admin", {
      orderId: order.order_id,
      type: "new_order",
      title: "New Customer Order",
      message: `${publicId} · ${order.vehicle_label || "Service"} · ${customerLabel} · ₹${payload.pickupFeePaid || 200} pickup paid`,
    });

    if (centerId) {
      await notifyRoleUsers("center_admin", {
        orderId: order.order_id,
        type: "new_order",
        title: "New Booking Assigned",
        message: `${publicId} · ${order.service_name} · Pickup ${pickup.slot || "scheduled"}`,
        centerId,
      });
    }

    return formatOrder(order, customer);
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

async function getOrdersForUser(userId, { history = false } = {}) {
  const condition = history
    ? `user_id = $1 AND status = 'Delivered'`
    : `user_id = $1 AND status != 'Delivered'`;
  const result = await pool.query(
    `SELECT * FROM orders WHERE ${condition} ORDER BY created_at DESC LIMIT 50`,
    [userId]
  );
  return result.rows.map(formatOrder);
}

async function getOrderByPublicId(publicId, userId) {
  const result = await pool.query(
    `SELECT * FROM orders WHERE public_id = $1 AND user_id = $2 LIMIT 1`,
    [publicId, userId]
  );
  return result.rows[0] ? formatOrder(result.rows[0]) : null;
}

async function getOrderByPublicIdAdmin(publicId) {
  const result = await pool.query(`SELECT * FROM orders WHERE public_id = $1 LIMIT 1`, [publicId]);
  return result.rows[0] ? formatOrder(result.rows[0]) : null;
}

async function getOrderRowByPublicId(publicId) {
  const result = await pool.query(`SELECT * FROM orders WHERE public_id = $1 LIMIT 1`, [publicId]);
  return result.rows[0] || null;
}

async function getStatusEvents(orderId) {
  const result = await pool.query(
    `SELECT status, tracking_step, note, actor_role, created_at
     FROM order_status_events WHERE order_id = $1 ORDER BY created_at ASC`,
    [orderId]
  );
  return result.rows;
}

async function updateOrderStatus(publicId, { status, trackingStep, note, actorRole, userId, centerId }) {
  const row = await getOrderRowByPublicId(publicId);
  if (!row) return null;

  if (actorRole === "center_admin") {
    if (!centerId) {
      const err = new Error("Center not assigned to your account");
      err.status = 403;
      throw err;
    }
    if (row.center_id !== centerId) {
      const err = new Error("Order not assigned to your center");
      err.status = 403;
      throw err;
    }
  }

  if (actorRole === "customer" && row.user_id !== userId) {
    const err = new Error("Order not found");
    err.status = 404;
    throw err;
  }

  const step = trackingStep ?? TRACKING_STEPS.indexOf(status);
  const result = await pool.query(
    `UPDATE orders SET status = $1, tracking_step = $2, updated_at = NOW()
     WHERE public_id = $3 RETURNING *`,
    [status, step >= 0 ? step : row.tracking_step, publicId]
  );

  await addStatusEvent(pool, result.rows[0].order_id, status, step, note, actorRole);

  await createNotification({
    userId: row.user_id,
    orderId: row.order_id,
    type: status.toLowerCase().replace(/\s+/g, "_"),
    title: status,
    message: note || `Order ${publicId} is now: ${status}`,
  });

  return formatOrder(result.rows[0]);
}

async function advanceOrderStatus(publicId, actorRole, centerId) {
  const row = await getOrderRowByPublicId(publicId);
  if (!row) return null;
  if (actorRole === "center_admin") {
    if (!centerId) {
      const err = new Error("Center not assigned to your account");
      err.status = 403;
      throw err;
    }
    if (row.center_id !== centerId) {
      const err = new Error("Order not assigned to your center");
      err.status = 403;
      throw err;
    }
  }

  const nextStep = Math.min(row.tracking_step + 1, TRACKING_STEPS.length - 1);
  const nextStatus = TRACKING_STEPS[nextStep];
  return updateOrderStatus(publicId, {
    status: nextStatus,
    trackingStep: nextStep,
    note: `Advanced to ${nextStatus}`,
    actorRole,
    userId: row.user_id,
    centerId,
  });
}

async function getCenterOrders(centerId, status) {
  let query = `SELECT o.*, u.name AS customer_name, u.phone AS customer_phone, u.email AS customer_email
     FROM orders o
     JOIN users u ON u.user_id = o.user_id
     WHERE o.center_id = $1`;
  const params = [centerId];
  if (status && status !== "all") {
    query += ` AND o.status = $2`;
    params.push(status);
  }
  query += ` ORDER BY o.created_at DESC LIMIT 100`;
  const result = await pool.query(query, params);
  return result.rows.map((row) => formatOrder(row));
}

async function getCenterOrderDetail(publicId, centerId) {
  const result = await pool.query(
    `SELECT o.*, u.name AS customer_name, u.phone AS customer_phone, u.email AS customer_email
     FROM orders o
     JOIN users u ON u.user_id = o.user_id
     WHERE o.public_id = $1 AND o.center_id = $2
     LIMIT 1`,
    [publicId, centerId]
  );
  if (!result.rows[0]) return null;
  const row = result.rows[0];
  const events = await getStatusEvents(row.order_id);
  return { order: formatOrder(row), events };
}

async function getAllOrders() {
  const result = await pool.query(
    `SELECT o.*, u.name AS customer_name, u.phone AS customer_phone, u.email AS customer_email
     FROM orders o
     JOIN users u ON u.user_id = o.user_id
     ORDER BY o.created_at DESC
     LIMIT 200`
  );
  return result.rows.map((row) => formatOrder(row));
}

async function getAdminOrderDetail(publicId) {
  const result = await pool.query(
    `SELECT o.*, u.name AS customer_name, u.phone AS customer_phone, u.email AS customer_email
     FROM orders o
     JOIN users u ON u.user_id = o.user_id
     WHERE o.public_id = $1
     LIMIT 1`,
    [publicId]
  );
  if (!result.rows[0]) return null;
  const row = result.rows[0];
  const events = await getStatusEvents(row.order_id);
  return { order: formatOrder(row), events };
}

async function getAdminStats() {
  const [active, delivered, revenue] = await Promise.all([
    pool.query(`SELECT COUNT(*)::int AS c FROM orders WHERE status != 'Delivered'`),
    pool.query(`SELECT COUNT(*)::int AS c FROM orders WHERE status = 'Delivered'`),
    pool.query(`SELECT COALESCE(SUM(amount), 0)::int AS s FROM payments WHERE status = 'completed'`),
  ]);
  return {
    activeOrders: active.rows[0].c,
    deliveredOrders: delivered.rows[0].c,
    revenue: revenue.rows[0].s,
  };
}

module.exports = {
  TRACKING_STEPS,
  formatOrder,
  createOrder,
  getOrdersForUser,
  getOrderByPublicId,
  getOrderByPublicIdAdmin,
  getOrderRowByPublicId,
  getStatusEvents,
  updateOrderStatus,
  advanceOrderStatus,
  getCenterOrders,
  getCenterOrderDetail,
  getAllOrders,
  getAdminOrderDetail,
  getAdminStats,
};
