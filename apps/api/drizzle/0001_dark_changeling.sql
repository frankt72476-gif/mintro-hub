CREATE TABLE IF NOT EXISTS "case" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"merchant_id" uuid NOT NULL,
	"type" text NOT NULL,
	"status" text DEFAULT 'open' NOT NULL,
	"stage" text DEFAULT 'intake' NOT NULL,
	"assigned_agent_id" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "merchant" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"legal_name" text NOT NULL,
	"dba_name" text,
	"ein_last4" text,
	"primary_email" text,
	"primary_phone" text,
	"status" text DEFAULT 'draft' NOT NULL
);
