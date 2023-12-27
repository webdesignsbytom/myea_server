import dbClient from '../utils/dbClient.js';

export const findAllTickets = () =>
  dbClient.lotteryTicket.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

export const findAllDraws = () =>
  dbClient.lotteryDraw.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

export const findDrawByDate = (drawDate) =>
  dbClient.lotteryDraw.findFirst({
    where: {
      drawDate: drawDate,
    },
    include: {
      tickets: true,
    },
  });

export const findDrawById = (drawId) =>
  dbClient.lotteryDraw.findFirst({
    where: {
      id: drawId,
    },
    include: {
      tickets: true,
    },
  });

export const createLotteryDraw = (drawDate) =>
  dbClient.lotteryDraw.create({
    data: {
      drawDate: drawDate,
    },
  });

export const createSingleTicket = (drawId, numbers, bonusBall) =>
  dbClient.lotteryTicket.create({
    data: {
      draw: drawId,
      numbers: numbers,
      bonusBall: bonusBall
    },
  });
