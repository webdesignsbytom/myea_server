// Domain controls
import {
  createPet,
  findAllPets,
  findPetById,
  levelUpPetById,
  updatePetigotchiName,
  updateUserPetStatusToAlive,
} from '../domain/petigotchi.js';
import { findUserById } from '../domain/users.js';
// Error events
import { myEmitterErrors } from '../event/errorEvents.js';
import {
  BadRequestEvent,
  ConfictEvent,
  MissingFieldEvent,
} from '../event/utils/errorUtils.js';
import { NotFoundEvent, ServerErrorEvent } from '../event/utils/errorUtils.js';
// Response messages
import {
  EVENT_MESSAGES,
  sendDataResponse,
  sendMessageResponse,
} from '../utils/responses.js';

export const getAllPets = async (req, res) => {
  console.log('getAllPets');
  try {
    const foundPets = await findAllPets();

    if (!foundPets) {
      const notFound = new NotFoundEvent(
        req.user,
        EVENT_MESSAGES.notFound,
        EVENT_MESSAGES.petNotFound
      );
      myEmitterErrors.emit('error', notFound);
      return sendMessageResponse(res, notFound.code, notFound.message);
    }

    return sendDataResponse(res, 200, { pets: foundPets });
  } catch (err) {
    // Error
    const serverError = new ServerErrorEvent(
      req.user,
      `Petigotchi server error`
    );
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};

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

    if (!createdPetigotchi) {
      const notCreated = new BadRequestEvent(
        EVENT_MESSAGES.badRequest,
        EVENT_MESSAGES.createPetigotchiFail
      );
      myEmitterErrors.emit('error', notCreated);
      return sendMessageResponse(res, notCreated.code, notCreated.message);
    }

    console.log('created pet', createdPetigotchi);

    return sendDataResponse(res, 201, { petigotchi: createdPetigotchi });
  } catch (err) {
    // Error
    const serverError = new ServerErrorEvent(`Petigotchi Server error`);
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};

export const namePetigotchi = async (req, res) => {
  const { userId, petId, petName } = req.body;

  try {
    if (!userId || !petId || !petName) {
      //
      const missingField = new MissingFieldEvent(
        null,
        'Name petigotchi: Missing Field/s event'
      );
      myEmitterErrors.emit('error', missingField);
      return sendMessageResponse(res, missingField.code, missingField.message);
    }

    if (petName === '') {
      //
      const missingField = new MissingFieldEvent(
        null,
        'Name petigotchi: Name is blank'
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

    const foundPet = await findPetById(petId);

    if (!foundPet) {
      const notFound = new NotFoundEvent(
        req.user,
        EVENT_MESSAGES.notFound,
        EVENT_MESSAGES.petNotFound
      );
      myEmitterErrors.emit('error', notFound);
      return sendMessageResponse(res, notFound.code, notFound.message);
    }

    if (foundPet.userId !== userId) {
      const conflict = new ConfictEvent(
        req.user,
        EVENT_MESSAGES.conflict,
        EVENT_MESSAGES.petIdConflict
      );
      myEmitterErrors.emit('error', conflict);
      return sendMessageResponse(res, conflict.code, conflict.message);
    }

    const namedPetigotchi = await updatePetigotchiName(petId, petName);

    if (!namedPetigotchi) {
      const badRequest = new BadRequestEvent(
        EVENT_MESSAGES.badRequest,
        EVENT_MESSAGES.namePetigotchiFailed
      );
      myEmitterErrors.emit('error', badRequest);
      return sendMessageResponse(res, badRequest.code, badRequest.message);
    }

    console.log('New Name For Pet', namedPetigotchi);

    return sendDataResponse(res, 201, { petigotchi: namedPetigotchi.petName });
  } catch (err) {
    // Error
    const serverError = new ServerErrorEvent(`Petigotchi Server error`);
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};

export const levelUpPetigotchi = async (req, res) => {
  const { userId, petId } = req.body;

  try {
    const foundPet = await findPetById(petId);

    if (!foundPet) {
      const notFound = new NotFoundEvent(
        req.user,
        EVENT_MESSAGES.notFound,
        EVENT_MESSAGES.petNotFound
      );
      myEmitterErrors.emit('error', notFound);
      return sendMessageResponse(res, notFound.code, notFound.message);
    }

    if (foundPet.userId !== userId) {
      const conflict = new ConfictEvent(
        req.user,
        EVENT_MESSAGES.conflict,
        EVENT_MESSAGES.petIdConflict
      );
      myEmitterErrors.emit('error', conflict);
      return sendMessageResponse(res, conflict.code, conflict.message);
    }

    const updatedPet = await levelUpPetById(petId);

    if (!updatedPet) {
      const badRequest = new BadRequestEvent(
        req.user,
        EVENT_MESSAGES.badRequest,
        EVENT_MESSAGES.petLevelUpFailed
      );
      myEmitterErrors.emit('error', badRequest);
      return sendMessageResponse(res, badRequest.code, badRequest.message);
    }

    return sendDataResponse(res, 201, { petigotchi: updatedPet });
  } catch (err) {
    // Error
    const serverError = new ServerErrorEvent(`Petigotchi update pet error`);
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};

export const deathOfAPetigotchi = async (req, res) => {
  console.log('create new createNewPet');
  const { userId, petId } = req.body;

  console.log('XXXXXXXXXX', userId, petId);
  try {
    const foundPet = await findPetById(petId);

    if (!foundPet) {
      const notFound = new NotFoundEvent(
        req.user,
        EVENT_MESSAGES.notFound,
        EVENT_MESSAGES.petNotFound
      );
      myEmitterErrors.emit('error', notFound);
      return sendMessageResponse(res, notFound.code, notFound.message);
    }

    if (foundPet.userId !== userId) {
      const conflict = new ConfictEvent(
        req.user,
        EVENT_MESSAGES.conflict,
        EVENT_MESSAGES.petIdConflict
      );
      myEmitterErrors.emit('error', conflict);
      return sendMessageResponse(res, conflict.code, conflict.message);
    }

    const deadPetigotchi = await killPetById(petId);

    if (!deadPetigotchi) {
      const notFound = new NotFoundEvent(
        req.user,
        EVENT_MESSAGES.notFound,
        EVENT_MESSAGES.petDidntDie
      );
      myEmitterErrors.emit('error', notFound);
      return sendMessageResponse(res, notFound.code, notFound.message);
    }

    return sendDataResponse(res, 201, { petigotchi: deadPetigotchi });
  } catch (err) {
    // Error
    const serverError = new ServerErrorEvent(`Petigotchi Server error`);
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};
