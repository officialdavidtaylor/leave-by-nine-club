CREATE TABLE `events_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`date_time` integer NOT NULL,
	`address` text NOT NULL,
	`description` text NOT NULL,
	`guest_limit` integer,
	`calendarUrl` text
);
