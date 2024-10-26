import { db } from './index.server';
import { eventsTable, invitationsTable, usersTable } from './schema';
import { faker } from '@faker-js/faker';

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

  console.log('Seeding completed');
};

await seed();
