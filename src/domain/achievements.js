import dbClient from '../utils/dbClient.js';

export const updateNewAchievement = (profileId, updatedArray) =>
  dbClient.achievements.update({
    where: {
      profileId: profileId
    },
    data: {
      achievementsGained: updatedArray
    }
  });

