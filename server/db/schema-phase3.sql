-- ToolDrop Phase 3 — Orders, payments, notifications, part verification

ALTER TABLE users ADD COLUMN IF NOT EXISTS center_id UUID;

CREATE TABLE IF NOT EXISTS service_centers (
  center_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  address TEXT,
  city VARCHAR(100) DEFAULT 'Hyderabad',
  rating NUMERIC(3, 2) DEFAULT 4.5,
  review_count INT DEFAULT 0,
  distance_label VARCHAR(50),
  image_url TEXT,
  specializations TEXT[] DEFAULT '{}',
  is_open BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'users_center_id_fkey'
  ) THEN
    ALTER TABLE users
      ADD CONSTRAINT users_center_id_fkey
      FOREIGN KEY (center_id) REFERENCES service_centers(center_id);
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS orders (
  order_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  public_id VARCHAR(20) UNIQUE NOT NULL,
  user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  center_id UUID REFERENCES service_centers(center_id),
  center_name VARCHAR(255),
  order_type VARCHAR(30) NOT NULL,
  brand VARCHAR(100),
  model VARCHAR(100),
  category VARCHAR(100),
  vehicle_label VARCHAR(255),
  service_name VARCHAR(255),
  status VARCHAR(60) NOT NULL DEFAULT 'Order Created',
  tracking_step INT NOT NULL DEFAULT 0,
  pickup_fee INT NOT NULL DEFAULT 200,
  pending_amount VARCHAR(100) DEFAULT 'After inspection',
  final_amount INT,
  payment_method VARCHAR(50),
  pickup_address TEXT,
  pickup_date DATE,
  pickup_slot VARCHAR(50),
  pickup_notes TEXT,
  eta VARCHAR(50) DEFAULT '28 min',
  booking JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS order_status_events (
  event_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(order_id) ON DELETE CASCADE,
  status VARCHAR(60) NOT NULL,
  tracking_step INT,
  note TEXT,
  actor_role VARCHAR(50),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS payments (
  payment_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(order_id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(user_id),
  amount INT NOT NULL,
  currency VARCHAR(3) DEFAULT 'INR',
  method VARCHAR(50),
  status VARCHAR(20) NOT NULL DEFAULT 'completed',
  razorpay_order_id VARCHAR(255),
  razorpay_payment_id VARCHAR(255),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS notifications (
  notification_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  order_id UUID REFERENCES orders(order_id) ON DELETE SET NULL,
  type VARCHAR(50),
  title VARCHAR(255) NOT NULL,
  message TEXT,
  read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS part_verifications (
  verification_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(order_id) ON DELETE CASCADE,
  part_name VARCHAR(255) NOT NULL,
  old_part_image_url TEXT,
  new_part_image_url TEXT,
  estimated_cost INT,
  customer_approved BOOLEAN,
  customer_note TEXT,
  uploaded_by UUID REFERENCES users(user_id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_user ON orders (user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_center ON orders (center_id, status);
CREATE INDEX IF NOT EXISTS idx_orders_public ON orders (public_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications (user_id, read, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_payments_order ON payments (order_id);
CREATE INDEX IF NOT EXISTS idx_part_verifications_order ON part_verifications (order_id);
