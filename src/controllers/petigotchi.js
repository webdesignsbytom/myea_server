// Domain controls
import { createPet, updateUserPetStatusToAlive } from '../domain/petigotchi.js';
import { findUserById } from '../domain/users.js';
// Error events
import { myEmitterErrors } from '../event/errorEvents.js';
import {
  BadRequestEvent,
  MissingFieldEvent,
} from '../event/utils/errorUtils.js';
import { NotFoundEvent, ServerErrorEvent } from '../event/utils/errorUtils.js';
// Response messages
import {
  EVENT_MESSAGES,
  sendDataResponse,
  sendMessageResponse,
} from '../utils/responses.js';

export const createNewPet = async (req, res) => {
  console.log('create new createNewPet');
  const { userId } = req.body;

  console.log('XXXXXXXXXX', userId);

  try {
    if (!userId) {
      //
      const missingField = new MissingFieldEvent(
        null,
        'Registration: Missing user id'
      );
      myEmitterErrors.emit('error', missingField);
      return sendMessageResponse(res, missingField.code, missingField.message);
    }

    const foundUser = await findUserById(userId);

    if (!foundUser) {
      const notFound = new NotFoundEvent(
        req.user,
        EVENT_MESSAGES.notFound,
        EVENT_MESSAGES.userNotFound
      );
      myEmitterErrors.emit('error', notFound);
      return sendMessageResponse(res, notFound.code, notFound.message);
    }

    const createdPetigotchi = await createPet(userId);
    // Update user to having a live pet
    await updateUserPetStatusToAlive(userId);

    if (!createdPetigotchi) {
      const notCreated = new BadRequestEvent(
        EVENT_MESSAGES.badRequest,
        EVENT_MESSAGES.createPetigotchiFail
      );
      myEmitterErrors.emit('error', notCreated);
      return sendMessageResponse(res, notCreated.code, notCreated.message);
    }

    console.log('created pet', createdPetigotchi);

    return sendDataResponse(res, 201, { createdPetigotchi });
  } catch (err) {
    // Error
    const serverError = new ServerErrorEvent(`Register Server error`);
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};