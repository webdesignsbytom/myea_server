import { Router } from 'express';

import {
  validateAuthentication,
  validateDeveloperRole,
} from '../middleware/auth.js';
import { addAchievementToUserProfile, getAllAchievements } from '../controllers/achievements.js';

const router = Router();

router.get('/get-all-achievements', getAllAchievements);
router.put('/update-add-user-acheivements', addAchievementToUserProfile);

export default router;
