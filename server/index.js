require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const authRoutes = require("./routes/auth.routes");
const usersRoutes = require("./routes/users.routes");
const ordersRoutes = require("./routes/orders.routes");
const notificationsRoutes = require("./routes/notifications.routes");
const centerRoutes = require("./routes/center.routes");
const adminRoutes = require("./routes/admin.routes");
const partsRoutes = require("./routes/parts.routes");
const { pool } = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5001;

const configuredOrigins = (process.env.CORS_ORIGIN || "http://localhost:3000")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Non-browser clients (curl, Postman)
      if (!origin) return callback(null, true);

      // Dev: allow any localhost port (3000, 3002, etc.)
      if (process.env.NODE_ENV !== "production" && /^http:\/\/localhost:\d+$/.test(origin)) {
        return callback(null, origin);
      }

      if (configuredOrigins.includes(origin)) {
        return callback(null, origin);
      }

      callback(new Error(`CORS blocked origin: ${origin}`));
    },
    credentials: true,
  })
);
app.use(express.json());

const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
app.use("/api/uploads", express.static(uploadsDir));

app.get("/api/health", async (_req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ ok: true, service: "tooldrop-api", database: "connected" });
  } catch {
    res.status(503).json({ ok: false, service: "tooldrop-api", database: "disconnected" });
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/notifications", notificationsRoutes);
app.use("/api/center", centerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/parts", partsRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

const server = app.listen(PORT, () => {
  console.log(`ToolDrop API running on http://localhost:${PORT}`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(
      `\nPort ${PORT} is already in use. Stop the other server (Ctrl+C in that terminal) or run:\n  lsof -i :${PORT}\n  kill <PID>\n`
    );
    process.exit(1);
  }
  throw err;
});
