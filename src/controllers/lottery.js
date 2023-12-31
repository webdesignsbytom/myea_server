// Domain controls
import {
  createLotteryDraw,
  createSingleTicket,
  findAllDraws,
  findAllTickets,
  findDrawByDate,
  findDrawById,
} from '../domain/lottery.js';
// Error events
import { myEmitterErrors } from '../event/errorEvents.js';
import {
  NotFoundEvent,
  ServerErrorEvent,
  MissingFieldEvent,
} from '../event/utils/errorUtils.js';
// Response messages
import {
  EVENT_MESSAGES,
  sendDataResponse,
  sendMessageResponse,
} from '../utils/responses.js';

export const getAllTickets = async (req, res) => {
  console.log('get all tickets');

  try {
    const foundTickets = await findAllTickets();
    console.log('found tickets:', foundTickets);

    if (!foundTickets) {
      const notFound = new NotFoundEvent(
        req.user,
        EVENT_MESSAGES.notFound,
        EVENT_MESSAGES.lotteryTag
      );
      myEmitterErrors.emit('error', notFound);
      return sendMessageResponse(res, notFound.code, notFound.message);
    }

    // foundTickets.forEach((event) => {
    //   const createdDate = event.createdAt.toLocaleString();
    //   const updatedDate = event.updatedAt.toLocaleString();
    //   event.createdAt = createdDate;
    //   event.updatedAt = updatedDate;
    // });
    // // myEmitterTickets.emit('get-all-tickets', req.user);
    return sendDataResponse(res, 200, { tickets: foundTickets });
  } catch (err) {
    //
    const serverError = new ServerErrorEvent(req.user, `Get all tickets`);
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};

export const getAllDraws = async (req, res) => {
  console.log('get all draws');

  try {
    const foundDraws = await findAllDraws();
    console.log('found draws:', foundDraws);

    if (!foundDraws) {
      const notFound = new NotFoundEvent(
        req.user,
        EVENT_MESSAGES.notFound,
        EVENT_MESSAGES.lotteryTag
      );
      myEmitterErrors.emit('error', notFound);
      return sendMessageResponse(res, notFound.code, notFound.message);
    }

    // foundDraws.forEach((event) => {
    //   const createdDate = event.createdAt.toLocaleString();
    //   const updatedDate = event.updatedAt.toLocaleString();
    //   event.createdAt = createdDate;
    //   event.updatedAt = updatedDate;
    // });
    // // myEmitterDraws.emit('get-all-draws', req.user);
    return sendDataResponse(res, 200, { draws: foundDraws });
  } catch (err) {
    //
    const serverError = new ServerErrorEvent(req.user, `Get all draws`);
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};

export const getAllDrawTickets = async (req, res) => {
  console.log('get all draw tickets');
  const drawId = Number(req.params.drawId);
  try {
    if (!drawId) {
      //
      const missingField = new MissingFieldEvent(
        null,
        'Draw finding: Missing id in body'
      );
      myEmitterErrors.emit('error', missingField);
      return sendMessageResponse(res, missingField.code, missingField.message);
    }

    const foundDraw = await findDrawById(drawId);

    if (!foundDraw) {
      return sendDataResponse(res, 400, { email: EVENT_MESSAGES.dateNotInUse });
    }

    // // myEmitterDraws.emit('get-all-draws', req.user);
    return sendDataResponse(res, 200, { draw: foundDraw });
  } catch (err) {
    //
    const serverError = new ServerErrorEvent(req.user, `Get all draws`);
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};

export const createNewDrawEvent = async (req, res) => {
  console.log('Create new draw event');
  const { drawDate } = req.body;

  try {
    if (!drawDate) {
      //
      const missingField = new MissingFieldEvent(
        null,
        'Draw creation: Missing date in body'
      );
      myEmitterErrors.emit('error', missingField);
      return sendMessageResponse(res, missingField.code, missingField.message);
    }

    // Check draw doesn't exist
    const foundDraw = await findDrawByDate(drawDate);

    if (foundDraw) {
      return sendDataResponse(res, 400, { email: EVENT_MESSAGES.dateInUse });
    }

    const createdDraw = await createLotteryDraw(drawDate);

    if (!createdDraw) {
      const notCreated = new BadRequestEvent(
        EVENT_MESSAGES.badRequest,
        EVENT_MESSAGES.createDrawFail
      );
      myEmitterErrors.emit('error', notCreated);
      return sendMessageResponse(res, notCreated.code, notCreated.message);
    }

    console.log('created user', createdDraw);

    // myEmitterUsers.emit('draw-created', createdDraw);

    return sendDataResponse(res, 200, { draw: createdDraw });
  } catch (err) {
    //
    const serverError = new ServerErrorEvent(req.user, `Create new draw`);
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};

export const puchaseSingleTicketForEvent = async (req, res) => {
  console.log('Create new draw event');
  const { numbers, bonusBall } = req.body;
  const drawId = Number(req.params.drawId);

  try {
    if (!numbers || !bonusBall || !drawId) {
      //
      const missingField = new MissingFieldEvent(
        null,
        'Ticket creation: Missing numbers in body'
      );
      myEmitterErrors.emit('error', missingField);
      return sendMessageResponse(res, missingField.code, missingField.message);
    }

    // Check draw doesn't exist
    const foundDraw = await findDrawById(drawId);

    if (!foundDraw) {
      return sendDataResponse(res, 400, { email: EVENT_MESSAGES.dateNotInUse });
    }

    const createdTicket = await createSingleTicket(drawId, numbers, bonusBall);

    if (!createdTicket) {
      const notCreated = new BadRequestEvent(
        EVENT_MESSAGES.badRequest,
        EVENT_MESSAGES.createTicketFail
      );
      myEmitterErrors.emit('error', notCreated);
      return sendMessageResponse(res, notCreated.code, notCreated.message);
    }

    console.log('created ticket', createdTicket);

    // myEmitterUsers.emit('draw-created', createdTicket);

    return sendDataResponse(res, 200, { ticket: createdTicket });
  } catch (err) {
    //
    const serverError = new ServerErrorEvent(req.user, `Create new draw`);
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};
