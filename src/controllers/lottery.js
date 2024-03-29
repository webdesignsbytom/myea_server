// Domain controls
import {
  createLotteryDraw,
  createSingleTicket,
  findAllDraws,
  findAllTickets,
  findDrawByDate,
  findDrawById,
  findDrawByIdBasic,
  findNextDraw,
} from '../domain/lottery.js';
// Error events
import { myEmitterErrors } from '../event/errorEvents.js';
import {
  NotFoundEvent,
  ServerErrorEvent,
  MissingFieldEvent,
  BadRequestEvent,
  ConfictEvent,
} from '../event/utils/errorUtils.js';
import { LOTTERY_PRIZE_PERCENTAGE } from '../utils/config.js';
import dbClient from '../utils/dbClient.js';
// Response messages
import {
  EVENT_MESSAGES,
  sendDataResponse,
  sendMessageResponse,
} from '../utils/responses.js';

export const getAllTickets = async (req, res) => {
  try {
    const foundTickets = await findAllTickets();

    if (!foundTickets) {
      const notFound = new NotFoundEvent(
        req.user,
        EVENT_MESSAGES.notFound,
        EVENT_MESSAGES.lotteryTag
      );
      myEmitterErrors.emit('error', notFound);
      return sendMessageResponse(res, notFound.code, notFound.message);
    }

    // // myEmitterTickets.emit('get-all-tickets', req.user);
    return sendDataResponse(res, 200, { tickets: foundTickets });
  } catch (err) {
    //
    const serverError = new ServerErrorEvent(req.user, `Lottery server error`);
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};

export const getAllDraws = async (req, res) => {
  console.log('get all draws');

  try {
    const foundDraws = await findAllDraws();

    if (!foundDraws) {
      const notFound = new NotFoundEvent(
        req.user,
        EVENT_MESSAGES.notFound,
        EVENT_MESSAGES.lotteryTag
      );
      myEmitterErrors.emit('error', notFound);
      return sendMessageResponse(res, notFound.code, notFound.message);
    }

    return sendDataResponse(res, 200, { draws: foundDraws });
  } catch (err) {
    //
    const serverError = new ServerErrorEvent(req.user, `Lottery server error`);
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};

export const getNextLotteryDraw = async (req, res) => {
  console.log('get all draws');
  const currentTime = new Date();
  const timeZone = 'Europe/London'; // UK time zone

  try {
    const nextDraw = await findNextDraw(currentTime, timeZone);
    console.log('found draws:', nextDraw);

    if (!nextDraw) {
      const notFound = new NotFoundEvent(
        req.user,
        EVENT_MESSAGES.notFound,
        EVENT_MESSAGES.lotteryTag
      );
      myEmitterErrors.emit('error', notFound);
      return sendMessageResponse(res, notFound.code, notFound.message);
    }

    return sendDataResponse(res, 200, { draws: nextDraw });
  } catch (err) {
    //
    const serverError = new ServerErrorEvent(req.user, `Lottery server error`);
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};

// Function to get a lottery draw by date
export const getLotteryDrawByDate = async (req, res) => {
  const { drawDate } = req.body;

  try {
    if (!drawDate) {
      const missingField = new MissingFieldEvent(
        null,
        'Missing drawDate in request body'
      );
      myEmitterErrors.emit('error', missingField);
      return sendMessageResponse(res, missingField.code, missingField.message);
    }

    const timeZone = 'Europe/London'; // UK time zone

    // Parse the provided drawDate and format it for database comparison
    const parsedDrawDate = new Date(drawDate);
    const formattedDrawDate = format(
      parsedDrawDate,
      "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
      { timeZone }
    );

    // Query the database to find the lottery draw by date
    const lotteryDraw = await dbClient.lotteryDraw.findFirst({
      where: {
        drawDate: formattedDrawDate,
      },
      include: {
        tickets: true,
      },
    });

    if (!lotteryDraw) {
      return sendDataResponse(res, 404, {
        message: 'Lottery draw not found for the specified date.',
      });
    }

    return sendDataResponse(res, 200, { draws: lotteryDraw });
  } catch (err) {
    const serverError = new ServerErrorEvent(req.user, `Lottery server error`);
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};

export const getAllTicketsForDraw = async (req, res) => {
  const { drawId } = req.body;

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
    return sendDataResponse(res, 200, { draws: foundDraw });
  } catch (err) {
    //
    const serverError = new ServerErrorEvent(req.user, `Lottery server error`);
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};

export const createNewDrawEvent = async (req, res) => {
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
    const serverError = new ServerErrorEvent(req.user, `Lottery server error`);
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};

export const purchaseTickets = async (req, res) => {};

export const puchaseSingleTicketForEvent = async (req, res) => {
  const { userId, drawId, numbers, bonusBall } = req.body;

  try {
    if (!numbers || !bonusBall || !drawId || !userId) {
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

    const createdTicket = await createSingleTicket(
      userId,
      drawId,
      numbers,
      bonusBall
    );

    if (!createdTicket) {
      const notCreated = new BadRequestEvent(
        EVENT_MESSAGES.badRequest,
        EVENT_MESSAGES.createTicketFail
      );
      myEmitterErrors.emit('error', notCreated);
      return sendMessageResponse(res, notCreated.code, notCreated.message);
    }

    const percentage = LOTTERY_PRIZE_PERCENTAGE;
    console.log('percentage', percentage);

    // If payment confirmed then add percentage to prize pot
    const updatedPrize = await updateDrawPrize(foundDraw.id, updatePrizeAmount);

    return sendDataResponse(res, 200, { ticket: createdTicket });
  } catch (err) {
    //
    const serverError = new ServerErrorEvent(req.user, `Lottery server error`);
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};

export const puchaseMultipleTicketsForEvent = async (req, res) => {
  console.log('Create new draw event');
  const { userId, tickets } = req.body; // An array of ticket objects with numbers and bonusBall
  console.log('tickets', tickets);

  try {
    if (!Array.isArray(tickets)) {
      const missingField = new MissingFieldEvent(
        null,
        'Ticket creation: Missing tickets array in body'
      );
      myEmitterErrors.emit('error', missingField);
      return sendMessageResponse(res, missingField.code, missingField.message);
    }

    if (!userId) {
      const missingField = new MissingFieldEvent(
        null,
        'Ticket creation: Missing userId in body'
      );
      myEmitterErrors.emit('error', missingField);
      return sendMessageResponse(res, missingField.code, missingField.message);
    }

    if (tickets[0].userId !== userId) {
      const conflict = new ConfictEvent(
        req.user,
        EVENT_MESSAGES.conflict,
        EVENT_MESSAGES.tickerUserIdConflict
      );
      myEmitterErrors.emit('error', conflict);
      return sendMessageResponse(res, conflict.code, conflict.message);
    }

    const ticketData = tickets.map((ticket) => ({
      drawId: ticket.drawId,
      numbers: ticket.numbers,
      bonusBall: ticket.bonusBall,
      userId: ticket.userId,
    }));

    // Proceed with creating tickets
    const createdTickets = await dbClient.lotteryTicket.createMany({
      data: ticketData,
    });

    console.log('createdTickets', createdTickets);

    if (createdTickets.length === 0) {
      const notCreated = new BadRequestEvent(
        EVENT_MESSAGES.badRequest,
        EVENT_MESSAGES.createMultipleTicketsFail
      );
      myEmitterErrors.emit('error', notCreated);
      return sendMessageResponse(res, notCreated.code, notCreated.message);
    }

    console.log('created tickets', createdTickets);

    return sendDataResponse(res, 200, { tickets: createdTickets });
  } catch (err) {
    const serverError = new ServerErrorEvent(
      req.user,
      `Create multiple new tickets`
    );
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};

// Function to set `ticketsAreOnSale` to true for a specific draw
export const setTicketsOnSale = async (req, res) => {
  const drawId = Number(req.params.drawId);

  try {
    // Check if the draw exists
    const foundDraw = await findDrawById(drawId);

    if (!foundDraw) {
      return sendDataResponse(res, 404, { message: 'Lottery draw not found.' });
    }

    // Update the `ticketsAreOnSale` field to true
    await dbClient.lotteryDraw.update({
      where: {
        id: drawId,
      },
      data: {
        ticketsAreOnSale: true,
      },
    });

    return sendDataResponse(res, 200, {
      message: 'Tickets are now on sale for this draw.',
    });
  } catch (err) {
    const serverError = new ServerErrorEvent(req.user, `Lottery server error`);
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};

// Function to set `ticketsAreOnSale` to false for a specific draw
export const setTicketsOffSale = async (req, res) => {
  const drawId = Number(req.params.drawId);

  try {
    // Check if the draw exists
    const foundDraw = await findDrawById(drawId);

    if (!foundDraw) {
      return sendDataResponse(res, 404, { message: 'Lottery draw not found.' });
    }

    // Update the `ticketsAreOnSale` field to false
    await dbClient.lotteryDraw.update({
      where: {
        id: drawId,
      },
      data: {
        ticketsAreOnSale: false,
      },
    });

    return sendDataResponse(res, 200, {
      message: 'Tickets are now off sale for this draw.',
    });
  } catch (err) {
    const serverError = new ServerErrorEvent(
      req.user,
      `Set tickets off sale for draw`
    );
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};

// Function to check all sold tickets for a draw against winning numbers
export const checkForWinningTickets = async (req, res) => {
  const { drawId, winningNumbers, bonusBall } = req.body;

  try {
    // Check if the draw exists
    const foundDraw = await findDrawById(drawId);

    if (!foundDraw) {
      return sendDataResponse(res, 404, { message: 'Lottery draw not found.' });
    }

    // Get all sold tickets for the draw
    const soldTickets = await dbClient.lotteryTicket.findMany({
      where: {
        draw: {
          id: drawId,
        },
      },
    });

    if (soldTickets.length === 0) {
      return sendDataResponse(res, 200, {
        message: 'No tickets were sold for this draw.',
      });
    }

    const matchingTickets = [];

    // Iterate through sold tickets and check for matches
    for (const ticket of soldTickets) {
      if (checkTicketForWin(ticket, winningNumbers, bonusBall)) {
        matchingTickets.push(ticket);
      }
    }

    if (matchingTickets.length === 0) {
      return sendDataResponse(res, 200, {
        message: 'No winning tickets found for this draw.',
      });
    }

    // Update the draw's winnerFound field to true if there are winning tickets
    await dbClient.lotteryDraw.update({
      where: {
        id: drawId,
      },
      data: {
        winnerFound: true,
      },
    });

    return sendDataResponse(res, 200, { tickets: matchingTickets });
  } catch (err) {
    const serverError = new ServerErrorEvent(req.user, `Lottery server error`);
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};

// Function to check if a single ticket is a winning ticket
function checkTicketForWin(ticket, winningNumbers, bonusBall) {
  const { numbers, bonusBall: ticketBonusBall } = ticket;

  // Check if numbers match
  const isNumbersMatch =
    JSON.stringify(numbers.sort()) === JSON.stringify(winningNumbers.sort());

  // Check if bonus ball matches
  const isBonusBallMatch = ticketBonusBall === bonusBall;

  // The ticket is a winning ticket if both numbers and bonus ball match
  return isNumbersMatch && isBonusBallMatch;
}
