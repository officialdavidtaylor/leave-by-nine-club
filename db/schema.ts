import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import uniqid from 'uniqid';

export const eventsTable = sqliteTable('events_table', {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  dateTime: int('date_time', { mode: 'timestamp' }).notNull(),
  address: text().notNull(),
  description: text().notNull(),
  guestLimit: int('guest_limit'),
  calendarUrl: text(),
});

/** An intersection table linking users to events */
export const invitationsTable = sqliteTable('invitations_table', {
  id: int().primaryKey({ autoIncrement: true }),
  secretKey: text()
    .unique()
    .$defaultFn(() => uniqid.process()),
  didRsvp: int('did_rsvp', { mode: 'boolean' }),
  eventId: int('event_id')
    .references(() => eventsTable.id)
    .notNull(),
  userId: int('user_id')
    .references(() => usersTable.id)
    .notNull(),
});

export const usersTable = sqliteTable('users_table', {
  id: int().primaryKey({ autoIncrement: true }),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text(),
  phone: text(),
});
