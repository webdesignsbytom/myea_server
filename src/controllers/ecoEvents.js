// Event Emitters
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
// Domain
import { createEcoEvent, findAllEcoEvents } from '../domain/ecoEvents.js';
import { findUserById } from '../domain/users.js';

export const getAllEcoEvents = async (req, res) => {
  try {
    const foundEcoEvents = await findAllEcoEvents();

    console.log('foundEcoEvents', foundEcoEvents);

    if (!foundEcoEvents) {
      const notFound = new NotFoundEvent(
        req.user,
        EVENT_MESSAGES.notFound,
        EVENT_MESSAGES.ecoEventNotFound
      );
      myEmitterErrors.emit('error', notFound);
      return sendMessageResponse(res, notFound.code, notFound.message);
    }

    return sendDataResponse(res, 200, { ecoEvents: foundEcoEvents });
  } catch (err) {
    // Error
    const serverError = new ServerErrorEvent(req.user, `EcoEvents server error`);
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};

export const createNewEcoEvent = async (req, res) => {
  const { userId, eventTitle, eventLocation, eventInfo, eventDate, imageUrl } = req.body;
  console.log('userId', userId);

  try {
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

    console.log('foundUser', foundUser);

    if (!eventTitle || !eventLocation || !eventInfo || !eventDate || !imageUrl) {
      //
      const missingField = new MissingFieldEvent(
        null,
        'Create eco event: Missing Field/s event'
      );
      myEmitterErrors.emit('error', missingField);
      return sendMessageResponse(res, missingField.code, missingField.message);
    }

    const createdEvent = await createEcoEvent(userId, eventTitle, eventLocation, eventInfo, eventDate, imageUrl);
    console.log('created event', createdEvent);

    if (!createdEvent) {
        const badRequest = new BadRequestEvent(
          req.user,
          EVENT_MESSAGES.badRequest,
          EVENT_MESSAGES.createecoEventFail
        );
        myEmitterErrors.emit('error', badRequest);
        return sendMessageResponse(res, badRequest.code, badRequest.message);
      }

    return sendDataResponse(res, 200, { ecoEvents: createdEvent });
  } catch (err) {
    // Error
    const serverError = new ServerErrorEvent(req.user, `EcoEvents server error`);
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};
