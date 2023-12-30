import { Router } from 'express';

import { createNewNewsletterMember, getAllNewsletterMembers } from '../controllers/newsletter.js';
import {
  validateAuthentication,
  validateDeveloperRole,
} from '../middleware/auth.js';

const router = Router();

export default router;