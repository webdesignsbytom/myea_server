import { Router } from 'express';

import {
  validateAuthentication,
  validateDeveloperRole,
} from '../middleware/auth.js';
import { createNewEcoEvent, getAllEcoEvents } from '../controllers/ecoEvents.js';

const router = Router();

router.get('/get-all-eco-events', getAllEcoEvents);
router.post('/create-new-eco-event', createNewEcoEvent);

export default router;
