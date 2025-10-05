# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project overview
- Monorepo with:
  - Frontend: Next.js (App Router, TypeScript, Tailwind) at repo root (app/, components/, lib/)
  - Backend: FastAPI (Python) in backend/
  - Database: PostgreSQL, SQL migrations in scripts/sql/
- Auth: Supabase (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)
- Optional AI: OpenRouter for chat (OPENROUTER_API_KEY), Google Gemini for search (AI SDK) and backend (GEMINI_API_KEY)

Common commands
Frontend (Next.js)
- Install deps (prefer pnpm since pnpm-lock.yaml is present)
```bash path=null start=null
pnpm install
```
- Development server
```bash path=null start=null
pnpm dev
# http://localhost:3000
```
- Build and run production
```bash path=null start=null
pnpm build
pnpm start
```
- Lint
```bash path=null start=null
pnpm lint
```
- If using npm instead of pnpm
```bash path=null start=null
npm ci
npm run dev
npm run build
npm start
npm run lint
```

Backend (FastAPI)
- Install deps
```bash path=null start=null
python -m pip install -r backend/requirements.txt
```
- Run locally (auto-reload)
```bash path=null start=null
uvicorn backend.app.main:app --reload --host 0.0.0.0 --port 8000
```

Environment configuration
- Frontend env (e.g., .env.local)
  - NEXT_PUBLIC_SUPABASE_URL
  - NEXT_PUBLIC_SUPABASE_ANON_KEY
  - Optional for local/backend APIs: NEXT_PUBLIC_BACKEND_API_URL (e.g., http://localhost:8000)
  - For AI chat route: OPENROUTER_API_KEY
- Backend env
  - DATABASE_URL (Postgres connection string)
  - JWT_SECRET, JWT_ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES
  - ADMIN_EMAIL
  - ALLOWED_ORIGINS (comma-separated; include http://localhost:3000 for local dev)
  - Optional: GEMINI_API_KEY (enables /ai endpoints)

Database
- SQL files live in scripts/sql. Apply in order (as referenced in README.md):
  001_init.sql, 002_rls.sql, 003_indexes.sql, 004_sample_data.sql, 006_doctors.sql, 007_blood_bank_registration.sql, 008_role_identifiers.sql, 009_remove_2fa.sql, 010_analytics.sql

High-level architecture
Frontend (Next.js app/ router)
- Global layout: app/layout.tsx sets theme, global styles, and Vercel Analytics.
- Auth pages: app/(auth)/login, app/(auth)/register render forms in components/auth/* and rely on Supabase client (lib/supabaseClient.ts). User role is read from user_metadata.role.
- Role-based access: components/auth/role-guard.tsx gates routes by role. It checks localStorage (ms_token, ms_user_role) and Supabase session; redirects to /login when not permitted.
- Dashboards: app/(dashboard)/* share app/(dashboard)/layout.tsx with Sidebar and TopNav.
- API route handlers:
  - app/api/ai/chat/route.ts: calls OpenRouter (model: google/gemini-2.0-flash-exp:free) using OPENROUTER_API_KEY.
  - app/api/ai/search/route.ts: uses AI SDK @ai-sdk/google to classify queries; returns JSON text.
  - app/api/analytics/route.ts: proxies to the backend via lib/api.ts (apiFetch) using NEXT_PUBLIC_BACKEND_API_URL.
- lib/
  - api.ts defines API_BASE from NEXT_PUBLIC_BACKEND_API_URL and provides apiFetch/authHeader helpers.
  - supabaseClient.ts creates the browser Supabase client; warns if env vars are missing.

Backend (FastAPI)
- Entry: backend/app/main.py – FastAPI app with permissive CORS by default (tighten for production). Routers included:
  - auth (unified router; integrates with JWT/2FA helpers in app/auth.py),
  - geo (location utilities),
  - prescriptions,
  - analytics (placeholder returning a message; intended to integrate with Supabase),
  - ai (Gemini-powered search/chat when GEMINI_API_KEY is set).
- Config: backend/app/config.py – Settings loaded from env.
- Database: backend/app/db.py – asyncpg pool management; code elsewhere calls run_query/get_pool for SQL access.
- Routers examples:
  - routers/resources.py – resource listing and nearby queries with optional haversine distance sorting.
  - routers/appointments.py – CRUD-ish endpoints with role checks (require_roles/get_current_user) and doctor verification flow.
  - routers/ai.py – SQL search + optional Gemini categorization and chat endpoint.

Local development workflow
- Start backend (if you need non-auth APIs/AI/resources)
```bash path=null start=null
$env:DATABASE_URL = "postgres://..."   # pwsh example
uvicorn backend.app.main:app --reload --port 8000
```
- Start frontend
```bash path=null start=null
$env:NEXT_PUBLIC_SUPABASE_URL = "https://..."
$env:NEXT_PUBLIC_SUPABASE_ANON_KEY = "..."
$env:NEXT_PUBLIC_BACKEND_API_URL = "http://localhost:8000"
pnpm dev
```

Testing
- No test scripts are currently defined in package.json, and no Python test framework is configured. If tests are added (e.g., Vitest/Jest or Pytest), expose them via scripts and document single-test invocation here.

Operational notes and gotchas
- next.config.mjs is configured to ignore TypeScript and ESLint errors during build to avoid blocking deploys; fix issues in-editor where possible.
- Frontend → Backend calls: lib/api.ts reads NEXT_PUBLIC_BACKEND_API_URL; ensure it’s set for local dev. The Next.js api/analytics route is a proxy to the FastAPI /analytics endpoint.
- CORS: Update ALLOWED_ORIGINS on the backend for your deployed frontend domain(s).
- AI features are optional. Frontend AI chat requires OPENROUTER_API_KEY; frontend AI search uses the AI SDK; backend AI requires GEMINI_API_KEY.
