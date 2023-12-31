import dbClient from '../utils/dbClient.js';

export const createPet = (userId) =>
  dbClient.petigotchi.create({
    where: {
      userId: userId,
    },
  });

export const updateUserPetStatusToAlive = (userId) =>
  dbClient.petigotchi.update({
    where: {
      userId: userId,
    },
    data: {
      hasLivePetigotchi: true,
    },
  });
