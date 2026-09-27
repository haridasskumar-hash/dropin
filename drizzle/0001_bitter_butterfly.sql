CREATE TABLE `bookings` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`date` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`data` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `bookings_email_created` ON `bookings` (`email`,`created_at`);--> statement-breakpoint
CREATE INDEX `bookings_created` ON `bookings` (`created_at`);