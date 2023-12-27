import { myEmitter } from '../utils/eventEmitter.js';
import {
  createGetAllNewsletterEvent, createRegisterNewsletterEvent,
} from './utils/newsletterUtils.js';

export const myEmitterNewsletter = myEmitter;

myEmitterNewsletter.on('get-all-newsletter-members', async (user) =>
  createGetAllNewsletterEvent(user)
);

myEmitterNewsletter.on('newsletter-register', async (user) =>
  createRegisterNewsletterEvent(user)
);
