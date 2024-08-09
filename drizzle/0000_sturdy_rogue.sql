DO $$ BEGIN
 CREATE TYPE "public"."payment_method" AS ENUM('CHECK', 'MONEY ORDER', 'OTHER');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "apartments" (
	"id" serial PRIMARY KEY NOT NULL,
	"number" text NOT NULL,
	"rent" real[] NOT NULL,
	"tenant" text NOT NULL,
	"payment_methods" "payment_method" NOT NULL,
	"note" text,
	"building_id" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "buildings" (
	"id" serial PRIMARY KEY NOT NULL,
	"landlord" text NOT NULL,
	"street" text NOT NULL,
	"city" text NOT NULL,
	"state" text NOT NULL,
	"zip_code" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "managers" (
	"id" serial PRIMARY KEY NOT NULL,
	"clerk_user_id" text NOT NULL,
	"building_id" serial NOT NULL,
	"approved" boolean DEFAULT false,
	"first_name" text,
	"last_name" text,
	"email" text,
	"avatar" text,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "managers_clerk_user_id_unique" UNIQUE("clerk_user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "receipts" (
	"id" serial PRIMARY KEY NOT NULL,
	"apartment_id" serial NOT NULL,
	"month" real NOT NULL,
	"year" real NOT NULL,
	"value" real NOT NULL,
	"tenant" text NOT NULL,
	"payment_methods" "payment_method" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "apartments" ADD CONSTRAINT "apartments_building_id_buildings_id_fk" FOREIGN KEY ("building_id") REFERENCES "public"."buildings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "managers" ADD CONSTRAINT "managers_building_id_buildings_id_fk" FOREIGN KEY ("building_id") REFERENCES "public"."buildings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "receipts" ADD CONSTRAINT "receipts_apartment_id_apartments_id_fk" FOREIGN KEY ("apartment_id") REFERENCES "public"."apartments"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
