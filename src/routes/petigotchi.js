import { Router } from 'express';
import {
  validateAuthentication,
  validateDeveloperRole,
} from '../middleware/auth.js';
import { createNewPet, deathOfAPetigotchi } from '../controllers/petigotchi.js';

const router = Router();

router.post('/create-new-pet', createNewPet);
router.delete('/death-of-pet', deathOfAPetigotchi);

export default router;
