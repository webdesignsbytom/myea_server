import dbClient from '../utils/dbClient.js';

export const findAllEcoEvents = () =>
  dbClient.ecoEvent.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

export const createEcoEvent = (userId, eventTitle, eventLocation, eventInfo, eventDate, imageUrl) =>
  dbClient.ecoEvent.create({
    data: {
        userId: userId,
        eventTitle: eventTitle,
        eventInfo: eventInfo,
        eventLocation: eventLocation,
        eventDate: eventDate,
        imageUrl: imageUrl
    }
  });
