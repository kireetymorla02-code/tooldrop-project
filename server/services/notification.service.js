const { pool } = require("../config/db");

function formatNotification(row) {
  const diff = Date.now() - new Date(row.created_at).getTime();
  const mins = Math.floor(diff / 60000);
  let time = "Just now";
  if (mins >= 1 && mins < 60) time = `${mins} min ago`;
  else if (mins >= 60 && mins < 1440) time = `${Math.floor(mins / 60)} hr ago`;
  else if (mins >= 1440) time = `${Math.floor(mins / 1440)} days ago`;

  return {
    id: row.notification_id,
    type: row.type,
    title: row.title,
    message: row.message,
    read: row.read,
    time,
    orderId: row.order_id,
    createdAt: row.created_at,
  };
}

async function createNotification({ userId, orderId, type, title, message }) {
  const result = await pool.query(
    `INSERT INTO notifications (user_id, order_id, type, title, message)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [userId, orderId || null, type, title, message]
  );
  return formatNotification(result.rows[0]);
}

async function getNotificationsForUser(userId) {
  const result = await pool.query(
    `SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC LIMIT 100`,
    [userId]
  );
  return result.rows.map(formatNotification);
}

async function markRead(userId, notificationId) {
  await pool.query(
    `UPDATE notifications SET read = TRUE
     WHERE notification_id = $1 AND user_id = $2`,
    [notificationId, userId]
  );
}

async function markAllRead(userId) {
  await pool.query(`UPDATE notifications SET read = TRUE WHERE user_id = $1`, [userId]);
}

async function notifyRoleUsers(role, { orderId, type, title, message, centerId }) {
  let query = `SELECT user_id FROM users WHERE role = $1`;
  const params = [role];
  if (centerId) {
    query += ` AND center_id = $2`;
    params.push(centerId);
  }
  const result = await pool.query(query, params);
  await Promise.all(
    result.rows.map((row) =>
      createNotification({ userId: row.user_id, orderId, type, title, message })
    )
  );
}

module.exports = {
  createNotification,
  getNotificationsForUser,
  markRead,
  markAllRead,
  notifyRoleUsers,
  formatNotification,
};
