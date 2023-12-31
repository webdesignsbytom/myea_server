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

export const updateUserProfile = async (req, res) => {
  console.log('get all newsletter members');

  try {
    return sendDataResponse(res, 200, 'newsletterMembers: foundMembers');
  } catch (err) {
    // Error
    const serverError = new ServerErrorEvent(req.user, `Update user profile`);
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};
