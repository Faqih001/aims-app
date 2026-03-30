CREATE TYPE "public"."payment_status" AS ENUM('COMPLETED', 'PENDING', 'FAILED');--> statement-breakpoint
CREATE TABLE "payments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"transaction_id" text NOT NULL,
	"date" timestamp DEFAULT now() NOT NULL,
	"amount" text NOT NULL,
	"status" "payment_status" DEFAULT 'PENDING' NOT NULL,
	"user_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;