const express = require("express");
const { requireAuth } = require("../middleware/auth");
const {
  getNotificationsForUser,
  markRead,
  markAllRead,
} = require("../services/notification.service");

const router = express.Router();

router.get("/", requireAuth, async (req, res) => {
  try {
    const notifications = await getNotificationsForUser(req.user.user_id);
    res.json({ notifications });
  } catch (err) {
    res.status(500).json({ error: "Failed to load notifications" });
  }
});

router.patch("/:id/read", requireAuth, async (req, res) => {
  try {
    await markRead(req.user.user_id, req.params.id);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to update notification" });
  }
});

router.post("/read-all", requireAuth, async (req, res) => {
  try {
    await markAllRead(req.user.user_id);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to update notifications" });
  }
});

module.exports = router;
