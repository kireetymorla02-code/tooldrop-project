require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { pool } = require("../config/db");

async function migrate() {
  const schema = fs.readFileSync(path.join(__dirname, "schema.sql"), "utf8");
  await pool.query(schema);
  const phase3 = fs.readFileSync(path.join(__dirname, "schema-phase3.sql"), "utf8");
  await pool.query(phase3);
  const inspections = fs.readFileSync(path.join(__dirname, "schema-phase3-inspections.sql"), "utf8");
  await pool.query(inspections);
  console.log("Database migration completed.");
  await pool.end();
}

migrate().catch((err) => {
  console.error("Migration failed:", err.message);
  process.exit(1);
});
