import { db } from './index.server';
import { eventsTable, invitationsTable, usersTable } from './schema';
import { faker } from '@faker-js/faker';
import uniqid from 'uniqid';

const seed = async () => {
  await db.delete(eventsTable).all();
  const events: (typeof eventsTable.$inferInsert)[] = [];

  for (let i = 0; i < 10; i += 1) {
    events.push({
      id: i + 1,
      address: faker.location.streetAddress(),
      dateTime: faker.date.future(),
      description: faker.lorem.paragraph(),
      title: faker.food.dish() + ' party',
    });
  }

  await db.insert(eventsTable).values(events);
  console.log('eventsTable seeded~');

  await db.delete(usersTable).all();
  const users: (typeof usersTable.$inferInsert)[] = [];

  for (let i = 0; i < 10; i += 1) {
    users.push({
      id: i + 1,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
    });
  }

  await db.insert(usersTable).values(users);
  console.log('usersTable seeded~');

  await db.delete(invitationsTable).all();
  const registrations: (typeof invitationsTable.$inferInsert)[] = [];

  for (const event of events) {
    for (const user of users) {
      registrations.push({
        eventId: event.id!,
        userId: user.id!,
        secretKey: uniqid.process(),
        didRsvp: false,
      });
    }
  }

  await db.insert(invitationsTable).values(registrations);
  console.log('invitationsTable seeded~');

  console.log('Seeding completed');
};

await seed();
