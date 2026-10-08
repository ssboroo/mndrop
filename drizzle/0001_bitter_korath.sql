CREATE INDEX `idx_order_lines_order` ON `order_lines` (`order_id`);--> statement-breakpoint
CREATE INDEX `idx_orders_user` ON `orders` (`user_id`);--> statement-breakpoint
CREATE INDEX `idx_orders_status` ON `orders` (`status`);