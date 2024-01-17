import { Router } from 'express';
// Controllers
import { getAllUserFriends } from '../controllers/friend.js';
// Validation
import {
  validateAuthentication,
  validateDeveloperRole,
} from '../middleware/auth.js';

const router = Router();

// Apis
router.get('/get-all-friends-for-user', getAllUserFriends);


export default router;
