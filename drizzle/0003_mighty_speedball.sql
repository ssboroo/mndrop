CREATE TABLE `commerce_auth_tokens` (
	`hash` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`expires_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `commerce_contacts` (
	`user_id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `commerce_content` (
	`campaign_id` text PRIMARY KEY NOT NULL,
	`content` text NOT NULL,
	`review_by` text,
	`review_at` text,
	FOREIGN KEY (`campaign_id`) REFERENCES `campaigns`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `commerce_decisions` (
	`order_id` text PRIMARY KEY NOT NULL,
	`state` text NOT NULL,
	`valid` integer NOT NULL,
	FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT "decision_valid" CHECK("commerce_decisions"."valid" = 1)
);
--> statement-breakpoint
CREATE TABLE `commerce_events` (
	`id` text PRIMARY KEY NOT NULL,
	`order_id` text NOT NULL,
	`state` text NOT NULL,
	`note` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `commerce_event_once` ON `commerce_events` (`order_id`,`state`);--> statement-breakpoint
CREATE TABLE `commerce_imports` (
	`id` text PRIMARY KEY NOT NULL,
	`partner_id` text NOT NULL,
	`format` text NOT NULL,
	`payload` text NOT NULL,
	`status` text DEFAULT 'REVIEW' NOT NULL,
	`created_by` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `commerce_jobs` (
	`id` text PRIMARY KEY NOT NULL,
	`kind` text NOT NULL,
	`payload` text NOT NULL,
	`status` text DEFAULT 'PENDING' NOT NULL,
	`attempts` integer DEFAULT 0 NOT NULL,
	`run_at` text NOT NULL,
	`lock_at` text,
	`error` text
);
--> statement-breakpoint
CREATE TABLE `commerce_line_variants` (
	`line_id` text PRIMARY KEY NOT NULL,
	`variant_id` text NOT NULL,
	FOREIGN KEY (`line_id`) REFERENCES `order_lines`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`variant_id`) REFERENCES `commerce_variants`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `commerce_media` (
	`id` text PRIMARY KEY NOT NULL,
	`asset_key` text NOT NULL,
	`type` text NOT NULL,
	`approved_by` text,
	`created_by` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `commerce_order_meta` (
	`order_id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`address` text NOT NULL,
	`expires_at` text NOT NULL,
	`idempotency` text NOT NULL,
	`invoice_id` text,
	`invoice_data` text,
	`callback_hash` text NOT NULL,
	`shipping_state` text DEFAULT 'PRE_ORDER' NOT NULL,
	`tracking` text,
	`supplier_reference` text,
	`checked_at` text,
	FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `commerce_order_meta_idempotency_unique` ON `commerce_order_meta` (`idempotency`);--> statement-breakpoint
CREATE UNIQUE INDEX `commerce_order_meta_invoice_id_unique` ON `commerce_order_meta` (`invoice_id`);--> statement-breakpoint
CREATE TABLE `commerce_purchase_orders` (
	`id` text PRIMARY KEY NOT NULL,
	`campaign_id` text NOT NULL,
	`status` text NOT NULL,
	`quantities` text NOT NULL,
	`approved_by` text,
	`approved_at` text,
	`supplier_reference` text,
	`invoice_url` text,
	`created_at` text NOT NULL,
	FOREIGN KEY (`campaign_id`) REFERENCES `campaigns`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `commerce_purchase_orders_campaign_id_unique` ON `commerce_purchase_orders` (`campaign_id`);--> statement-breakpoint
CREATE TABLE `commerce_rate` (
	`key` text PRIMARY KEY NOT NULL,
	`count` integer NOT NULL,
	CONSTRAINT "email_rate_limit" CHECK("commerce_rate"."count" <= 3)
);
--> statement-breakpoint
CREATE TABLE `commerce_receipts` (
	`payment_id` text PRIMARY KEY NOT NULL,
	`order_id` text NOT NULL,
	`amount_mnt` integer NOT NULL,
	`verified_at` text NOT NULL,
	`evidence` text NOT NULL,
	FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `commerce_sessions` (
	`hash` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`email` text NOT NULL,
	`expires_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `commerce_tickets` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`email` text NOT NULL,
	`order_id` text,
	`subject` text NOT NULL,
	`message` text NOT NULL,
	`status` text DEFAULT 'OPEN' NOT NULL,
	`response` text,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `commerce_usage` (
	`user_id` text NOT NULL,
	`variant_id` text NOT NULL,
	`quantity` integer NOT NULL,
	`max_quantity` integer NOT NULL,
	PRIMARY KEY(`user_id`, `variant_id`),
	FOREIGN KEY (`variant_id`) REFERENCES `commerce_variants`(`id`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT "customer_variant_limit" CHECK("commerce_usage"."quantity" >= 0 AND "commerce_usage"."quantity" <= "commerce_usage"."max_quantity")
);
--> statement-breakpoint
CREATE TABLE `commerce_variants` (
	`id` text PRIMARY KEY NOT NULL,
	`campaign_id` text NOT NULL,
	`sku` text NOT NULL,
	`label` text NOT NULL,
	`price_mnt` integer NOT NULL,
	`map_mnt` integer NOT NULL,
	`allocation` integer NOT NULL,
	`reserved` integer DEFAULT 0 NOT NULL,
	`paid_qty` integer DEFAULT 0 NOT NULL,
	`moq` integer NOT NULL,
	`max_per_customer` integer NOT NULL,
	FOREIGN KEY (`campaign_id`) REFERENCES `campaigns`(`id`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT "variant_inventory" CHECK("commerce_variants"."reserved" >= 0 AND "commerce_variants"."paid_qty" >= 0 AND "commerce_variants"."reserved" + "commerce_variants"."paid_qty" <= "commerce_variants"."allocation"),
	CONSTRAINT "variant_price" CHECK("commerce_variants"."price_mnt" > 0 AND "commerce_variants"."map_mnt" >= 0 AND "commerce_variants"."price_mnt" >= "commerce_variants"."map_mnt")
);
--> statement-breakpoint
CREATE UNIQUE INDEX `variant_sku_label` ON `commerce_variants` (`campaign_id`,`sku`,`label`);