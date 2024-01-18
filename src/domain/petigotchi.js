import dbClient from '../utils/dbClient.js';

export const findAllPets = () =>
  dbClient.petigotchi.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

export const findPetById = (id) =>
  dbClient.petigotchi.findUnique({
    where: {
      id: id,
    },
  });

export const createPet = (userId) =>
  dbClient.petigotchi.create({
    data: {
      userId: userId,
    },
  });

export const levelUpPetById = (petId) =>
  dbClient.petigotchi.update({
    where: {
      id: petId,
    },
    data: {
      petLevel: {
        increment: 1,
      },
    },
  });

export const updatePetigotchiName = (petId, petName) =>
  dbClient.petigotchi.update({
    where: {
      id: petId,
    },
    data: {
      petName: petName,
    },
  });

export const killPetById = (id) =>
  dbClient.petigotchi.delete({
    where: {
      id: id,
    },
  });

export const updateUserPetStatusToAlive = (userId) =>
  dbClient.user.update({
    where: {
      userId: userId,
    },
    data: {
      hasLivePetigotchi: true,
    },
  });
