const crypto = require("crypto");
const { pool } = require("../config/db");

const OTP_TTL_MS = 5 * 60 * 1000;

function hashOtp(otp) {
  return crypto.createHash("sha256").update(String(otp)).digest("hex");
}

function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function normalizePhone(phone) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `+91${digits}`;
  if (digits.startsWith("91") && digits.length === 12) return `+${digits}`;
  return phone.trim();
}

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

async function createOtpSession({ contact, contactType, role }) {
  const otp = generateOtp();
  const otpHash = hashOtp(otp);
  const expiresAt = new Date(Date.now() + OTP_TTL_MS);

  await pool.query(
    `INSERT INTO otp_sessions (contact, contact_type, otp_hash, role, expires_at)
     VALUES ($1, $2, $3, $4, $5)`,
    [contact, contactType, otpHash, role, expiresAt]
  );

  if (process.env.NODE_ENV !== "production") {
    console.log(`[ToolDrop OTP] ${contactType} ${contact} → ${otp}`);
  }

  return { otp, expiresAt };
}

async function verifyOtpSession({ contact, contactType, otp }) {
  const otpHash = hashOtp(otp);
  const result = await pool.query(
    `SELECT session_id, role, expires_at, verified
     FROM otp_sessions
     WHERE contact = $1 AND contact_type = $2 AND otp_hash = $3
     ORDER BY created_at DESC
     LIMIT 1`,
    [contact, contactType, otpHash]
  );

  const session = result.rows[0];
  if (!session) return { ok: false, reason: "Invalid OTP" };
  if (session.verified) return { ok: false, reason: "OTP already used" };
  if (new Date(session.expires_at) < new Date()) {
    return { ok: false, reason: "OTP expired" };
  }

  await pool.query(
    `UPDATE otp_sessions SET verified = TRUE WHERE session_id = $1`,
    [session.session_id]
  );

  return { ok: true, role: session.role };
}

module.exports = {
  createOtpSession,
  verifyOtpSession,
  normalizePhone,
  normalizeEmail,
  hashOtp,
};
