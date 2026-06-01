const express = require("express");
const { requireAuth } = require("../middleware/auth");
const {
  getPartsForOrder,
  respondToPart,
} = require("../services/partVerification.service");
const { getReportsForOrder } = require("../services/inspectionReport.service");

const router = express.Router();

router.get("/orders/:orderId", requireAuth, async (req, res) => {
  try {
    const [parts, reports] = await Promise.all([
      getPartsForOrder(req.params.orderId, req.user.user_id),
      getReportsForOrder(req.params.orderId, req.user.user_id),
    ]);
    res.json({ parts, reports });
  } catch (err) {
    res.status(500).json({ error: "Failed to load order service data" });
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
