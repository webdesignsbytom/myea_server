import bcrypt from 'bcrypt';
import dbClient from '../src/utils/dbClient.js';
// Env variables
import { SEED_PASS } from '../src/utils/config.js';
// Date
import { format, addWeeks } from 'date-fns';

let drawId = 1;

async function seed() {
  const password = await bcrypt.hash(SEED_PASS, 8);

  // Create test and admin users
  const testUser = await dbClient.user.create({
    data: {
      id: 'test1',
      email: `test@test.com`,
      password,
      profile: {
        create: {
          id: 'test1profile',
          username: `xtombrock`,
          firstName: `xtombrock`,
          lastName: `last xtombrock`,
        },
      },
    },
  });

  const devUser = await dbClient.user.create({
    data: {
      id: 'dev',
      email: 'dev@dev.com',
      password,
      role: 'DEVELOPER',
      profile: {
        create: {
          id: 'devprofile',
          username: `deve`,
          firstName: 'tomsname',
          lastName: 'tomsun',
          score: 1
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

    // EVENTS
    const eventOne = await dbClient.event.create({
      data: {
        type: 'ERROR',
        topic: 'Test event',
        code: 500,
        content: '500 test content',
      },
    });
    const eventTwo = await dbClient.event.create({
      data: {
        type: 'USER',
        topic: 'Test event',
        code: 200,
        content: '200 test content',
      },
    });
    const eventThree = await dbClient.event.create({
      data: {
        type: 'ADMIN',
        topic: 'Test event',
        code: 201,
        content: '201 test content',
      },
    });
    const eventFour = await dbClient.event.create({
      data: {
        type: 'VISITOR',
        topic: 'Test event',
        code: 201,
        content: '201 test content',
      },
    });
    const eventFive = await dbClient.event.create({
      data: {
        type: 'DEVELOPER',
        topic: 'Test event',
        code: 201,
        content: '201 test content',
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
        id: `draw-${drawId++}`,
        prize: 10,
        drawDate: format(drawDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx", { timeZone }),
      },
    });
  }


  // Create lottery tickets
  const lotteryTickets = [
    {
      numbers: [1, 2, 3, 4, 5],
      bonusBall: 6,
      drawId: 'draw-1', // Change this to the appropriate draw ID
      userId: 'dev', // Change this to the appropriate user ID
    },
    {
      numbers: [6, 7, 8, 9, 10],
      bonusBall: 11,
      drawId: 'draw-2', // Change this to the appropriate draw ID
      userId: 'dev', // Change this to the appropriate user ID
    },
  ];

  for (const ticketData of lotteryTickets) {
    await dbClient.lotteryTicket.create({
      data: {
        ...ticketData,
      },
    });
  }

  const ecoEventOne = await dbClient.ecoEvent.create({
    data: {
      eventDate: new Date(2024, 3, 15), // April 15, 2024
      eventLocation: "Central Park, New York City",
      eventTitle: "Urban Greenery Week",
      eventInfo: "A week-long event dedicated to planting new trees and creating urban gardens in the heart of the city. Workshops on sustainable urban living and the importance of green spaces in urban areas will be held.",
      imageUrl: "url_to_urban_greenery_image.jpg",
      userId: testUser.id, // Assuming using testUser for demonstration
    },
  });
  
  // Eco Event 2: Beach Clean-Up Day
  const ecoEventTwo = await dbClient.ecoEvent.create({
    data: {
      eventDate: new Date(2024, 5, 20), // June 20, 2024
      eventLocation: "Santa Monica Beach, California",
      eventTitle: "Beach Clean-Up Day",
      eventInfo: "Join us for a day of making our beaches cleaner and safer for everyone. Volunteers will be provided with all necessary equipment. Educational sessions on marine pollution and its impact will also be conducted.",
      imageUrl: "url_to_beach_cleanup_image.jpg",
      userId: testUser.id,
    },
  });
  
  // Eco Event 3: Solar Energy Fair
  const ecoEventThree = await dbClient.ecoEvent.create({
    data: {
      eventDate: new Date(2024, 8, 5), // September 5, 2024
      eventLocation: "Downtown, Chicago",
      eventTitle: "Solar Energy Fair",
      eventInfo: "Discover the latest innovations in solar technology, meet experts in the field, and learn how you can make your home more energy-efficient with solar power. Exhibitions, workshops, and interactive sessions for all ages.",
      imageUrl: "url_to_solar_energy_fair_image.jpg",
      userId: testUser.id,
    },
  });
}

seed().catch(async (error) => {
  console.error(error);
  await dbClient.$disconnect();
  process.exit(1);
});
