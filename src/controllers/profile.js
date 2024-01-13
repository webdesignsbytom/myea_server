// Domain
import {
  addToScore,
  getUserProfileById,
  updateUserProfileData,
} from '../domain/profile.js';
// Error events
import { myEmitterErrors } from '../event/errorEvents.js';
import {
  BadRequestEvent,
  ConfictEvent,
  MissingFieldEvent,
} from '../event/utils/errorUtils.js';
import { NotFoundEvent, ServerErrorEvent } from '../event/utils/errorUtils.js';
import { userLevelsArray } from '../utils/levels/levelsArray.js';
// Response messages
import {
  EVENT_MESSAGES,
  sendDataResponse,
  sendMessageResponse,
} from '../utils/responses.js';

export const updateUserProfile = async (req, res) => {
  console.log('get all newsletter members');
  const {
    userId,
    profileId,
    username,
    city,
    country,
    gender,
    firstName,
    lastName,
    bio,
    profileImage,
    isPrivateProfile,
  } = req.body;

  console.log(
    'XXX',
    userId,
    profileId,
    username,
    city,
    country,
    gender,
    firstName,
    lastName,
    bio,
    profileImage,
    isPrivateProfile
  );

  try {
    const foundProfile = await getUserProfileById(profileId);

    // Check user is making the request.
    if (foundProfile.userId !== userId) {
      const conflict = new ConfictEvent(
        req.user,
        EVENT_MESSAGES.conflict,
        EVENT_MESSAGES.profileIdConflict
      );
      myEmitterErrors.emit('error', conflict);
      return sendMessageResponse(res, conflict.code, conflict.message);
    }

    const updatedUserProfile = await updateUserProfileData(
      profileId,
      username,
      city,
      country,
      gender,
      firstName,
      lastName,
      bio,
      profileImage,
      isPrivateProfile
    );

    console.log('updated user profile', updatedUserProfile);

    if (!updatedUserProfile) {
      const notFound = new BadRequestEvent(
        req.user,
        EVENT_MESSAGES.badRequest,
        EVENT_MESSAGES.updateProfileFail
      );
      myEmitterErrors.emit('error', notFound);
      return sendMessageResponse(res, notFound.code, notFound.message);
    }

    return sendDataResponse(res, 200, { profile: updatedUserProfile });
  } catch (err) {
    // Error
    const serverError = new ServerErrorEvent(req.user, `Update user profile`);
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};

export const updateUsersScore = async (req, res) => {
  console.log('updateUsersScore');
  const { amountToAddToScore, profileId, userId } = req.body;

  console.log(
    'amountToAddToScore + profileId',
    amountToAddToScore,
    profileId,
    userId
  );

  try {
    const foundProfile = await getUserProfileById(profileId);

    // Check user is making the request.
    if (foundProfile.userId !== userId) {
      const conflict = new ConfictEvent(
        req.user,
        EVENT_MESSAGES.conflict,
        EVENT_MESSAGES.profileIdConflict
      );
      myEmitterErrors.emit('error', conflict);
      return sendMessageResponse(res, conflict.code, conflict.message);
    }

    const updatedProfileScore = await addToScore(profileId, amountToAddToScore);

    console.log('updatedProfileScore', updatedProfileScore);

    if (!updatedProfileScore) {
      const notFound = new BadRequestEvent(
        req.user,
        EVENT_MESSAGES.badRequest,
        EVENT_MESSAGES.updateScoreFail
      );
      myEmitterErrors.emit('error', notFound);
      return sendMessageResponse(res, notFound.code, notFound.message);
    }

    const levelsArr = userLevelsArray;

    let currentLvl = foundProfile.level;
    let newLvl;

    // Iterate through the levels array to find the highest achievable level starting from the current level
    for (let i = currentLvl - 1; i >= 0; i--) {
      const levelInfo = levelsArr[i];

      // Check if the user's score is greater than or equal to the required score for this level
      if (updatedProfileScore.score >= levelInfo.scoreRequired) {
        newLvl = levelInfo.level;
      } else {
        break; // Exit the loop when the score requirement is not met for a level
      }
    }

    // Return data
    if (newLvl) {
      return sendDataResponse(res, 200, {
        updatedScore: updatedProfileScore,
        newLvl: newLvl,
      });
    } else {
      return sendDataResponse(res, 200, { updatedScore: updatedProfileScore });
    }

  } catch (err) {
    // Error
    const serverError = new ServerErrorEvent(
      req.user,
      `Update user profile score failed`
    );
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};
