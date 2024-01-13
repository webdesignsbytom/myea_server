// Domain
import {
  addToScore,
  getUserProfileById,
  updateProfileLevel,
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
  const { amountToAddToScore, profileId, userId } = req.body;


  try {
    const foundProfile = await getUserProfileById(profileId);

    if (!foundProfile) {
      const notFound = new BadRequestEvent(
        req.user,
        EVENT_MESSAGES.notFound,
        EVENT_MESSAGES.profileNotFound
      );
      myEmitterErrors.emit('error', notFound);
      return sendMessageResponse(res, notFound.code, notFound.message);
    }

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

    if (!updatedProfileScore) {
      const badRequest = new BadRequestEvent(
        req.user,
        EVENT_MESSAGES.badRequest,
        EVENT_MESSAGES.updateScoreFail
      );
      myEmitterErrors.emit('error', badRequest);
      return sendMessageResponse(res, badRequest.code, badRequest.message);
    }

    const levelsArr = userLevelsArray;

    let currentLvl = foundProfile.level;
    let currentScore = updatedProfileScore.score;

    let newLvl;

    // Iterate through the levels array to find the highest achievable level starting from the current level
    for (let i = 0; i < levelsArr.length; i++) {
      const levelInfo = levelsArr[i];

      if (currentScore < levelInfo.scoreRequired) {
        newLvl = levelInfo.level - 1;
        break;
      }
    }

    // Return data
    if (newLvl > currentLvl) {
      const updatedProfileLevel = await updateProfileLevel(profileId, newLvl);

      if (!updatedProfileLevel) {
        const badRequest = new BadRequestEvent(
          req.user,
          EVENT_MESSAGES.badRequest,
          EVENT_MESSAGES.updateLevelFail
        );
        myEmitterErrors.emit('error', badRequest);
        return sendMessageResponse(res, badRequest.code, badRequest.message);
      }

      return sendDataResponse(res, 200, {
        updatedScore: updatedProfileScore.score,
        newLvl: newLvl,
      });
      //
    } else {
      return sendDataResponse(res, 200, {
        updatedScore: updatedProfileScore.score,
      });
    }
    //
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
