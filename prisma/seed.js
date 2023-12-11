import bcrypt from 'bcrypt';
import dbClient from '../src/utils/dbClient.js';
// Env variables
import { SEED_PASS } from '../src/utils/config.js';

async function seed() {
  const password = await bcrypt.hash(SEED_PASS, 8);

  // Create test and admin users
  const testUser = await dbClient.user.create({
    data: {
      email: `test@test.com`,
      password,
      profile: {
        create: {
          username: `xtombrock`,
        },
      },
    },
  });

  const devUser = await dbClient.user.create({
    data: {
      email: 'dev@dev.com',
      password,
      role: 'DEVELOPER',
      profile: {
        create: {
          username: `deve`,
        },
      },
    },
  });
}

seed().catch(async (error) => {
  console.error(error);
  await dbClient.$disconnect();
  process.exit(1);
});
