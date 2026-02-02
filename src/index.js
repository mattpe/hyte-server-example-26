import express from 'express';
import itemRouter from './routes/item-router.js';
import userRouter from './routes/user-router.js';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;

// parsitaan json data pyynnöstä ja lisätään request-objektiin
app.use(express.json());

// tarjoillaan webbisivusto (front-end) palvelimen juuressa
app.use('/', express.static('public'));

// API root
app.get('/api', (req, res) => {
  res.send('This is dummy items API!');
});

// Dummy items resource
app.use('/api/items', itemRouter);

// Users resource router for all /api/users routes
app.use('/api/users', userRouter);


app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
