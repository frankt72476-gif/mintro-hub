import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const auditEvent = pgTable("audit_event", {
  id: uuid("id").primaryKey().defaultRandom(),
  at: timestamp("at", { withTimezone: true }).notNull().defaultNow(),
  actorRole: text("actor_role").notNull(),   // merchant | agent | ops | system
  actorId: text("actor_id"),                 // nullable for system
  action: text("action").notNull(),          // e.g. "case.created"
  entityType: text("entity_type").notNull(), // e.g. "case"
  entityId: text("entity_id").notNull(),
  metaJson: text("meta_json")                // JSON string for now; can switch to jsonb later
});
