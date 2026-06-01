# ToolDrop Platform Flow

**Tagline:** Precision Service. Delivered.

ToolDrop is a premium AI-powered service marketplace for cars, bikes, and electronics. Customers book service, pay a pickup fee, and track repairs end-to-end. Operations teams manage the full pipeline from a live admin dashboard.

## Order lifecycle

```
Customer app          PostgreSQL           Super Admin           Center Admin          Customer app
     │                     │                     │                      │                     │
     │  Book + pay ₹200    │                     │                      │                     │
     ├────────────────────►│                     │                      │                     │
     │                     │  Notify new_order   │                      │                     │
     │                     ├────────────────────►│  Live feed + alerts  │                     │
     │                     │  Notify new_order   │                      │                     │
     │                     ├─────────────────────┼─────────────────────►│  Assigned orders    │
     │                     │                     │                      │                     │
     │                     │◄── Advance status ──┼──────────────────────┤                     │
     │                     │◄── Advance status ──┤                      │                     │
     │  Live tracking      │                     │                      │                     │
     │◄────────────────────┤                     │                      │                     │
```

## Roles

| Role | Route | Purpose |
|------|-------|---------|
| Customer | `/app/*` | Browse, book, pay pickup fee, track orders |
| Super Admin | `/admin/*` | See all orders, alerts, payments, analytics |
| Center Admin | `/center/*` | Manage orders assigned to their service hub |

## Testing the full flow

1. Start backend: `npm run db:up` → `npm run server:migrate` → `npm run server:seed` → `npm run server`
2. Start frontend: `npm start`
3. **Tab A — Customer:** Login → select **Customer** → complete booking → pay ₹200
4. **Tab B — Super Admin:** Login → select **Super Admin** → open `/admin` — order appears in live feed within ~8 seconds
5. **Tab C — Center Admin:** Login → select **Center Admin** → open `/center/orders` for hub-assigned jobs

OTP codes print in the **server terminal** as `[ToolDrop OTP]`.

## What happens on payment

When a customer pays the pickup fee:

1. Order is saved to PostgreSQL (`orders`, `payments`)
2. Customer receives a pickup confirmation notification
3. All **super_admin** users receive a **New Customer Order** alert
4. The assigned **center_admin** (if center was selected) receives a **New Booking Assigned** alert
5. Super Admin dashboard polls `/api/admin/feed` every 8 seconds
6. Customer is redirected to live order tracking

## API endpoints (admin)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/admin/feed` | Stats + recent orders + notifications |
| GET | `/api/admin/orders` | All orders with customer name/phone |
| GET | `/api/admin/orders/:id` | Order detail + status timeline |
| POST | `/api/admin/orders/:id/advance` | Move order to next tracking step |
