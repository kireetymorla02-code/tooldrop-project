-- ToolDrop Phase 1 schema (Users + OTP sessions)
-- Full marketplace tables ship in Phase 3

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS users (
  user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  firebase_uid VARCHAR(255) UNIQUE,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(20) UNIQUE,
  role VARCHAR(50) NOT NULL DEFAULT 'customer'
    CHECK (role IN ('customer', 'center_admin', 'super_admin')),
  profile_image TEXT,
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  pincode VARCHAR(20),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS otp_sessions (
  session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contact VARCHAR(255) NOT NULL,
  contact_type VARCHAR(10) NOT NULL CHECK (contact_type IN ('phone', 'email')),
  otp_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'customer',
  expires_at TIMESTAMPTZ NOT NULL,
  verified BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users (email);
CREATE INDEX IF NOT EXISTS idx_users_phone ON users (phone);
CREATE INDEX IF NOT EXISTS idx_otp_contact ON otp_sessions (contact, contact_type);
