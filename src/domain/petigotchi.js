import dbClient from '../utils/dbClient.js';

export const findPetById = (id) =>
  dbClient.petigotchi.findUnique({
    where: {
      id: id,
    },
  });

export const createPet = (userId) =>
  dbClient.petigotchi.create({
    where: {
      userId: userId,
    },
  });

export const killPetById = (id) =>
  dbClient.petigotchi.delete({
    where: {
      id: id,
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
