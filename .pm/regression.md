- [2026-02-20T05:37:56.798Z] Guardrail — No Apply on PREVIEW_WARN: split into smaller ChangeSpecs until PREVIEW_OK.

Guardrail — Always capture Integrity Packet when Apply is disabled: don’t guess the gate (drift/repoPath/specHash/etc.).

Guardrail — Keep executor artifacts out of git: ensure .executor/ is ignored.

Guardrail — Post-apply proof before commit: run git diff --stat, git diff, git diff --check, npm run build (and tests when added).

Guardrail — Avoid deletes during bootstrap: no delete ops until monorepo migration is stable and verified. (sess sess_2c5..., plan plan_sess_..., exec exec_adhoc...)
- [2026-02-22T04:58:44.510Z] - Don’t break: “No deletes” invariant unless an explicit Delete Risk accept is recorded.
- Don’t break: keep sensitive-doc retention guardrails (TTL + minimal persistence) as Phase 1 core invariant.
- Don’t break: maintain idempotency rule — one underwriting submission per case; stable packageId + unique constraint supports this.
- Don’t break: keep migration discipline — schema changes must produce a migration (drizzle/) and meta updates; never hand-edit existing migration history.
- Don’t break: DB migrations should remain an explicit step (deploy/ops), not silently executed on app startup. (sess sess_4e9..., plan plan_sess_...)
