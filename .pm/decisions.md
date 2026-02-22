- [2026-02-20T05:37:56.782Z] Decision — Repo shape: choose a single monorepo mintro-hub for Phase 1 speed with strict boundaries: apps/api (backend + workers initially), apps/web (ops/agent UI + merchant portal), packages/shared (schemas/types source of truth).

Decision — Program drift handling: treat Program drift as a hard Apply gate; default resolution is Rebind linked repos (do not use “Accept Program Drift Risk” except for explicit, temporary divergence).

Decision — Patch strategy: when patch_unified fails with “No hunks found”, prefer a write op for small files to avoid churn (e.g., .gitignore, README). (sess sess_2c5..., plan plan_sess_..., exec exec_adhoc...)
- [2026-02-22T04:58:44.496Z] - We will use Drizzle migrations (generate + migrate) as the authoritative DB change mechanism.
  - Dev/Prod strategy:
    - Dev: run `npm --prefix apps/api run db:migrate` against a real DATABASE_URL when available.
    - Prod: run `db:migrate` as a one-shot deploy step (CI/CD), not on app boot.
- We will not auto-run migrations on API server startup (keep explicit deploy/ops control).
- We will enforce deterministic submission idempotency via UNIQUE submission(package_id). (sess sess_4e9..., plan plan_sess_...)
- [2026-02-22T05:10:35.895Z] - Keep API bootable without DATABASE_URL, but return 501 for DB routes (/merchants, /cases) with clear guidance.
- Prefer schema-bound drizzle client for type safety and to avoid any-casts in route handlers.
- Normalize caseType to a strict enum: "low_risk" | "high_risk" (default low_risk). (sess sess_f6b..., plan plan_sess_..., exec exec_17717...)
