import EventEmitter from 'events';

// Export event emitter
class MyEventEmitter extends EventEmitter {}
export const myEmitter = new MyEventEmitter();