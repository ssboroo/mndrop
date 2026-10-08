CREATE TABLE `audit_logs` (
	`id` text PRIMARY KEY NOT NULL,
	`actor` text NOT NULL,
	`action` text NOT NULL,
	`record_id` text NOT NULL,
	`detail` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `authorizations` (
	`id` text PRIMARY KEY NOT NULL,
	`brand` text NOT NULL,
	`document_url` text NOT NULL,
	`valid_until` text NOT NULL,
	`created_by` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `campaigns` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`brand` text NOT NULL,
	`status` text DEFAULT 'DRAFT' NOT NULL,
	`opens_at` text NOT NULL,
	`closes_at` text NOT NULL,
	`authorization_id` text,
	`approved_by` text,
	`closed_at` text,
	`created_by` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `customer_items` (
	`user_id` text NOT NULL,
	`kind` text NOT NULL,
	`drop_id` text NOT NULL,
	`variant` text DEFAULT '' NOT NULL,
	`quantity` integer DEFAULT 1 NOT NULL,
	`created_at` text NOT NULL,
	PRIMARY KEY(`user_id`, `kind`, `drop_id`, `variant`)
);
--> statement-breakpoint
CREATE TABLE `order_lines` (
	`id` text PRIMARY KEY NOT NULL,
	`order_id` text NOT NULL,
	`sku` text NOT NULL,
	`variant` text NOT NULL,
	`quantity` integer NOT NULL,
	`unit_mnt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`campaign_id` text NOT NULL,
	`status` text DEFAULT 'PAYMENT_PENDING' NOT NULL,
	`total_mnt` integer NOT NULL,
	`payment_reference` text,
	`created_at` text NOT NULL
);
