import { Router } from 'express';
import {
  validateAuthentication,
  validateDeveloperRole,
} from '../middleware/auth.js';
import { createNewPet } from '../controllers/petigotchi.js';

const router = Router();

router.post('/create-new-pet', createNewPet);

export default router;
