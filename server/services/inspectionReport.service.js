const { pool } = require("../config/db");
const { getOrderRowByPublicId, updateOrderStatus } = require("./order.service");
const { createNotification } = require("./notification.service");

function formatReport(row) {
  return {
    id: row.report_id,
    orderId: row.order_id,
    summary: row.summary,
    findings: row.findings,
    imageUrls: row.image_urls || [],
    createdAt: row.created_at,
  };
}

async function createInspectionReport({
  orderPublicId,
  uploadedBy,
  centerId,
  summary,
  findings,
  imageUrls,
}) {
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
    `INSERT INTO inspection_reports (order_id, summary, findings, image_urls, uploaded_by)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [order.order_id, summary, findings || null, imageUrls || [], uploadedBy]
  );

  if (order.tracking_step < 5) {
    await updateOrderStatus(orderPublicId, {
      status: "Inspection",
      trackingStep: 5,
      note: "Inspection report submitted",
      actorRole: "center_admin",
      userId: order.user_id,
      centerId: order.center_id,
    });
  }

  await createNotification({
    userId: order.user_id,
    orderId: order.order_id,
    type: "report",
    title: "Inspection Report Ready",
    message: summary.slice(0, 120),
  });

  return formatReport(result.rows[0]);
}

async function getReportsForOrder(orderPublicId, userId) {
  const order = await getOrderRowByPublicId(orderPublicId);
  if (!order || order.user_id !== userId) return [];
  const result = await pool.query(
    `SELECT * FROM inspection_reports WHERE order_id = $1 ORDER BY created_at DESC`,
    [order.order_id]
  );
  return result.rows.map(formatReport);
}

async function getReportsForOrderCenter(orderPublicId, centerId) {
  const order = await getOrderRowByPublicId(orderPublicId);
  if (!order || order.center_id !== centerId) return [];
  const result = await pool.query(
    `SELECT * FROM inspection_reports WHERE order_id = $1 ORDER BY created_at DESC`,
    [order.order_id]
  );
  return result.rows.map(formatReport);
}

module.exports = {
  createInspectionReport,
  getReportsForOrder,
  getReportsForOrderCenter,
  formatReport,
};
