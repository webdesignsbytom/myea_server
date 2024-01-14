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

export const getAllNewsletterMembers = async (req, res) => {
  try {
    const foundMembers = await findAllNewsletterMembers();

    if (!foundMembers) {
      const notFound = new NotFoundEvent(
        req.user,
        EVENT_MESSAGES.notFound,
        EVENT_MESSAGES.newsletterTag
      );
      myEmitterErrors.emit('error', notFound);
      return sendMessageResponse(res, notFound.code, notFound.message);
    }

    myEmitterNewsletter.emit('get-all-newsletter-members', req.user);
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

export const createNewNewsletterMember = async (req, res) => {
  const { userId, email } = req.body;

  const lowerCaseEmail = email.toLowerCase();

  try {
    // check for email
    if (!lowerCaseEmail) {
      //
      const missingField = new MissingFieldEvent(
        null,
        'Registration: Missing Field/s event'
      );
      myEmitterErrors.emit('error', missingField);
      return sendMessageResponse(res, missingField.code, missingField.message);
    }

    // If they exist already in database reject request
    const foundMember = await checkMemberExistsInDatabase(lowerCaseEmail);

    if (foundMember) {
      return sendDataResponse(res, 400, { message: EVENT_MESSAGES.emailInUse });
    }

    // Check if request is from a user
    if (userId) {
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

      // If user is a member update them
      if (foundUser) {
        let updatedNewsletterMembership = await updateUserToNewsletterMember(
          userId
        );

        if (!updatedNewsletterMembership) {
          const notCreated = new BadRequestEvent(
            null,
            EVENT_MESSAGES.badRequest,
            EVENT_MESSAGES.updateUserToNewsletterMembership
          );
          myEmitterErrors.emit('error', notCreated);
          return sendMessageResponse(res, notCreated.code, notCreated.message);
        }
      }
    }

    // Create new newletter member model
    const newMember = await createMemberInNewsletterDatabase(
      lowerCaseEmail,
      userId
    );

    if (!newMember) {
      const notCreated = new BadRequestEvent(
        null,
        EVENT_MESSAGES.badRequest,
        EVENT_MESSAGES.createNewsletterFail
      );
      myEmitterErrors.emit('error', notCreated);
      return sendMessageResponse(res, notCreated.code, notCreated.message);
    }

    myEmitterNewsletter.emit('newsletter-register', newMember);
    return sendDataResponse(res, 201, { newsletterMember: newMember });
    //
  } catch (err) {
    // Error
    const serverError = new RegistrationServerErrorEvent(
      'visitor',
      `Sign Up To Newsletter`
    );
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};

export const deleteMemberFromNewsletterDatabase = async (req, res) => {
  const { newsletterId } = req.body;

  try {
    // check for email
    if (!newsletterId) {
      //
      const missingField = new MissingFieldEvent(
        null,
        'Delete membership: Missing newsletterId event'
      );
      myEmitterErrors.emit('error', missingField);
      return sendMessageResponse(res, missingField.code, missingField.message);
    }

    // If they exist already in database reject request
    const foundMember = await findNewsletterMemberById(newsletterId);

    if (!foundMember) {
      return sendDataResponse(res, 400, {
        message: EVENT_MESSAGES.emailNotFound,
      });
    }

    // Create new newletter member model
    const deletedMember = await deleteMemberFromNewsletter(newsletterId);

    if (!deletedMember) {
      const notRemoved = new BadRequestEvent(
        null,
        EVENT_MESSAGES.badRequest,
        EVENT_MESSAGES.removeNewsletterFail
      );
      myEmitterErrors.emit('error', notRemoved);
      return sendMessageResponse(res, notRemoved.code, notRemoved.message);
    }

    return sendDataResponse(res, 201, { removed: deletedMember });
    //
  } catch (err) {
    // Error
    const serverError = new RegistrationServerErrorEvent(
      'visitor',
      `Delete Newsletter`
    );
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};
