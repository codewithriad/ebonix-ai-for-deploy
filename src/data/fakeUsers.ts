import { faker } from '@faker-js/faker';

export const fakeUsers = Array.from({ length: 100 }, (_, i) => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const createdAt = faker.date.past();
  const statusOptions = ['active', 'inactive', 'online', 'away'];
  const roles = ['admin', 'user'];

  return {
    id: i + 1,
    name: `${firstName} ${lastName}`,
    initials: `${firstName[0]}${lastName[0]}`.toUpperCase(),
    email: faker.internet.email(),
    verified: faker.datatype.boolean(),
    country: faker.address.country(),
    role: faker.helpers.arrayElement(roles),
    status: faker.helpers.arrayElement(statusOptions),
    createdAt,
  };
});
