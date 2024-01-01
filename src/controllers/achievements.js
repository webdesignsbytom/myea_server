// Event Emitters
// Achievements
import { achievementsAndBadgesArray } from '../utils/achievements/achievementsArray.js';
// Responses
import {
  EVENT_MESSAGES,
  sendDataResponse,
  sendMessageResponse,
} from '../utils/responses.js';
// Error Events
import { myEmitterErrors } from '../event/errorEvents.js';
import {
  BadRequestEvent,
  MissingFieldEvent,
  RegistrationServerErrorEvent,
} from '../event/utils/errorUtils.js';
import { NotFoundEvent, ServerErrorEvent } from '../event/utils/errorUtils.js';

export const getAllAchievements = async (req, res) => {
  console.log('get all newsletter members');

  try {
    const foundAchievements = achievementsAndBadgesArray;
    console.log('found foundAchievements', foundAchievements);

    if (!foundAchievements) {
      const notFound = new NotFoundEvent(
        req.user,
        EVENT_MESSAGES.notFound,
        EVENT_MESSAGES.achievementNotFound
      );
      myEmitterErrors.emit('error', notFound);
      return sendMessageResponse(res, notFound.code, notFound.message);
    }

    return sendDataResponse(res, 200, { achievements: foundAchievements });
  } catch (err) {
    // Error
    const serverError = new ServerErrorEvent(
      req.user,
      `Get all newsletter members`
    );
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};

// Add new achevement to user
export const addAchievementToUserProfile = async (req, res) => {
  console.log('get addAchievementToUserProfiles');
  const { achievementId, profileId } = req.body;
  console.log('achievementId', achievementId);
  console.log('profileId', profileId);

  try {


    return sendDataResponse(res, 200, { });
  } catch (err) {
    // Error
    const serverError = new ServerErrorEvent(
      req.user,
      `Get all newsletter members`
    );
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};
