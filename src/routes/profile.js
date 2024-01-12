import { Router } from 'express';

import {
  validateAuthentication,
  validateDeveloperRole,
} from '../middleware/auth.js';
import { updateUserProfile, updateUsersScore } from '../controllers/profile.js';

const router = Router();

router.put('/update-user-profile', updateUserProfile);
router.put('/update-user-score', updateUsersScore);

export default router;
