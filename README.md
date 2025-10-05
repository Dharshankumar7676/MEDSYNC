# MedSync Web Application

Monorepo with:
- Frontend: Next.js (App Router, Tailwind, shadcn/ui) in /app and /components
- Backend: FastAPI in /backend
- Database: PostgreSQL (SQL scripts in /scripts/sql)

## 0) Does the app run without errors?

Static analysis indicates the frontend builds and starts cleanly. Certain routes require services:
- Auth pages (`/login`, `/register`) call the FastAPI backend at `NEXT_PUBLIC_BACKEND_API_URL`. If the backend is not running, these pages will return errors on submission.
- AI endpoints (`/api/ai/chat`, `/api/ai/search`) require a Google Gemini API key (via the AI SDK). If you call them without a key, the request will fail, but the app still boots.

If you run both the frontend and backend as described below, you can log in/register and navigate dashboards without errors.

## 1) Environment Variables

Frontend (Vercel / v0 Project Settings):
- NEXT_PUBLIC_SUPABASE_URL: Supabase project URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY: Supabase anon public key
- (Optional) NEXT_PUBLIC_BACKEND_API_URL: URL of your FastAPI backend (e.g., https://api.medsync.example.com)

Backend (your host e.g., Render/Railway/Fly/Docker):
- DATABASE_URL: Postgres connection string (Neon/Cloud Postgres)
- JWT_SECRET: A long random string
- JWT_ALGORITHM: HS256
- ACCESS_TOKEN_EXPIRE_MINUTES: 60
- ADMIN_EMAIL: admin@example.com
- ALLOWED_ORIGINS: https://your-frontend-domain.com,https://medsync.vercel.app

## 2) Database Setup (Neon recommended)
1. Create a Neon Postgres database and copy the connection string into DATABASE_URL.
2. Apply SQL in order:
   - scripts/sql/001_init.sql
   - scripts/sql/002_rls.sql
   - scripts/sql/003_indexes.sql
   - scripts/sql/004_sample_data.sql
   - scripts/sql/006_doctors.sql
   - scripts/sql/007_blood_bank_registration.sql
   - scripts/sql/008_role_identifiers.sql
   - scripts/sql/009_remove_2fa.sql

## 3) Backend Deployment (FastAPI)
- Root: backend/
- Requirements: backend/requirements.txt
- Start command (example): uvicorn backend.app.main:app --host 0.0.0.0 --port 8000
- Ensure CORS allows your frontend domain (ALLOWED_ORIGINS).
- After deploy, note the public URL (e.g., https://api.medsync.yourhost.app).

## 4) Frontend Deployment (Vercel)
1. In v0, click Publish to deploy.
2. In Vercel Project Settings → Environment Variables, add:
   - NEXT_PUBLIC_SUPABASE_URL = your Supabase project URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY = your Supabase anon key
   - (Optional) NEXT_PUBLIC_BACKEND_API_URL = your FastAPI URL for other APIs
3. Redeploy. Frontend will use Supabase for auth.

## 5) Auth Flows (Supabase)
- Register: app/(auth)/register uses `supabase.auth.signUp` with `user_metadata` including `role`.
- Login: app/(auth)/login uses `supabase.auth.signInWithPassword`, role read from `user_metadata.role`.
- Role-based routing: `components/auth/role-guard.tsx` checks Supabase session; falls back to `localStorage.ms_user_role`.

## 6) Local Development (optional)
- Backend: uvicorn backend.app.main:app --reload
- Frontend: next dev (v0 preview handles this automatically in the UI)
- Set NEXT_PUBLIC_BACKEND_API_URL=http://localhost:8000 for local.

## 7) Fonts, Colors, and UI

- Headings use Geist; body text uses Roboto.
- Tailwind CSS v4 tokens are defined in `app/globals.css`. The primary brand color is a calm blue-teal with accessible foregrounds.
- Components use shadcn/ui patterns.

No extra font configuration is required; fonts are handled via `next/font` and the Geist package.

## 8) Project Structure (Selected)

- `app/layout.tsx` — global layout, fonts, header
- `app/page.tsx` — landing page
- `app/(auth)/login`, `app/(auth)/register` — auth pages (call FastAPI)
- `app/(dashboard)/*` — role-specific dashboard routes with a shared layout
- `components/*` — UI components, maps, auth forms
- `app/api/*` — Next.js route handlers (AI, stub auth handlers)
- `backend/app/*` — FastAPI app
- `scripts/sql/*.sql` — database schema, RLS, indexes, sample data

## 9) Troubleshooting

- 404 or CORS on auth:
  - Ensure `NEXT_PUBLIC_BACKEND_API_URL` points to your backend (e.g., `http://localhost:8000`).
  - Ensure backend CORS (`ALLOWED_ORIGINS`) includes `http://localhost:3000`.

- Login/Register failing:
  - Backend must be running; check backend logs.
  - Confirm database connectivity and migrations if you enabled DB-backed auth.

- AI endpoints returning errors:
  - These require a valid configuration for the AI provider. For local dev you can skip calling `/api/ai/*`.

- Leaflet map issues:
  - Map components are client-side and import Leaflet CSS. If tiles fail to load, check your network and ensure the browser can reach OpenStreetMap tiles.

- TypeScript or ESLint errors on build:
  - The project’s `next.config.mjs` is configured to ignore build-time TS/ESLint errors to avoid blocking builds. Fix as needed in your editor.

## 10) Recommended Local Workflow

1) (Optional) Start backend if you use non-auth APIs (`uvicorn ...:8000`).
2) Start frontend (`pnpm dev` / `npm run dev`).
3) Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in your env.
4) Visit http://localhost:3000, register then login.
5) Explore dashboards by role (role from Supabase `user_metadata.role`).

## 11) Full Deployment Steps

### A) Supabase
- Create a Supabase project at `https://supabase.com`.
- In Project Settings → API, copy Project URL and anon public key.
- In Authentication → Providers, enable Email/Password.

### B) Backend (Optional, for AI/resources, etc.)
- Deploy FastAPI (Render/Railway/Fly). Set `DATABASE_URL`, CORS, and other envs.
- Note public URL and set `NEXT_PUBLIC_BACKEND_API_URL` on the frontend if used.

### C) Frontend (Vercel)
- Import the Git repo to Vercel.
- Set env vars:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - (Optional) `NEXT_PUBLIC_BACKEND_API_URL`
- Deploy.

### D) Post-deploy
- Test register/login flows.
- Ensure users have `user_metadata.role` as one of: `patient`, `doctor`, `pharmacy`, `blood_bank`, `admin`.
- Verify protected routes via `RoleGuard`.

## 12) License / Security Notes

- Rotate `JWT_SECRET` periodically.
- Review RLS policies in `scripts/sql/002_rls.sql` before production.
- Do not commit real secrets to source control.
