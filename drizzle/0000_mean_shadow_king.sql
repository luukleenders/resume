CREATE TABLE "education" (
	"id" serial PRIMARY KEY NOT NULL,
	"label" varchar(255) NOT NULL,
	"footnote" text,
	"meta" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "experiences" (
	"id" serial PRIMARY KEY NOT NULL,
	"company" varchar(255) NOT NULL,
	"position" varchar(255) NOT NULL,
	"location" varchar(255) NOT NULL,
	"period" varchar(255) NOT NULL,
	"url" varchar(255) NOT NULL,
	"techstack" text[] NOT NULL,
	"bullets" text[] NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "personal" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar(255) NOT NULL,
	"value" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "skills" (
	"id" serial PRIMARY KEY NOT NULL,
	"category" varchar(255) NOT NULL,
	"items" text[] NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
