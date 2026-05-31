const express = require("express");
const { requireAuth } = require("../middleware/auth");
const { updateProfile, isProfileComplete } = require("../services/user.service");

const router = express.Router();

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

router.get("/me", requireAuth, (req, res) => {
  res.json({ user: formatUser(req.user) });
});

router.put("/me/profile", requireAuth, async (req, res) => {
  try {
    const updated = await updateProfile(req.user.user_id, req.body);
    res.json({ user: formatUser(updated) });
  } catch (err) {
    console.error("profile update:", err.message);
    res.status(500).json({ error: "Profile update failed" });
  }
});

module.exports = router;
