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

export const levelUpPetById = (petId) =>
  dbClient.petigotchi.update({
    where: {
      petId: petId,
    },
    data: {
      petLevel: {
        increment: 1
      }
    }
  });

export const updatePetigotchiName = (petId, petName) =>
  dbClient.petigotchi.update({
    where: {
      petId: petId,
    },
    data: {
      petName: petName
    }
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
