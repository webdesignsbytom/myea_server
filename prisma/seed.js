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

  // Generate lottery draws for the next 52 weeks
  const currentDate = new Date();
  const timeZone = 'Europe/London'; // UK time zone
  for (let i = 0; i < 52; i++) {
    const drawDate = addWeeks(currentDate, i);
    // Set the draw time to 7 PM UK time
    drawDate.setHours(19, 0, 0, 0);
    
    // Create a lottery draw record for this week
    await dbClient.lotteryDraw.create({
      data: {
        prize: 10, // Adjust the prize amount as needed
        drawDate: format(drawDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx", { timeZone }),
      },
    });
  }
}

seed().catch(async (error) => {
  console.error(error);
  await dbClient.$disconnect();
  process.exit(1);
});
