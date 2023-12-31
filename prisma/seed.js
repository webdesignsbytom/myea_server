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
          firstName: `xtombrock`,
          lastName: `last xtombrock`,
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
          firstName: 'tomsname',
          lastName: 'tomsun',
          score: 100
        },
      },
    },
  });

  const devLoginRecord = await dbClient.loginRecord.create({
    data: {
      userId: devUser.id,
    },
  });

  const userLoginRecord = await dbClient.loginRecord.create({
    data: {
      userId: testUser.id,
    },
  });
}

seed().catch(async (error) => {
  console.error(error);
  await dbClient.$disconnect();
  process.exit(1);
});
