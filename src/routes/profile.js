import { Router } from 'express';

import {
  validateAuthentication,
  validateDeveloperRole,
} from '../middleware/auth.js';
import { updateUserProfile } from '../controllers/profile.js';

const router = Router();

router.put('/update-user-profile', updateUserProfile);

export default router;
