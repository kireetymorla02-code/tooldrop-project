-- Inspection reports from service center to customer

CREATE TABLE IF NOT EXISTS inspection_reports (
  report_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(order_id) ON DELETE CASCADE,
  summary TEXT NOT NULL,
  findings TEXT,
  image_urls TEXT[] DEFAULT '{}',
  uploaded_by UUID REFERENCES users(user_id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_inspection_reports_order ON inspection_reports (order_id, created_at DESC);
