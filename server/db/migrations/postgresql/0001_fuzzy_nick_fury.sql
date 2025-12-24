CREATE TABLE "cap_challenges" (
	"token" text PRIMARY KEY NOT NULL,
	"data" jsonb NOT NULL,
	"expires" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cap_tokens" (
	"key" text PRIMARY KEY NOT NULL,
	"expires" bigint NOT NULL
);
--> statement-breakpoint
CREATE INDEX "cap_challenges_expires_idx" ON "cap_challenges" USING btree ("expires");--> statement-breakpoint
CREATE INDEX "cap_tokens_expires_idx" ON "cap_tokens" USING btree ("expires");