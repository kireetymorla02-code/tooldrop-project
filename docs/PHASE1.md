# ToolDrop — Phase 1 Complete

## Goal
Authentication + production foundation without breaking existing luxury UI.

## What was created

### Backend (`server/`)
| Path | Purpose |
|------|---------|
| `index.js` | Express API entry |
| `config/db.js` | PostgreSQL pool |
| `db/schema.sql` | Users + OTP sessions tables |
| `db/migrate.js` | Run schema migration |
| `routes/auth.routes.js` | Send OTP, verify OTP, Google sync |
| `routes/users.routes.js` | Profile GET/PUT |
| `services/otp.service.js` | Real OTP generation & verification |
| `middleware/auth.js` | JWT auth middleware |

### Frontend (new/updated)
| Path | Purpose |
|------|---------|
| `src/firebase/firebase.js` | Google Sign-In (when env configured) |
| `src/services/api.js` | HTTP client |
| `src/services/authService.js` | Auth API calls |
| `src/constants/roles.js` | customer / center_admin / super_admin |
| `src/context/AuthProvider.jsx` | Session + JWT persistence |
| `src/pages/profile/ProfileSetup.jsx` | Profile storage form |
| `src/layouts/CenterAdminLayout.jsx` | Service center admin shell |
| `src/hooks/useWelcomeSound.js` | Netflix-style welcome sound |

### Infrastructure
- `docker-compose.yml` — PostgreSQL 16 for local dev
- `.env.example` — frontend env template
- `server/.env.example` — backend env template

## Roles & routes

| Role | After login |
|------|-------------|
| Customer | `/app/home` |
| Service Center Admin | `/center` |
| Super Admin | `/admin` |

Incomplete profile → `/profile/setup` first.

## Dependencies installed

**Frontend** (already present): `firebase`, `react-router-dom`, `framer-motion`, `react-icons`

**Backend** (`server/`): `express`, `pg`, `jsonwebtoken`, `cors`, `dotenv`

## Environment variables

**Frontend** — copy `.env.example` → `.env`

**Backend** — copy `server/.env.example` → `server/.env`

Required:
- `DATABASE_URL`
- `JWT_SECRET`

Optional:
- Firebase vars → Google login
- Twilio/SMTP → production OTP delivery (dev logs OTP to console)

## How to run

```bash
# 1. Database
docker compose up -d

# 2. Backend
cd server && cp .env.example .env && npm install && npm run db:migrate && npm run dev

# 3. Frontend (new terminal)
cp .env.example .env
npm start
```

## Auth flow

1. Splash → Login
2. Choose role + Phone/Email OTP (or Google if Firebase configured)
3. API sends OTP → check **server console** in development
4. OTP verify → JWT + user row in PostgreSQL
5. Welcome + sound → profile setup if needed → dashboard

## What did NOT change (Phase 2+)

- Cars/Bikes/Electronics full A–Z catalogs
- GPS / Maps
- AI pricing & recommendations engine
- Live tracking backend
- Parts verification uploads
- Full admin/service center operations

## Approval

Phase 1 is complete. **Do not start Phase 2 until approved.**
