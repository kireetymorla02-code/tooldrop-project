const { pool } = require("../config/db");
const { updateOrderStatus, getOrderRowByPublicId } = require("./order.service");
const { createNotification } = require("./notification.service");

function formatPart(row) {
  return {
    id: row.verification_id,
    orderId: row.order_id,
    partName: row.part_name,
    oldPartImageUrl: row.old_part_image_url,
    newPartImageUrl: row.new_part_image_url,
    estimatedCost: row.estimated_cost,
    customerApproved: row.customer_approved,
    customerNote: row.customer_note,
    createdAt: row.created_at,
  };
}

async function createPartVerification({ orderPublicId, uploadedBy, centerId, partName, oldImageUrl, newImageUrl, estimatedCost }) {
  const order = await getOrderRowByPublicId(orderPublicId);
  if (!order) {
    const err = new Error("Order not found");
    err.status = 404;
    throw err;
  }
  if (centerId && order.center_id !== centerId) {
    const err = new Error("Order not assigned to your center");
    err.status = 403;
    throw err;
  }

  const result = await pool.query(
    `INSERT INTO part_verifications (order_id, part_name, old_part_image_url, new_part_image_url, estimated_cost, uploaded_by)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [order.order_id, partName, oldImageUrl, newImageUrl, estimatedCost, uploadedBy]
  );

  await updateOrderStatus(orderPublicId, {
    status: "Waiting Approval",
    trackingStep: 6,
    note: `Part verification submitted: ${partName}`,
    actorRole: "center_admin",
    userId: order.user_id,
    centerId: order.center_id,
  });

  await createNotification({
    userId: order.user_id,
    orderId: order.order_id,
    type: "report",
    title: "Report Generated",
    message: `Review part replacement for ${partName}. Estimated cost ₹${estimatedCost?.toLocaleString("en-IN") || "TBD"}.`,
  });

  return formatPart(result.rows[0]);
}

async function getPartsForOrder(orderPublicId, userId) {
  const order = await getOrderRowByPublicId(orderPublicId);
  if (!order || order.user_id !== userId) return [];
  const result = await pool.query(
    `SELECT * FROM part_verifications WHERE order_id = $1 ORDER BY created_at DESC`,
    [order.order_id]
  );
  return result.rows.map(formatPart);
}

async function getPartsForOrderCenter(orderPublicId, centerId) {
  const order = await getOrderRowByPublicId(orderPublicId);
  if (!order || order.center_id !== centerId) return [];
  const result = await pool.query(
    `SELECT * FROM part_verifications WHERE order_id = $1 ORDER BY created_at DESC`,
    [order.order_id]
  );
  return result.rows.map(formatPart);
}

async function respondToPart(verificationId, userId, { approved, note }) {
  const partResult = await pool.query(
    `SELECT pv.*, o.user_id, o.public_id, o.center_id
     FROM part_verifications pv
     JOIN orders o ON o.order_id = pv.order_id
     WHERE pv.verification_id = $1`,
    [verificationId]
  );
  const row = partResult.rows[0];
  if (!row || row.user_id !== userId) {
    const err = new Error("Verification not found");
    err.status = 404;
    throw err;
  }

  await pool.query(
    `UPDATE part_verifications SET customer_approved = $1, customer_note = $2, updated_at = NOW()
     WHERE verification_id = $3`,
    [approved, note, verificationId]
  );

  const nextStatus = approved ? "Repair Started" : "Waiting Approval";
  const nextStep = approved ? 7 : 6;
  await updateOrderStatus(row.public_id, {
    status: nextStatus,
    trackingStep: nextStep,
    note: approved ? "Customer approved part replacement" : "Customer requested changes",
    actorRole: "customer",
    userId,
    centerId: row.center_id,
  });

  return { ok: true, approved };
}

module.exports = {
  createPartVerification,
  getPartsForOrder,
  getPartsForOrderCenter,
  respondToPart,
  formatPart,
};
