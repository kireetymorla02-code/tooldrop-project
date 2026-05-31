const express = require("express");
const jwt = require("jsonwebtoken");
const {
  createOtpSession,
  verifyOtpSession,
  normalizePhone,
  normalizeEmail,
} = require("../services/otp.service");
const { upsertFromAuth, isProfileComplete } = require("../services/user.service");

const router = express.Router();

function signToken(user) {
  return jwt.sign(
    { sub: user.user_id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
}

function formatUser(user) {
  return {
    user_id: user.user_id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    profile_image: user.profile_image,
    address: user.address,
    city: user.city,
    state: user.state,
    pincode: user.pincode,
    profile_complete: isProfileComplete(user),
    created_at: user.created_at,
  };
}

router.post("/send-otp", async (req, res) => {
  try {
    const { phone, email, role = "customer" } = req.body;
    let contact;
    let contactType;

    if (phone) {
      contact = normalizePhone(phone);
      contactType = "phone";
      if (contact.replace(/\D/g, "").length < 10) {
        return res.status(400).json({ error: "Invalid phone number" });
      }
    } else if (email) {
      contact = normalizeEmail(email);
      contactType = "email";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)) {
        return res.status(400).json({ error: "Invalid email address" });
      }
    } else {
      return res.status(400).json({ error: "Phone or email required" });
    }

    await createOtpSession({ contact, contactType, role });
    res.json({
      ok: true,
      message: "OTP sent",
      contact,
      contactType,
      devHint:
        process.env.NODE_ENV !== "production"
          ? "Check server console for OTP in development"
          : undefined,
    });
  } catch (err) {
    console.error("send-otp:", err.message);
    res.status(500).json({ error: "Failed to send OTP" });
  }
});

router.post("/verify-otp", async (req, res) => {
  try {
    const { phone, email, otp, role = "customer" } = req.body;
    if (!otp) return res.status(400).json({ error: "OTP required" });

    let contact;
    let contactType;
    if (phone) {
      contact = normalizePhone(phone);
      contactType = "phone";
    } else if (email) {
      contact = normalizeEmail(email);
      contactType = "email";
    } else {
      return res.status(400).json({ error: "Phone or email required" });
    }

    const verification = await verifyOtpSession({ contact, contactType, otp });
    if (!verification.ok) {
      return res.status(401).json({ error: verification.reason });
    }

    const user = await upsertFromAuth({
      email: contactType === "email" ? contact : null,
      phone: contactType === "phone" ? contact : null,
      role: verification.role || role,
    });

    const token = signToken(user);
    res.json({ token, user: formatUser(user) });
  } catch (err) {
    console.error("verify-otp:", err.message);
    res.status(500).json({ error: "Verification failed" });
  }
});

router.post("/google", async (req, res) => {
  try {
    const { firebaseUid, email, name, profileImage, role = "customer" } = req.body;
    if (!firebaseUid || !email) {
      return res.status(400).json({ error: "Google auth payload incomplete" });
    }

    const user = await upsertFromAuth({
      firebaseUid,
      email: normalizeEmail(email),
      name,
      profileImage,
      role,
    });

    const token = signToken(user);
    res.json({ token, user: formatUser(user) });
  } catch (err) {
    console.error("google auth:", err.message);
    res.status(500).json({ error: "Google sign-in failed" });
  }
});

module.exports = router;
