import http from "http";
import { randomUUID } from "crypto";
import { makeDb } from "./db/index.js";
import { auditEvent, caseRecord, merchant } from "./db/schema.js";
import { eq } from "drizzle-orm";

function json(res: http.ServerResponse, status: number, body: any) {
  const text = JSON.stringify(body);
  res.writeHead(status, {
    "content-type": "application/json",
    "content-length": Buffer.byteLength(text),
  });
  res.end(text);
}

async function readJson(req: http.IncomingMessage) {
  const chunks: Buffer[] = [];
  for await (const c of req) chunks.push(Buffer.isBuffer(c) ? c : Buffer.from(String(c)));
  const raw = Buffer.concat(chunks).toString("utf8").trim();
  if (!raw) return null;
  return JSON.parse(raw);
}

function getDbOrNull() {
  const url = (process.env.DATABASE_URL || "").trim();
  if (!url) return null;
  return makeDb(url);
}

const server = http.createServer(async (req, res) => {
  try {
    const method = (req.method || "GET").toUpperCase();
    const url = new URL(req.url || "/", "http://localhost");
    const path = url.pathname;

    if (method === "GET" && path === "/health") {
      return json(res, 200, { ok: true });
    }

    // For now, if DATABASE_URL isn't set, we still boot but return 501 for DB routes.
    const db = getDbOrNull();
    const needsDb = path.startsWith("/merchants") || path.startsWith("/cases");
    if (needsDb && !db) {
      return json(res, 501, { ok: false, error: "DATABASE_URL not set" });
    }

    // POST /merchants  { legalName, dbaName?, einLast4?, primaryEmail?, primaryPhone?, caseType? }
    if (method === "POST" && path === "/merchants") {
      const body = (await readJson(req)) || {};
      const legalName = String(body.legalName || "").trim();
      if (!legalName) return json(res, 400, { ok: false, error: "legalName is required" });

      const mId = randomUUID();
      const cId = randomUUID();
      const now = new Date();

      const caseType = String(body.caseType || "low_risk").trim() || "low_risk";

      // Insert merchant + case + audit event
      await (db as any).insert(merchant).values({
        id: mId,
        legalName,
        dbaName: body.dbaName ? String(body.dbaName) : null,
        einLast4: body.einLast4 ? String(body.einLast4) : null,
        primaryEmail: body.primaryEmail ? String(body.primaryEmail) : null,
        primaryPhone: body.primaryPhone ? String(body.primaryPhone) : null,
        status: "draft",
        createdAt: now,
        updatedAt: now,
      });

      await (db as any).insert(caseRecord).values({
        id: cId,
        merchantId: mId,
        type: caseType,
        status: "open",
        stage: "intake",
        assignedAgentId: null,
        createdAt: now,
        updatedAt: now,
      });

      await (db as any).insert(auditEvent).values({
        id: randomUUID(),
        at: now,
        actorRole: "system",
        actorId: null,
        action: "merchant.created",
        entityType: "merchant",
        entityId: mId,
        metaJson: JSON.stringify({ caseId: cId }),
      });

      return json(res, 201, { ok: true, merchantId: mId, caseId: cId });
    }

    // GET /cases/:id
    const m = path.match(/^\/cases\/([0-9a-fA-F-]+)$/);
    if (method === "GET" && m) {
      const id = m[1];
      const rows = await (db as any).select().from(caseRecord).where(eq((caseRecord as any).id, id)).limit(1);
      if (!rows || !rows.length) return json(res, 404, { ok: false, error: "case not found" });
      const c = rows[0];

      const mRows = await (db as any).select().from(merchant).where(eq((merchant as any).id, c.merchantId)).limit(1);
      const merch = mRows && mRows.length ? mRows[0] : null;

      return json(res, 200, { ok: true, case: c, merchant: merch });
    }

    return json(res, 404, { ok: false, error: "not found" });
  } catch (e: any) {
    return json(res, 500, { ok: false, error: e?.message || String(e) });
  }
});

const port = Number(process.env.PORT || 3001);
server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`mintro-hub-api listening on :${port}`);
});
