// Domain
import {
  checkMemberExistsInDatabase,
  createMemberInNewsletterDatabase,
  deleteMemberFromNewsletter,
  findAllNewsletterMembers,
  findNewsletterMemberById,
} from '../domain/newsletter.js';
import { findUserById, updateUserToNewsletterMember } from '../domain/users.js';
// Event emitter
import { myEmitterErrors } from '../event/errorEvents.js';
import { myEmitterNewsletter } from '../event/newsletterEvents.js';
// Responses
import {
  EVENT_MESSAGES,
  sendDataResponse,
  sendMessageResponse,
} from '../utils/responses.js';
// Error events
import {
  BadRequestEvent,
  MissingFieldEvent,
  RegistrationServerErrorEvent,
} from '../event/utils/errorUtils.js';
import { NotFoundEvent, ServerErrorEvent } from '../event/utils/errorUtils.js';

export const createNewCrossword = async (req, res) => {
  try {
    const wordList = [];
    const gameBoard = setRandomGameBoard()

    return sendDataResponse(res, 200, { newsletterMembers: foundMembers });
    //
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

const setRandomGameBoard = () => {
    const board = {
      nine: 2,
      eight: 2,
      seven: 4,
      six: 4,
      five: 4,
      four: 5,
      three: 2,
    }

    return board;
}