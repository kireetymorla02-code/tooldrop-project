const express = require("express");
const { requireAuth } = require("../middleware/auth");
const {
  getPartsForOrder,
  respondToPart,
} = require("../services/partVerification.service");

const router = express.Router();

router.get("/orders/:orderId", requireAuth, async (req, res) => {
  try {
    const parts = await getPartsForOrder(req.params.orderId, req.user.user_id);
    res.json({ parts });
  } catch (err) {
    res.status(500).json({ error: "Failed to load part verifications" });
  }
});

router.post("/:verificationId/respond", requireAuth, async (req, res) => {
  try {
    const result = await respondToPart(req.params.verificationId, req.user.user_id, req.body);
    res.json(result);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || "Response failed" });
  }
});

module.exports = router;
