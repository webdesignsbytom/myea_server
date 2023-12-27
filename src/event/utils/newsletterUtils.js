import dbClient from '../../utils/dbClient.js';
// Error events
import { myEmitterErrors } from '../errorEvents.js';
import { CreateEventError, NoPermissionEvent } from './errorUtils.js';

export const createGetAllNewsletterEvent = async (user) => {
  let type = 'TEST'

  if (user === null || user === undefined) {
    console.log('XXXXXXXXXXXXXX');

    user = {
      id: '6aa67f8e-dbde-49a1-a008-cfec77f88eee',
      email: 'test@example.com'
    }
  }
  
  console.log('user: ', user);


  if (user.role === 'ADMIN') {
    type = 'ADMIN';
  }
  if (user.role === 'DEVELOPER') {
    type = 'DEVELOPER';
  }
  if (user.role === 'USER') {
    const notAuthorized = new NoPermissionEvent(user.id, 'Get all newsletter not authorized');
    myEmitterErrors.emit('error', notAuthorized);
    return;
  }

  try {
    await dbClient.event.create({
      data: {
        type: type,
        topic: 'Get all newsletter',
        content: `Get all newsletter successful for ${user.email}`,
        code: 200
      },
    });
    
  } catch (err) {
    const error = new CreateEventError(user.id, 'Get all newsletter');
    myEmitterErrors.emit('error', error);
    throw err;
  }
};

export const createRegisterNewsletterEvent = async (user) => {
  let type = 'USER';
  if (user.role === 'ADMIN') {
    type = 'ADMIN';
  }
  if (user.role === 'DEVELOPER') {
    type = 'DEVELOPER';
  }

  try {
    await dbClient.event.create({
      data: {
        type: type,
        topic: 'Register for newsletter',
        content: `Register for newsletter successful for ${user.email}`,
        code: 201
      },
    });
  } catch (err) {
    const error = new CreateEventError(user.id, 'Register for newsletter');
    myEmitterErrors.emit('error', error);
    throw err;
  }
};


export const createDeleteMessageEvent = async (user) => {
  let type = 'USER';
  if (user.role === 'ADMIN') {
    type = 'ADMIN';
  }
  if (user.role === 'DEVELOPER') {
    type = 'DEVELOPER';
  }

  try {
    await dbClient.event.create({
      data: {
        type: type,
        topic: 'Delete message',
        content: `Delete message successful for ${user.email}`,
        createdById: user.id,
        code: 204
      },
    });
  } catch (err) {
    const error = new CreateEventError(user.id, 'Delete message');
    myEmitterErrors.emit('error', error);
    throw err;
  }
};