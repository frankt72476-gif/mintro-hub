- [2026-02-20T05:37:56.791Z] Lesson — Programs Checkpoints persistence: checkpoints are edited in a JSON textarea; must click Save ICP JSON (to write rec.checkpoints) and then Save Program (to persist), otherwise Program Context Packet shows [].

Lesson — Apply gating diagnosis: if Apply is disabled, always copy the Integrity Packet; the blocker may be program drift (binding hash mismatch), not checks.

Lesson — Tooling baseline: npm run build can fail with tsc not found until npm install is run (node_modules was removed/ignored during hygiene).

Lesson — Patch mismatch: patch_unified is sensitive to exact context; fetch the file first and regenerate patch, or use write for small deterministic files.

Lesson — Windows line endings: expect LF↔CRLF warnings; avoid repo-wide renormalization unless it causes meaningful churn. (sess sess_2c5..., plan plan_sess_..., exec exec_adhoc...)
- [2026-02-22T04:58:44.503Z] - Unified diff patching can fail due to BOM/encoding differences; when that happens, prefer deterministic full-file replace (write op) to reduce churn.
- `drizzle-kit generate` does not require a live DB connection, but `drizzle-kit migrate` does; treat migrate failures as environment/runtime issues first.
- `git diff --name-only` won’t show untracked generated migration files; use `git status -sb` to confirm untracked outputs.
- Windows line-ending warnings (LF↔CRLF) are noisy but non-blocking; validate scope via staged diff stats before commit. (sess sess_4e9..., plan plan_sess_...)
- [2026-02-22T05:10:35.906Z] - Unified patch can fail due to BOM/encoding drift; full-file write ops are the most reliable deterministic fix when patches don’t match.
- Using drizzle(pool, { schema }) enables typed column refs (caseRecord.id) and removes the need for (db as any).
- Parse errors should be treated as user input errors (400), not server errors (500). (sess sess_f6b..., plan plan_sess_..., exec exec_17717...)
