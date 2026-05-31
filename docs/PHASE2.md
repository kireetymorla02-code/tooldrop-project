# ToolDrop Phase 2 — Customer Product Experience

Phase 2 transforms ToolDrop from an auth foundation into a **deployable customer-facing product** with premium dashboard, full booking flows, AI recommendations, live tracking, and persistent customer state.

## What Was Built

### Customer state (`CustomerProvider`)
- Location (GPS or manual), persisted to `localStorage` (`tooldrop_customer`)
- Active booking, orders, order history, notifications, loyalty points
- Favorites, saved vehicles/devices, global search
- `createOrder()` — ₹200 pickup fee, tracking step, notification injection

### Location system
- Post-login gate: `/app/location` (GPS or manual city/area)
- `LocationGuard` redirects until location is set
- Location drives nearby centers, AI recommendations, dashboard copy

### Premium dashboard (`/app/home`)
- Quick actions, recent orders, AI recommendations, nearby centers
- Upcoming pickups, profile summary, loyalty pill
- Emergency / roadside buttons, category service cards

### Global navigation
- **Sidebar:** Dashboard, Cars, Bikes, Electronics, My Orders, Notifications, AI Assistant, Rewards, Emergency, Profile, Settings
- **Topbar:** Search, location link, theme toggle, notifications badge, profile, live clock, weather widget

### Cars / Bikes / Electronics
- A–Z brand grids with search, logos, zoom transitions
- Model pages with search/filter
- Service type selection → AI/manual center pick → pickup schedule → ₹200 payment → live tracking

### AI engine (demo)
- `recommendationEngine.js` scores centers by distance, rating, load, pricing, ETA
- Explanations shown on center pages and dashboard (`AiInsightCard`, `AiExplanationBanner`)

### Notifications, Rewards, Emergency, Support, FAQ, AI Chat
- Full notification center with read/unread state
- Loyalty tiers (Silver / Gold / Platinum)
- Emergency & roadside dispatch UI
- AI assistant chat with demo responses
- FAQ accordion, support hub

### Order tracking
- Swiggy-style animated timeline (`OrderTimeline`)
- Map simulation with moving partner dot
- 12-step status flow from Order Created → Delivered

---

## File Structure (Phase 2 additions)

```
src/
├── components/
│   ├── AiInsightCard.jsx          # AI center recommendation cards
│   ├── BrandLogo.jsx              # Brand logo with fallback monogram
│   ├── LocationGuard.jsx          # Redirects to /app/location if unset
│   ├── OrderTimeline.jsx          # Animated order status timeline
│   └── PageHeader.jsx             # Consistent page headers + SearchFilterBar
├── context/
│   └── CustomerProvider.jsx       # Customer app state + persistence
├── constants/
│   └── routes.js                  # getPostAuthRoute, getCustomerLandingRoute
├── data/
│   ├── carBrands.js               # 34+ car brands A–Z
│   ├── cars.js                    # Services, models, tracking steps, PICKUP_FEE
│   ├── bikes.js                   # Bike brands, services, models
│   ├── electronics.js             # 18 categories + services
│   ├── centers.js                 # Demo service centers + AI fields
│   ├── customer.js                # Notifications, FAQ, AI responses, rewards
│   └── orders.js                  # Seed orders with trackingStep
├── pages/
│   ├── Dashboard.jsx              # Premium customer dashboard
│   ├── LocationSetup.jsx          # GPS / manual location
│   ├── Notifications.jsx
│   ├── Rewards.jsx
│   ├── Emergency.jsx
│   ├── Support.jsx
│   ├── FAQ.jsx
│   ├── AiAssist.jsx               # Chat UI
│   ├── cars/                      # Brands → Models → Services → Centers → Pickup → Payment
│   ├── bikes/                     # Same flow as cars
│   ├── electronics/               # Category → Services → Centers → Pickup → Payment
│   └── orders/
│       ├── Orders.jsx
│       ├── History.jsx
│       └── OrderTracking.jsx      # Live tracking page
├── utils/
│   ├── modelFactory.js            # Auto-generate models for brands without custom data
│   └── recommendationEngine.js    # AI center scoring + explanations
└── styles/global.css              # Phase 2 dashboard, timeline, chat, rewards CSS
```

---

## Routes

### Auth (unchanged from Phase 1)
| Route | Screen |
|-------|--------|
| `/splash` | Splash |
| `/login` | Login (OTP / Google) |
| `/otp` | OTP verification |
| `/welcome` | Welcome animation + sound |
| `/profile/setup` | Profile completion |

### Customer app (`/app/*`)
| Route | Screen |
|-------|--------|
| `/app/home` | Dashboard |
| `/app/location` | Location setup (GPS / manual) |
| `/app/cars` | Car brands A–Z |
| `/app/cars/:brand` | Car models |
| `/app/cars/:brand/:model/services` | Service types |
| `/app/cars/:brand/:model/centers` | AI / manual center selection |
| `/app/cars/:brand/:model/pickup` | Pickup scheduling |
| `/app/cars/:brand/:model/payment` | ₹200 pickup fee payment |
| `/app/bikes` … `/payment` | Same pattern as cars |
| `/app/electronics` | Category grid |
| `/app/electronics/:category/services` | Electronics services |
| `/app/electronics/:category/centers` | Center selection |
| `/app/electronics/:category/pickup` | Pickup |
| `/app/electronics/:category/payment` | Payment |
| `/app/orders` | Current orders |
| `/app/orders/history` | Order history |
| `/app/orders/:orderId/track` | Live tracking |
| `/app/notifications` | Notification center |
| `/app/rewards` | Loyalty & tiers |
| `/app/emergency` | Emergency / roadside |
| `/app/ai-assist` | AI chat assistant |
| `/app/support` | Support hub |
| `/app/faq` | FAQ |
| `/app/profile` | Profile summary |
| `/app/favorites` | Saved centers |
| `/app/settings` | Theme, language, notifications |

### Admin / Center (Phase 1, unchanged)
- `/admin/*` — Super admin
- `/center/*` — Center admin (Phase 3 placeholders)

---

## Post-auth flow (customer)

```
Login → OTP → Welcome → Profile Setup (if incomplete)
  → Location Setup (if unset) → Dashboard
```

---

## Payment model

- **Due now:** ₹200 pickup fee only (`PICKUP_FEE` in `cars.js`)
- **Pending:** Final service cost after inspection — shown on payment & tracking screens

---

## Dependencies

**No new npm packages** were added in Phase 2. Existing stack:

| Package | Use |
|---------|-----|
| `react-router-dom` | Routing |
| `framer-motion` | Page transitions, cards, timeline |
| `react-icons` | Sidebar, dashboard, topbar icons |
| `firebase` | Google sign-in (optional) |
| `tailwindcss` | Utility layer (dev) |

Backend (Phase 1): Express, PostgreSQL, JWT — unchanged.

---

## Local storage keys

| Key | Purpose |
|-----|---------|
| `tooldrop_session` | Auth session (Phase 1) |
| `tooldrop_customer` | Location, orders, notifications, loyalty (Phase 2) |

---

## Verification

```bash
npm run build   # ✓ passes
npm test        # ✓ passes
npm start       # Dev server — login → set location → explore /app/*
```

---

## Phase 3 preview (awaiting approval)

- Real booking APIs + PostgreSQL orders
- Maps integration (Google Maps / Mapbox)
- Center admin & super admin full modules
- Real payment gateway (Razorpay)
- Push notifications
- Part verification photo workflow

**Phase 2 is complete. Awaiting approval before Phase 3.**
