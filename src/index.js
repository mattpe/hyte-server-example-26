import express from 'express';

import {getUsers, postLogin, postUser} from './users.js';
import itemRouter from './routes/item-router.js';
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

// Users resource endpoints
// GET all users
app.get('/api/users', getUsers);
// POST new user
app.post('/api/users', postUser);
// POST user login
app.post('/api/users/login', postLogin);

// TODO: get user by id
// app.get('/api/users/:id');

// TODO: put user by id

// TODO: delete user by id

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
