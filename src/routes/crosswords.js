import { Router } from 'express';
// Controllers

// Validation
import {
  validateAuthentication,
  validateDeveloperRole,
} from '../middleware/auth.js';

const router = Router();

// Apis
router.post('/create-new-crossword', createNewCrossword);


export default router;
