// Domain controls
import { myEmitterErrors } from '../event/errorEvents.js';
// Error events
import {
  BadRequestEvent,
  MissingFieldEvent,
} from '../event/utils/errorUtils.js';
import { NotFoundEvent, ServerErrorEvent } from '../event/utils/errorUtils.js';
import {
  EVENT_MESSAGES,
  sendDataResponse,
  sendMessageResponse,
} from '../utils/responses.js';
// Directory
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

// Convert the URL to a path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getAllBadges = async (req, res) => {
  try {
    const badgesDir = path.join(__dirname, '..', '..', 'assets', 'badges');
    const files = await fs.readdir(badgesDir);

    const imageFiles = files
      .filter((file) => {
        return (
          file.endsWith('.png') ||
          file.endsWith('.jpg') ||
          file.endsWith('.jpeg')
        );
      })
      .map((file) => `/badges_container/${file}`);

    res.json(imageFiles);
  } catch (err) {
    // Error
    const serverError = new ServerErrorEvent(req.user,
      `Badges server error`);
    myEmitterErrors.emit('error', serverError);
    sendMessageResponse(res, serverError.code, serverError.message);
    throw err;
  }
};
