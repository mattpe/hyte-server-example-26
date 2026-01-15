import http from 'http';
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  console.log('Request:', req.method, req.url);
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(`<h1>Welcome to my REST API!</h1><p>Haettu URL: ${req.url}</p>`);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
