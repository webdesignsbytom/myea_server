import { Router } from 'express';
import {
  getAllTickets,
  getAllDraws,
  createNewDrawEvent,
  getAllDrawTickets,
  puchaseSingleTicketForEvent,
  getNextLotteryDraw,
  puchaseMultipleTicketsForEvent,
  getLotteryDrawByDate,
  setTicketsOnSale,
  setTicketsOffSale,
  checkForWinningTickets,
} from '../controllers/lottery.js';
import {
  validateAuthentication,
  validateAdminRole,
} from '../middleware/auth.js';

const router = Router();

router.get('/all-tickets', getAllTickets);
router.get('/all-draws', getAllDraws);
router.get('/check-for-winning-tickets', checkForWinningTickets);
router.get('/set-lottery-ticket-sales-to-open', setTicketsOnSale);
router.get('/set-lottery-ticket-sales-to-close', setTicketsOffSale);
router.get('/get-next-lottery-draw', getNextLotteryDraw);
router.get('/get-draw-by-date', getLotteryDrawByDate);
router.post('/draws/create-new-draw', createNewDrawEvent);
router.post(
  '/draw/:drawId/purchase-single-ticket',
  puchaseSingleTicketForEvent
);
router.post(
  '/draw/:drawId/purchase-mutiple-tickets-for-draw',
  puchaseMultipleTicketsForEvent
);
router.get('/draws/:drawId/all-tickets', getAllDrawTickets);

export default router;
