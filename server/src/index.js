import express from 'express';
import cors from 'cors';
import userRouter from './routes/user-router.js';
//import requestLogger from './middlewares/logger.js';
import entryRouter from './routes/entry-router.js';
import {errorHandler, notFoundHandler} from './middlewares/error-handlers.js';
import kubiosRouter from './routes/kubios-router.js';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;

// enable all CORS requests
app.use(cors());

// parsitaan json data pyynnöstä ja lisätään request-objektiin
app.use(express.json());
// tarjoillaan webbisivusto (front-end) palvelimen juuressa
app.use('/', express.static('public'));

// Oma loggeri middleware, käytössä koko sovelluksen laajuisesti eli käsittee kaikki http-pyynnöt
// poissa käytöstä, koska esim. login-pyyntöjen salasanat näkyisivät konsolissa (käytä vain debuggaamiseen)
// app.use(requestLogger);

// APIn root-reitti, tässä voisi julkaista esim. API:n dokumentaation
app.get('/api', (req, res) => {
  res.send('Teacher example Health Diary API! Routes available: /api/users, /api/entries, /api/kubios');
});

// Users resource router for all /api/users routes
app.use('/api/users', userRouter);
// Diary entries resource router
app.use('/api/entries', entryRouter);

// Kubios data router
app.use('/api/kubios', kubiosRouter);

// jos pyyntö ei "mätsää" minkään ylläolevan reitin kanssa, kyseessä on 404-tilanne
app.use(notFoundHandler);
// virheenkäsittelijälle ohjataa kaikki pyynnöt, jossa mukana on error objekti
app.use(errorHandler);


app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
