CREATE TABLE IF NOT EXISTS "apartments" (
	"id" text PRIMARY KEY NOT NULL,
	"number" text NOT NULL,
	"rent" real[] NOT NULL,
	"tenant" text NOT NULL,
	"payment_methods" "payment_method" NOT NULL,
	"note" text,
	"building_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "buildings" (
	"id" text PRIMARY KEY NOT NULL,
	"landlord" text NOT NULL,
	"street" text NOT NULL,
	"city" text NOT NULL,
	"state" text NOT NULL,
	"zip_code" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "receipts" (
	"id" text PRIMARY KEY NOT NULL,
	"apartment_id" text NOT NULL,
	"month" real NOT NULL,
	"year" real NOT NULL,
	"value" real NOT NULL,
	"tenant" text NOT NULL,
	"payment_methods" "payment_method" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_buildings" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text,
	"building_id" text,
	"approved" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"first_name" text,
	"last_name" text,
	"email" text,
	"avatar" text,
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
 ALTER TABLE "receipts" ADD CONSTRAINT "receipts_apartment_id_apartments_id_fk" FOREIGN KEY ("apartment_id") REFERENCES "public"."apartments"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_buildings" ADD CONSTRAINT "users_buildings_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_buildings" ADD CONSTRAINT "users_buildings_building_id_buildings_id_fk" FOREIGN KEY ("building_id") REFERENCES "public"."buildings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
