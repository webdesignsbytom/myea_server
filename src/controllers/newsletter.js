import {
  checkMemberExistsInDatabase,
  createMemberInNewsletterDatabase,
  findAllNewsletterMembers,
} from '../domain/newsletter.js';
import { myEmitterErrors } from '../event/errorEvents.js';
import { myEmitterNewsletter } from '../event/newsletterEvents.js';
import {
  BadRequestEvent,
  MissingFieldEvent,
  RegistrationServerErrorEvent,
} from '../event/utils/errorUtils.js';
import { NotFoundEvent, ServerErrorEvent } from '../event/utils/errorUtils.js';
import {
  EVENT_MESSAGES,
  sendDataResponse,
  sendMessageResponse,
} from '../utils/responses.js';

export const getAllNewsletterMembers = async (req, res) => {
  console.log('get all newsletter members');

  try {
    const foundMembers = await findAllNewsletterMembers();
    console.log('found members', foundMembers);

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
  console.log('createMessage');
  const { email } = req.body;
  console.log('email', email);
  const lowerCaseEmail = email.toLowerCase();

  try {
    if (!lowerCaseEmail) {
      //
      const missingField = new MissingFieldEvent(
        null,
        'Registration: Missing Field/s event'
      );
      myEmitterErrors.emit('error', missingField);
      return sendMessageResponse(res, missingField.code, missingField.message);
    }

    const foundMember = await checkMemberExistsInDatabase(lowerCaseEmail);
    console.log('foundMember', foundMember);

    if (foundMember) {
      return sendDataResponse(res, 400, { email: EVENT_MESSAGES.emailInUse });
    }

    const newMember = await createMemberInNewsletterDatabase(lowerCaseEmail);
    console.log('newMember', newMember);

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
