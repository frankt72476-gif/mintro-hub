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


export const merchant = pgTable("merchant", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),

  legalName: text("legal_name").notNull(),
  dbaName: text("dba_name"),
  einLast4: text("ein_last4"), // store last4 only; full EIN should not be stored in plaintext

  primaryEmail: text("primary_email"),
  primaryPhone: text("primary_phone"),

  status: text("status").notNull().default("draft") // draft | invited | submitted | approved | declined
});

export const caseRecord = pgTable("case", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),

  merchantId: uuid("merchant_id").notNull(),
  type: text("type").notNull(),   // low_risk | high_risk
  status: text("status").notNull().default("open"), // open | needs_info | submitted | closed
  stage: text("stage").notNull().default("intake"), // intake | preapproval | underwriting | delivered | received

  assignedAgentId: text("assigned_agent_id") // placeholder; later becomes FK to agent.id
});


export const documentRecord = pgTable("document", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),

  caseId: uuid("case_id").notNull(),
  kind: text("kind").notNull(), // e.g. bank_statement | processing_statement | ein_letter | void_check | other

  objectKey: text("object_key").notNull(), // encrypted object storage key/path
  sha256: text("sha256").notNull(),

  uploadedAt: timestamp("uploaded_at", { withTimezone: true }).notNull().defaultNow(),
  uploadedByRole: text("uploaded_by_role").notNull(), // merchant | agent | ops | system
  uploadedById: text("uploaded_by_id"),

  retentionExpiry: timestamp("retention_expiry", { withTimezone: true }).notNull(),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
  deleteReason: text("delete_reason")
});
