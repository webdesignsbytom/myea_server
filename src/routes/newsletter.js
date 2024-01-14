import { Router } from 'express';

import { createNewNewsletterMember, deleteMemberFromNewsletterDatabase, getAllNewsletterMembers } from '../controllers/newsletter.js';
import {
  validateAuthentication,
  validateDeveloperRole,
} from '../middleware/auth.js';

const router = Router();

router.get('/get-all-newsletter-members', getAllNewsletterMembers);
router.post('/newsletter-signup', createNewNewsletterMember);
router.delete('/delete-member-from-database', deleteMemberFromNewsletterDatabase);

export default router;
