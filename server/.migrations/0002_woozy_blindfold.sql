ALTER TABLE "goal_completions" ADD COLUMN "item" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "goals" ADD COLUMN "item" serial NOT NULL;