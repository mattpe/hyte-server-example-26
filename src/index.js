import express from 'express';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;

// Dummy mock data (nollautuu aina, kun sovelluksen käynnistää uudelleen)
const items = [
  {id: 1, name: 'Omena'},
  {id: 2, name: 'Appelsiini'},
  {id: 3, name: 'Banaaneja'},
];

// parsitaan json data pyynnöstä ja lisätään request-objektiin
app.use(express.json());

// tarjoillaan webbisivusto (front-end) palvelimen juuressa
app.use('/', express.static('public'));

// API root
app.get('/api', (req, res) => {
  res.send('This is dummy items API!');
});

// Get all items
app.get('/items', (req, res) => {
  res.json(items);
});

// Get item based on id
app.get('/items/:id', (req, res) => {
  console.log('getting item id:', req.params.id);
  const itemFound = items.find(item => item.id == req.params.id);
  if (itemFound) {
    res.json(itemFound);
  } else {
    res.status(404).json({message: 'item not found'});
  }
});

// PUT route for items
app.put('/items/:id', (req, res) => {
  console.log('updating item id:', req.params.id);
  const itemIndex = items.findIndex(item => item.id == req.params.id);
  if (itemIndex !== -1) {
    items[itemIndex] = { ...items[itemIndex], ...req.body };
    res.json({message: 'item updated', item: items[itemIndex]});
  } else {
    res.status(404).json({message: 'item not found'});
  }
});

// DELETE route for items
app.delete('/items/:id', (req, res) => {
  console.log('deleting item id:', req.params.id);
  const itemIndex = items.findIndex(item => item.id == req.params.id);
  if (itemIndex !== -1) {
    items.splice(itemIndex, 1);
    res.json({message: 'item deleted'});
  } else {
    res.status(404).json({message: 'item not found'});
  }
});

// Add new item
app.post('/items', (req, res) => {
  //console.log('add item request body', req.body);
  //lisää id listaan lisättävälle objektille
  const newId = items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
  const newItem = { id: newId, ...req.body };
  items.push(newItem);
  res.status(201).json({message: 'new item added', item: newItem});
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
