import { Router } from 'express';
// Controllers
import { createNewNewsletterMember, deleteMemberFromNewsletterDatabase, getAllNewsletterMembers } from '../controllers/newsletter.js';
// Validation
import {
  validateAuthentication,
  validateDeveloperRole,
} from '../middleware/auth.js';

const router = Router();

// Apis
router.get('/get-all-newsletter-members', getAllNewsletterMembers);
router.post('/newsletter-signup', createNewNewsletterMember);
router.delete('/delete-member-from-database', deleteMemberFromNewsletterDatabase);

export default router;
