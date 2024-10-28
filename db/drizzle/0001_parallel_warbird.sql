CREATE TABLE `invitations_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`secretKey` text,
	`did_rsvp` integer,
	`event_id` integer NOT NULL,
	`user_id` integer NOT NULL,
	FOREIGN KEY (`event_id`) REFERENCES `events_table`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `users_table`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `invitations_table_secretKey_unique` ON `invitations_table` (`secretKey`);--> statement-breakpoint
CREATE TABLE `users_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`email` text,
	`phone` text
);
