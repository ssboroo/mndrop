CREATE TABLE `model_jobs` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`created_by` text NOT NULL,
	`created_at` text NOT NULL,
	`status` text NOT NULL,
	`progress` integer DEFAULT 0 NOT NULL,
	`source_kind` text NOT NULL,
	`provider_id` text,
	`asset_key` text,
	`drop_id` text,
	`approved_by` text,
	`approved_at` text,
	`error` text
);
--> statement-breakpoint
CREATE INDEX `idx_model_owner` ON `model_jobs` (`created_by`,`created_at`);--> statement-breakpoint
CREATE INDEX `idx_model_public` ON `model_jobs` (`drop_id`,`status`);