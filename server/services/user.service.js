const { pool } = require("../config/db");
const { sanitizeRole, resolveRoleForNewUser, resolveRoleOnLogin } = require("./role.service");

async function findByContact({ email, phone }) {
  if (email) {
    const r = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
    if (r.rows[0]) return r.rows[0];
  }
  if (phone) {
    const r = await pool.query(`SELECT * FROM users WHERE phone = $1`, [phone]);
    if (r.rows[0]) return r.rows[0];
  }
  return null;
}

async function findByFirebaseUid(firebaseUid) {
  const r = await pool.query(`SELECT * FROM users WHERE firebase_uid = $1`, [
    firebaseUid,
  ]);
  return r.rows[0] || null;
}

async function findById(userId) {
  const r = await pool.query(`SELECT * FROM users WHERE user_id = $1`, [userId]);
  return r.rows[0] || null;
}

async function assignCenterIdForRole(role) {
  if (role !== "center_admin") return null;
  const hub = await pool.query(`SELECT center_id FROM service_centers WHERE slug = 'c1' LIMIT 1`);
  return hub.rows[0]?.center_id || null;
}

async function upsertFromAuth({ email, phone, role, firebaseUid, name, profileImage }) {
  const contact = email || phone || "";
  const existing = await findByContact({ email, phone });

  if (existing) {
    const nextRole = resolveRoleOnLogin(role, contact, existing.role);
    let centerId = existing.center_id;
    if (nextRole === "center_admin") {
      if (!centerId) centerId = await assignCenterIdForRole(nextRole);
    } else {
      centerId = null;
    }

    const updated = await pool.query(
      `UPDATE users SET
         role = $2,
         center_id = $3,
         firebase_uid = COALESCE($4, firebase_uid),
         name = COALESCE($5, name),
         profile_image = COALESCE($6, profile_image),
         updated_at = NOW()
       WHERE user_id = $1
       RETURNING *`,
      [existing.user_id, nextRole, centerId, firebaseUid || null, name || null, profileImage || null]
    );
    return updated.rows[0];
  }

  const safeRole = resolveRoleForNewUser(role, contact);
  const centerId = await assignCenterIdForRole(safeRole);

  const inserted = await pool.query(
    `INSERT INTO users (email, phone, role, firebase_uid, name, profile_image, center_id)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [email || null, phone || null, safeRole, firebaseUid || null, name || null, profileImage || null, centerId]
  );
  return inserted.rows[0];
}

async function updateProfile(userId, profile) {
  const updated = await pool.query(
    `UPDATE users SET
       name = COALESCE($2, name),
       email = COALESCE($3, email),
       phone = COALESCE($4, phone),
       profile_image = COALESCE($5, profile_image),
       address = COALESCE($6, address),
       city = COALESCE($7, city),
       state = COALESCE($8, state),
       pincode = COALESCE($9, pincode),
       updated_at = NOW()
     WHERE user_id = $1
     RETURNING *`,
    [
      userId,
      profile.name,
      profile.email,
      profile.phone,
      profile.profile_image,
      profile.address,
      profile.city,
      profile.state,
      profile.pincode,
    ]
  );
  return updated.rows[0];
}

function isProfileComplete(user) {
  return Boolean(user?.name && (user?.phone || user?.email));
}

module.exports = {
  findById,
  findByContact,
  findByFirebaseUid,
  upsertFromAuth,
  updateProfile,
  isProfileComplete,
  sanitizeRole,
};
