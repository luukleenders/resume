ALTER TABLE "personal" ADD COLUMN "private" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "education" DROP COLUMN "private";