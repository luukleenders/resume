ALTER TABLE "education" RENAME COLUMN "meta" TO "meta_label";--> statement-breakpoint
ALTER TABLE "education" ADD COLUMN "meta_value" text;