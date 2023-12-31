import { Router } from 'express';
import {
  validateAuthentication,
  validateDeveloperRole,
} from '../middleware/auth.js';
import { createNewPet, deathOfAPetigotchi, levelUpPetigotchi } from '../controllers/petigotchi.js';

const router = Router();

router.post('/create-new-pet', createNewPet);
router.put('/level-up-pet', levelUpPetigotchi);
router.delete('/death-of-pet', deathOfAPetigotchi);

export default router;
