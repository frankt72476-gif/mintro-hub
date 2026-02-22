DO $$ BEGIN
 ALTER TABLE "case" ADD CONSTRAINT "case_merchant_id_merchant_id_fk" FOREIGN KEY ("merchant_id") REFERENCES "public"."merchant"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "document" ADD CONSTRAINT "document_case_id_case_id_fk" FOREIGN KEY ("case_id") REFERENCES "public"."case"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "submission" ADD CONSTRAINT "submission_case_id_case_id_fk" FOREIGN KEY ("case_id") REFERENCES "public"."case"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "case_merchant_id_idx" ON "case" USING btree ("merchant_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "document_case_id_idx" ON "document" USING btree ("case_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "submission_case_id_idx" ON "submission" USING btree ("case_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "submission_case_id_kind_idx" ON "submission" USING btree ("case_id","kind");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "submission_package_id_uq" ON "submission" USING btree ("package_id");