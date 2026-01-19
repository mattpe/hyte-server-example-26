import express from 'express';
import {deleteItemById, getItemById, getItems, postNewItem, putItemById} from './items.js';
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

// Endpoints for 'items' resource
// Get all items
app.get('/items', getItems);
// Get item based on id
app.get('/items/:id', getItemById);
// PUT route for items
app.put('/items/:id', putItemById);
// DELETE route for items
app.delete('/items/:id', deleteItemById);
// Add new item
app.post('/items', postNewItem);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
