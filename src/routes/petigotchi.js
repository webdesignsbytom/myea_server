import { Router } from 'express';
import {
  validateAuthentication,
  validateDeveloperRole,
} from '../middleware/auth.js';
import { createNewPet, deathOfAPetigotchi, getAllPets, levelUpPetigotchi, namePetigotchi } from '../controllers/petigotchi.js';

const router = Router();

router.get('/get-all-pets', getAllPets);
router.post('/create-new-pet', createNewPet);
router.put('/name-petigotchi', namePetigotchi);
router.put('/level-up-pet', levelUpPetigotchi);
router.delete('/death-of-pet', deathOfAPetigotchi);

export default router;
