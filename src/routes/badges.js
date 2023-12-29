import { Router } from 'express';

import { getAllBadges } from '../controllers/badges.js';
import {
  validateAuthentication,
  validateDeveloperRole,
} from '../middleware/auth.js';

const router = Router();

router.get('/get-all-badges', getAllBadges);

export default router;
