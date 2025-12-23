CREATE TABLE "danmaku" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"avatar" text NOT NULL,
	"name" text NOT NULL,
	"content" text NOT NULL,
	"link" text NOT NULL,
	"hide" boolean DEFAULT false NOT NULL
);
