CREATE TABLE IF NOT EXISTS "status_mapping_config" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"name" text DEFAULT 'default' NOT NULL,
	"mapping_json" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "submission" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"case_id" uuid NOT NULL,
	"kind" text NOT NULL,
	"package_id" text NOT NULL,
	"status" text DEFAULT 'queued' NOT NULL,
	"delivered_at" timestamp with time zone,
	"received_at" timestamp with time zone,
	"ewi_id" text,
	"attempt_count" integer DEFAULT 0 NOT NULL,
	"last_error" text
);
