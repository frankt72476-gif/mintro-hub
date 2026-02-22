CREATE TABLE IF NOT EXISTS "checklist_config" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"name" text DEFAULT 'default' NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"config_json" text NOT NULL
);
