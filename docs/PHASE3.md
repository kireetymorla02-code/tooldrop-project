# ToolDrop Phase 3 — Real Backend Integration

Phase 3 connects the premium customer experience to **PostgreSQL-backed APIs** for orders, payments, notifications, center admin, super admin, and part verification.

## What Was Built

### Database (`server/db/schema-phase3.sql`)
| Table | Purpose |
|-------|---------|
| `service_centers` | Seeded demo centers (slug `c1`–`c8`) |
| `orders` | Customer bookings with tracking step & status |
| `order_status_events` | Audit trail for Swiggy-style timeline |
| `payments` | Pickup fee records (₹200) |
| `notifications` | User notification inbox |
| `part_verifications` | Old/new part photos + customer approval |
| `users.center_id` | Links center admins to a service center |

### Backend APIs

| Method | Route | Role | Purpose |
|--------|-------|------|---------|
| POST | `/api/orders` | customer | Create booking after payment |
| GET | `/api/orders` | customer | Current orders |
| GET | `/api/orders?history=true` | customer | Delivered orders |
| GET | `/api/orders/:id` | customer | Order + status events |
| POST | `/api/orders/:id/advance` | center_admin | Advance tracking step |
| GET | `/api/notifications` | auth | List notifications |
| PATCH | `/api/notifications/:id/read` | auth | Mark read |
| POST | `/api/notifications/read-all` | auth | Mark all read |
| GET | `/api/center/dashboard` | center_admin | Center stats + recent orders |
| GET | `/api/center/orders` | center_admin | Center order queue |
| POST | `/api/center/orders/:id/advance` | center_admin | Advance status |
| POST | `/api/center/orders/:id/parts` | center_admin | Submit part verification |
| GET | `/api/admin/stats` | super_admin | Platform stats |
| GET | `/api/admin/orders` | super_admin | All orders |
| GET | `/api/admin/payments` | super_admin | Payment ledger |
| GET | `/api/parts/orders/:orderId` | customer | View part verifications |
| POST | `/api/parts/:id/respond` | customer | Approve/reject parts |

### Frontend Integration
- `CustomerProvider` syncs orders & notifications from API when logged in
- `createOrder()` persists to PostgreSQL via `POST /api/orders`
- `OrderTracking` shows part verification with Approve/Reject
- **Center admin:** live dashboard, order queue, part upload
- **Super admin:** live stats, orders, payments from DB

### Part Verification Flow
1. Center admin → **Orders** → **Part Verification** → upload part name, image URLs, cost
2. Order moves to **Waiting Approval** · customer notified
3. Customer → **Track Order** → approve or reject parts
4. Approved → **Repair Started** · rejected stays at approval

---

## Setup (after Phase 1 + 2)

```bash
# 1. Database
npm run db:up

# 2. Migrate Phase 1 + Phase 3 schema
npm run server:migrate

# 3. Seed service centers
npm run server:seed

# 4. Start API (one terminal only)
npm run server

# 5. Start frontend
npm start
```

---

## Test Flows

### Customer booking → API
1. Login as **Customer** → complete profile → set location
2. Book: Cars → brand → model → service → center → pickup → pay ₹200
3. Order saved to PostgreSQL · appears in **My Orders**
4. Super admin **Payments** shows pickup fee record

### Center admin
1. Login as **Center Admin** (select role on login screen)
2. Open `/center` → dashboard shows assigned center orders
3. **Advance Status** on an order · customer notification created
4. **Part Verification** → submit → customer sees approval on tracking page

### Super admin
1. Login as **Super Admin**
2. `/admin` → live active/delivered counts and revenue from `payments` table

---

## New / Updated Files

```
server/
├── db/schema-phase3.sql
├── db/seed-phase3.js
├── middleware/roles.js
├── routes/orders.routes.js
├── routes/notifications.routes.js
├── routes/center.routes.js
├── routes/admin.routes.js
├── routes/parts.routes.js
└── services/order.service.js
    services/notification.service.js
    services/partVerification.service.js

src/
├── services/orderService.js
├── services/centerService.js
├── services/adminService.js
├── context/CustomerProvider.jsx (API sync)
├── pages/center/CenterOrders.jsx
├── pages/center/CenterPartVerification.jsx
├── pages/orders/OrderTracking.jsx (part approval)
└── pages/admin/* (API-driven)
```

---

## Phase 3b (future)
- Razorpay live checkout + webhooks
- Google Maps / Mapbox on tracking
- File upload (S3) for part photos
- Push notifications (FCM)
- Mechanics assignment module

---

## npm Scripts Added

| Script | Command |
|--------|---------|
| `npm run server:seed` | Seed service centers into PostgreSQL |

Phase 3 is complete.
