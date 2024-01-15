import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
// Path
import { join } from 'path';
import * as url from 'url';
// Import routers
import achievementsRouter from './routes/achievements.js';
import authRouter from './routes/auth.js';
import badgeRouter from './routes/badges.js';
import complaintRouter from './routes/complaints.js';
import contactRouter from './routes/contacts.js';
import eventRouter from './routes/events.js';
import ecoEventRouter from './routes/ecoEvents.js';
import lotteryRouter from './routes/lottery.js';
import messageRouter from './routes/messages.js';
import newsletterRouter from './routes/newsletter.js';
import notificationRouter from './routes/notifications.js';
import petigotchiRouter from './routes/petigotchi.js';
import profileRouter from './routes/profile.js';
import reviewRouter from './routes/reviews.js';
import userRouter from './routes/users.js';
// Env
import { HTTP_URL, PORT } from './utils/config.js';

const app = express();
app.disable('x-powered-by');

// Add middleware
app.use(
  cors({ 
    origin: "*"
  })
);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create path to HTML
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

// Serve static files from the 'badges' directory
app.use('/badges_container', express.static(join(__dirname, '..', 'assets', 'badges')));
app.use('/profile_img', express.static(join(__dirname, '..', 'assets', 'profile_images'))); // root then name of folders

// Start of actions
app.use('/', authRouter);
app.use('/achievements', achievementsRouter);
app.use('/badges', badgeRouter);
app.use('/complaints', complaintRouter);
app.use('/contacts', contactRouter);
app.use('/events', eventRouter);
app.use('/eco-events', ecoEventRouter);
app.use('/messages', messageRouter);
app.use('/newsletter', newsletterRouter);
app.use('/notifications', notificationRouter);
app.use('/petigotchi', petigotchiRouter);
app.use('/profile', profileRouter);
app.use('/reviews', reviewRouter);
app.use('/lottery', lotteryRouter);
app.use('/users', userRouter);

// Server interface page
app.get('/', (req, res) => {
  res.sendFile('index.html', {
    root: join(__dirname, 'views'),
  });
});

// For all unknown requests 404 page returns
app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ message: '404 Not Found' });
  } else {
    res.type('txt').send('404 Not Found');
  }
});

app.use((error, req, res, next) => {
  console.error(error)

  if (error.code === 'P2025') {
    return sendDataResponse(res, 404, 'Record does not exist')
  }

  return sendDataResponse(res, 500)
})

// Start our API server
app.listen(PORT, () => {
  console.log(
    `\nServer is running on ${HTTP_URL}${PORT} \n This no longer consumes souls\n`
  );
});
