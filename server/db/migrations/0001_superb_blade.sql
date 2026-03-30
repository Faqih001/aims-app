CREATE TYPE "public"."accreditation_status" AS ENUM('ACTIVE', 'EXPIRED', 'PENDING_RENEWAL');--> statement-breakpoint
CREATE TABLE "accreditations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"status" "accreditation_status" DEFAULT 'PENDING_RENEWAL' NOT NULL,
	"expiry_date" timestamp,
	"application_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "accreditations" ADD CONSTRAINT "accreditations_application_id_applications_id_fk" FOREIGN KEY ("application_id") REFERENCES "public"."applications"("id") ON DELETE no action ON UPDATE no action;