import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const eventsTable = sqliteTable('events_table', {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  dateTime: int('date_time', { mode: 'timestamp' }).notNull(),
  address: text().notNull(),
  description: text().notNull(),
  guestLimit: int('guest_limit'),
  calendarUrl: text(),
});
